export function pluginIsInternal(plugin) {
    // We could call the function and compare it to the list above, but this seems
    // good enough.
    return '__internal_plugin_id__' in plugin;
}
