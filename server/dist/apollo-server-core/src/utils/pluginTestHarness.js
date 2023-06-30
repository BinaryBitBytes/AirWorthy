import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql/type';
import { enablePluginsForSchemaResolvers, symbolExecutionDispatcherWillResolveField, } from './schemaInstrumentation';
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache';
import { Dispatcher } from './dispatcher';
import { getOperationAST, parse, validate as graphqlValidate } from 'graphql';
import { newCachePolicy } from '../cachePolicy';
export default async function pluginTestHarness({ pluginInstance, schema, logger, graphqlRequest, overallCachePolicy, executor, context = Object.create(null), }) {
    if (!schema) {
        schema = new GraphQLSchema({
            query: new GraphQLObjectType({
                name: 'RootQueryType',
                fields: {
                    hello: {
                        type: GraphQLString,
                        resolve() {
                            return 'hello world';
                        },
                    },
                },
            }),
        });
    }
    let serverListener;
    if (typeof pluginInstance.serverWillStart === 'function') {
        const maybeServerListener = await pluginInstance.serverWillStart({
            logger: logger || console,
            schema,
            schemaHash: 'deprecated',
            serverlessFramework: false,
            apollo: {
                key: 'some-key',
                graphRef: 'graph@current',
            },
        });
        if (maybeServerListener?.serverWillStop) {
            serverListener = maybeServerListener;
        }
    }
    const requestContext = {
        logger: logger || console,
        schema,
        schemaHash: 'deprecated',
        request: graphqlRequest,
        metrics: Object.create(null),
        source: graphqlRequest.query,
        cache: new InMemoryLRUCache(),
        context,
        overallCachePolicy: newCachePolicy(),
        requestIsBatched: false,
    };
    if (requestContext.source === undefined) {
        throw new Error('No source provided for test');
    }
    if (overallCachePolicy) {
        requestContext.overallCachePolicy.replace(overallCachePolicy);
    }
    if (typeof pluginInstance.requestDidStart !== 'function') {
        throw new Error('This test harness expects this to be defined.');
    }
    const listener = await pluginInstance.requestDidStart(requestContext);
    const dispatcher = new Dispatcher(listener ? [listener] : []);
    const executionListeners = [];
    // Let the plugins know that we now have a STRING of what we hope will
    // parse and validate into a document we can execute on.  Unless we have
    // retrieved this from our APQ cache, there's no guarantee that it is
    // syntactically correct, so this string should not be trusted as a valid
    // document until after it's parsed and validated.
    await dispatcher.invokeHook('didResolveSource', requestContext);
    if (!requestContext.document) {
        await dispatcher.invokeDidStartHook('parsingDidStart', requestContext);
        try {
            requestContext.document = parse(requestContext.source, undefined);
        }
        catch (syntaxError) {
            const errorOrErrors = syntaxError;
            requestContext.errors = Array.isArray(errorOrErrors)
                ? errorOrErrors
                : [errorOrErrors];
            await dispatcher.invokeHook('didEncounterErrors', requestContext);
            await dispatcher.invokeHook('willSendResponse', requestContext);
            return requestContext;
        }
        const validationDidEnd = await dispatcher.invokeDidStartHook('validationDidStart', requestContext);
        /**
         * We are validating only with the default rules.
         */
        const validationErrors = graphqlValidate(requestContext.schema, requestContext.document);
        if (validationErrors.length !== 0) {
            requestContext.errors = validationErrors;
            validationDidEnd(validationErrors);
            await dispatcher.invokeHook('didEncounterErrors', requestContext);
            await dispatcher.invokeHook('willSendResponse', requestContext);
            return requestContext;
        }
        else {
            validationDidEnd();
        }
    }
    const operation = getOperationAST(requestContext.document, requestContext.request.operationName);
    requestContext.operation = operation || undefined;
    // We'll set `operationName` to `null` for anonymous operations.  Note that
    // usage reporting relies on the fact that the requestContext passed
    // to requestDidStart is mutated to add this field before requestDidEnd is
    // called
    requestContext.operationName = operation?.name?.value || null;
    await dispatcher.invokeHook('didResolveOperation', requestContext);
    // This execution dispatcher logic is duplicated in the request pipeline
    // right now.
    (await dispatcher.invokeHook('executionDidStart', requestContext)).forEach((executionListener) => {
        if (executionListener) {
            executionListeners.push(executionListener);
        }
    });
    executionListeners.reverse();
    const executionDispatcher = new Dispatcher(executionListeners);
    if (executionDispatcher.hasHook('willResolveField')) {
        // Create a callback that will trigger the execution dispatcher's
        // `willResolveField` hook.  We will attach this to the context on a
        // symbol so it can be invoked by our `wrapField` method during execution.
        const invokeWillResolveField = (...args) => executionDispatcher.invokeSyncDidStartHook('willResolveField', ...args);
        Object.defineProperty(requestContext.context, symbolExecutionDispatcherWillResolveField, { value: invokeWillResolveField });
        // If the schema is already enabled, this is a no-op.  Otherwise, the
        // schema will be augmented so it is able to invoke willResolveField.
        enablePluginsForSchemaResolvers(schema);
    }
    try {
        // `response` is readonly, so we'll cast to `any` to assign to it.
        requestContext.response = await executor(requestContext);
        await executionDispatcher.invokeHook('executionDidEnd');
    }
    catch (executionErr) {
        await executionDispatcher.invokeHook('executionDidEnd', executionErr);
    }
    await dispatcher.invokeHook('willSendResponse', requestContext);
    await serverListener?.serverWillStop?.();
    return requestContext;
}
