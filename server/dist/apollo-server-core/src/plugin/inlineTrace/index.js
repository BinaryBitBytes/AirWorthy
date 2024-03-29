import { Trace } from 'apollo-reporting-protobuf';
import { TraceTreeBuilder } from '../traceTreeBuilder';
import { schemaIsFederated } from '../schemaIsFederated';
// This ftv1 plugin produces a base64'd Trace protobuf containing only the
// durationNs, startTime, endTime, and root fields.  This output is placed
// on the `extensions`.`ftv1` property of the response.  The Apollo Gateway
// utilizes this data to construct the full trace and submit it to Apollo's
// usage reporting ingress.
export function ApolloServerPluginInlineTrace(options = Object.create(null)) {
    let enabled = options.__onlyIfSchemaIsFederated ? null : true;
    return {
        __internal_plugin_id__() {
            return 'InlineTrace';
        },
        async serverWillStart({ schema, logger }) {
            // Handle the case that the plugin was implicitly installed. We only want it
            // to actually be active if the schema appears to be federated. If you don't
            // like the log line, just install `ApolloServerPluginInlineTrace()` in
            // `plugins` yourself.
            if (enabled === null) {
                enabled = schemaIsFederated(schema);
                if (enabled) {
                    logger.info('Enabling inline tracing for this federated service. To disable, use ' +
                        'ApolloServerPluginInlineTraceDisabled.');
                }
            }
        },
        async requestDidStart({ request: { http }, metrics }) {
            if (!enabled) {
                return;
            }
            const treeBuilder = new TraceTreeBuilder({
                rewriteError: options.rewriteError,
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
                    // If we're in a gateway, include the query plan (and subgraph traces)
                    // in the inline trace. This is designed more for manually querying
                    // your graph while running locally to see what the query planner is
                    // doing rather than for running in production.
                    if (metrics.queryPlanTrace) {
                        treeBuilder.trace.queryPlan = metrics.queryPlanTrace;
                    }
                    const encodedUint8Array = Trace.encode(treeBuilder.trace).finish();
                    const encodedBuffer = Buffer.from(encodedUint8Array, encodedUint8Array.byteOffset, encodedUint8Array.byteLength);
                    const extensions = response.extensions || (response.extensions = Object.create(null));
                    // This should only happen if another plugin is using the same name-
                    // space within the `extensions` object and got to it before us.
                    if (typeof extensions.ftv1 !== 'undefined') {
                        throw new Error('The `ftv1` extension was already present.');
                    }
                    extensions.ftv1 = encodedBuffer.toString('base64');
                },
            };
        },
    };
}
// This plugin does nothing, but it ensures that ApolloServer won't try
// to add a default ApolloServerPluginInlineTrace.
export function ApolloServerPluginInlineTraceDisabled() {
    return {
        __internal_plugin_id__() {
            return 'InlineTrace';
        },
    };
}
