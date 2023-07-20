import { Stopper } from './stoppable';
/**
 * This plugin is used with apollo-server-express and other framework
 * integrations to drain your HTTP server on shutdown.
 * See https://www.apollographql.com/docs/apollo-server/api/plugin/drain-http-server/
 * for details.
 */
export function ApolloServerPluginDrainHttpServer(options) {
    const stopper = new Stopper(options.httpServer);
    return {
        async serverWillStart() {
            return {
                async drainServer() {
                    await stopper.stop(options.stopGracePeriodMillis ?? 10000);
                },
            };
        },
    };
}
