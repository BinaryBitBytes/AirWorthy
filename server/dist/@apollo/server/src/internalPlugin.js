// Helper function for writing internal plugins which lets you write an object
// that is type-checked as InternalApolloServerPlugin but is still only of type
// ApolloServerPlugin (as appropriate for externally-exported plugin-returning
// functions).
export function internalPlugin(p) {
    return p;
}
export function pluginIsInternal(plugin) {
    // We could call the function and compare it to the list above, but this seems
    // good enough.
    return '__internal_plugin_id__' in plugin;
}
