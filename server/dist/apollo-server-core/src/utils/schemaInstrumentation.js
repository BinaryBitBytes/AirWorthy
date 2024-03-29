import { getNamedType, GraphQLObjectType, } from 'graphql/type';
import { defaultFieldResolver } from 'graphql/execution';
export const symbolExecutionDispatcherWillResolveField = Symbol('apolloServerExecutionDispatcherWillResolveField');
export const symbolUserFieldResolver = Symbol('apolloServerUserFieldResolver');
const symbolPluginsEnabled = Symbol('apolloServerPluginsEnabled');
export function enablePluginsForSchemaResolvers(schema) {
    if (pluginsEnabledForSchemaResolvers(schema)) {
        return schema;
    }
    Object.defineProperty(schema, symbolPluginsEnabled, {
        value: true,
    });
    forEachField(schema, wrapField);
    return schema;
}
export function pluginsEnabledForSchemaResolvers(schema) {
    return !!schema[symbolPluginsEnabled];
}
function wrapField(field) {
    const originalFieldResolve = field.resolve;
    field.resolve = (source, args, context, info) => {
        // This is a bit of a hack, but since `ResponsePath` is a linked list,
        // a new object gets created every time a path segment is added.
        // So we can use that to share our `whenObjectResolved` promise across
        // all field resolvers for the same object.
        const parentPath = info.path.prev;
        const willResolveField = context?.[symbolExecutionDispatcherWillResolveField];
        const userFieldResolver = context?.[symbolUserFieldResolver];
        // The technique for implementing a  "did resolve field" is accomplished by
        // returning a function from the `willResolveField` handler.  While there
        // may be several callbacks, depending on the number of plugins which have
        // implemented a `willResolveField` hook, this hook will call them all
        // as dictated by the dispatcher.  We will call this when object
        // resolution is complete.
        const didResolveField = typeof willResolveField === 'function' &&
            willResolveField({ source, args, context, info });
        const resolveObject = info.parentType.resolveObject;
        let whenObjectResolved;
        if (parentPath && resolveObject) {
            if (!parentPath.__fields) {
                parentPath.__fields = {};
            }
            parentPath.__fields[info.fieldName] = info.fieldNodes;
            whenObjectResolved = parentPath.__whenObjectResolved;
            if (!whenObjectResolved) {
                // Use `Promise.resolve().then()` to delay executing
                // `resolveObject()` so we can collect all the fields first.
                whenObjectResolved = Promise.resolve().then(() => {
                    return resolveObject(source, parentPath.__fields, context, info);
                });
                parentPath.__whenObjectResolved = whenObjectResolved;
            }
        }
        const fieldResolver = originalFieldResolve || userFieldResolver || defaultFieldResolver;
        try {
            let result;
            if (whenObjectResolved) {
                result = whenObjectResolved.then((resolvedObject) => {
                    return fieldResolver(resolvedObject, args, context, info);
                });
            }
            else {
                result = fieldResolver(source, args, context, info);
            }
            // Call the stack's handlers either immediately (if result is not a
            // Promise) or once the Promise is done. Then return that same
            // maybe-Promise value.
            if (typeof didResolveField === 'function') {
                whenResultIsFinished(result, didResolveField);
            }
            return result;
        }
        catch (error) {
            // Normally it's a bad sign to see an error both handled and
            // re-thrown. But it is useful to allow extensions to track errors while
            // still handling them in the normal GraphQL way.
            if (typeof didResolveField === 'function') {
                didResolveField(error);
            }
            throw error;
        }
    };
}
function isPromise(x) {
    return x && typeof x.then === 'function';
}
// Given result (which may be a Promise or an array some of whose elements are
// promises) Promises, set up 'callback' to be invoked when result is fully
// resolved.
export function whenResultIsFinished(result, callback) {
    if (isPromise(result)) {
        result.then((r) => callback(null, r), (err) => callback(err));
    }
    else if (Array.isArray(result)) {
        if (result.some(isPromise)) {
            Promise.all(result).then((r) => callback(null, r), (err) => callback(err));
        }
        else {
            callback(null, result);
        }
    }
    else {
        callback(null, result);
    }
}
function forEachField(schema, fn) {
    const typeMap = schema.getTypeMap();
    Object.entries(typeMap).forEach(([typeName, type]) => {
        if (!getNamedType(type).name.startsWith('__') &&
            type instanceof GraphQLObjectType) {
            const fields = type.getFields();
            Object.entries(fields).forEach(([fieldName, field]) => {
                fn(field, typeName, fieldName);
            });
        }
    });
}
