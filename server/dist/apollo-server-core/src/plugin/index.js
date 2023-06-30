export function ApolloServerPluginUsageReporting(options = Object.create(null)) {
    return require('./usageReporting').ApolloServerPluginUsageReporting(options);
}
export function ApolloServerPluginUsageReportingDisabled() {
    return require('./usageReporting').ApolloServerPluginUsageReportingDisabled();
}
export function ApolloServerPluginSchemaReporting(options = Object.create(null)) {
    return require('./schemaReporting').ApolloServerPluginSchemaReporting(options);
}
export function ApolloServerPluginInlineTrace(options = Object.create(null)) {
    return require('./inlineTrace').ApolloServerPluginInlineTrace(options);
}
export function ApolloServerPluginInlineTraceDisabled() {
    return require('./inlineTrace').ApolloServerPluginInlineTraceDisabled();
}
export function ApolloServerPluginCacheControl(options = Object.create(null)) {
    return require('./cacheControl').ApolloServerPluginCacheControl(options);
}
export function ApolloServerPluginCacheControlDisabled() {
    return require('./cacheControl').ApolloServerPluginCacheControlDisabled();
}
export function ApolloServerPluginDrainHttpServer(options) {
    return require('./drainHttpServer').ApolloServerPluginDrainHttpServer(options);
}
export function ApolloServerPluginLandingPageDisabled() {
    const plugin = {
        __internal_plugin_id__() {
            return 'LandingPageDisabled';
        },
    };
    return plugin;
}
export function ApolloServerPluginLandingPageLocalDefault(options) {
    return require('./landingPage/default').ApolloServerPluginLandingPageLocalDefault(options);
}
export function ApolloServerPluginLandingPageProductionDefault(options) {
    return require('./landingPage/default').ApolloServerPluginLandingPageProductionDefault(options);
}
export function ApolloServerPluginLandingPageGraphQLPlayground(options = Object.create(null)) {
    return require('./landingPage/graphqlPlayground').ApolloServerPluginLandingPageGraphQLPlayground(options);
}
//#endregion
