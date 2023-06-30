// This file exports the "disabled" version of various plugins which are
// installed by default under certain circumstances. This lets users explicitly
// choose not to enable these plugins. Note that we explicitly keep these tiny
// plugins separate from the plugins they are enabling; this means that we don't
// have to load (say) the entire `plugin/usageReporting` entry point (which
// includes the whole generated protobuf library, etc) just in order to disable
// usage reporting.
function disabledPlugin(id) {
    const plugin = {
        __internal_plugin_id__: id,
        __is_disabled_plugin__: true,
    };
    return plugin;
}
export function ApolloServerPluginCacheControlDisabled() {
    return disabledPlugin('CacheControl');
}
export function ApolloServerPluginInlineTraceDisabled() {
    return disabledPlugin('InlineTrace');
}
export function ApolloServerPluginLandingPageDisabled() {
    return disabledPlugin('LandingPageDisabled');
}
export function ApolloServerPluginSchemaReportingDisabled() {
    return disabledPlugin('SchemaReporting');
}
export function ApolloServerPluginUsageReportingDisabled() {
    return disabledPlugin('UsageReporting');
}
