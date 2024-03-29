import { Trace } from '@apollo/usage-reporting-protobuf';
import { TraceTreeBuilder } from '../traceTreeBuilder.js';
import { internalPlugin } from '../../internalPlugin.js';
import { schemaIsSubgraph } from '../schemaIsSubgraph.js';
// This ftv1 plugin produces a base64'd Trace protobuf containing only the
// durationNs, startTime, endTime, and root fields.  This output is placed
// on the `extensions`.`ftv1` property of the response.  The Apollo Gateway
// utilizes this data to construct the full trace and submit it to Apollo's
// usage reporting ingress.
export function ApolloServerPluginInlineTrace(options = Object.create(null)) {
    let enabled = options.__onlyIfSchemaIsSubgraph ? null : true;
    return internalPlugin({
        __internal_plugin_id__: 'InlineTrace',
        __is_disabled_plugin__: false,
        async serverWillStart({ schema, logger }) {
            // Handle the case that the plugin was implicitly installed. We only want it
            // to actually be active if the schema appears to be federated. If you don't
            // like the log line, just install `ApolloServerPluginInlineTrace()` in
            // `plugins` yourself.
            if (enabled === null) {
                enabled = schemaIsSubgraph(schema);
                if (enabled) {
                    logger.info('Enabling inline tracing for this subgraph. To disable, use ' +
                        'ApolloServerPluginInlineTraceDisabled.');
                }
            }
        },
        async requestDidStart({ request: { http }, metrics, logger }) {
            if (!enabled) {
                return;
            }
            const treeBuilder = new TraceTreeBuilder({
                maskedBy: 'ApolloServerPluginInlineTrace',
                sendErrors: options.includeErrors,
                logger,
            });
            // XXX Provide a mechanism to customize this logic.
            if (http?.headers.get('apollo-federation-include-trace') !== 'ftv1') {
                return;
            }
            // If some other (user-written?) plugin already decided that we are not
            // capturing traces, then we should not capture traces.
            if (metrics.captureTraces === false) {
                return;
            }
            // Note that this will override any `fieldLevelInstrumentation` parameter
            // to the usage reporting plugin for requests with the
            // `apollo-federation-include-trace` header set.
            metrics.captureTraces = true;
            treeBuilder.startTiming();
            return {
                async executionDidStart() {
                    return {
                        willResolveField({ info }) {
                            return treeBuilder.willResolveField(info);
                        },
                    };
                },
                async didEncounterErrors({ errors }) {
                    treeBuilder.didEncounterErrors(errors);
                },
                async willSendResponse({ response }) {
                    // We record the end time at the latest possible time: right before serializing the trace.
                    // If we wait any longer, the time we record won't actually be sent anywhere!
                    treeBuilder.stopTiming();
                    // For now, we don't support inline traces on incremental delivery
                    // responses. (We could perhaps place the trace on the final chunk, or
                    // even deliver it bit by bit. For now, since Gateway does not support
                    // incremental delivery and Router does not pass through defers to
                    // subgraphs, this doesn't affect the "federated tracing" use case,
                    // though it does affect the ability to look at inline traces in other
                    // tools like Explorer.
                    if (response.body.kind === 'incremental') {
                        return;
                    }
                    // If we're in a gateway, include the query plan (and subgraph traces)
                    // in the inline trace. This is designed more for manually querying
                    // your graph while running locally to see what the query planner is
                    // doing rather than for running in production.
                    if (metrics.queryPlanTrace) {
                        treeBuilder.trace.queryPlan = metrics.queryPlanTrace;
                    }
                    const encodedUint8Array = Trace.encode(treeBuilder.trace).finish();
                    const encodedBuffer = Buffer.from(encodedUint8Array, encodedUint8Array.byteOffset, encodedUint8Array.byteLength);
                    const extensions = response.body.singleResult.extensions ||
                        (response.body.singleResult.extensions = Object.create(null));
                    // This should only happen if another plugin is using the same name-
                    // space within the `extensions` object and got to it before us.
                    if (typeof extensions.ftv1 !== 'undefined') {
                        throw new Error('The `ftv1` extension was already present.');
                    }
                    extensions.ftv1 = encodedBuffer.toString('base64');
                },
            };
        },
    });
}
