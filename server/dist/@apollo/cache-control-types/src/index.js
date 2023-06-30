// NOTE: Once Apollo Server 4 is released, move this package into the
// apollo-server repo. We're placing it in the apollo-utils repo for now to
// enable us to make non-alpha releases that can be used on the apollo-server
// version-4 branch.
/** Given an `info` resolver argument, returns the cacheControl field if it
 * exists and appears to be from Apollo Server 3 or newer; returns null
 * otherwise.*/
export function maybeCacheControlFromInfo(info) {
    if (info.cacheControl?.cacheHint?.restrict) {
        return info.cacheControl;
    }
    return null;
}
/** Given an `info` resolver argument, returns the cacheControl field if it
 * exists and appears to be from Apollo Server 3 or newer; throws
 * otherwise.*/
export function cacheControlFromInfo(info) {
    if (!('cacheControl' in info)) {
        throw new Error('The `info` argument does not appear to have a cacheControl field. ' +
            "Check that you are using Apollo Server 3 or newer and that you aren't using " +
            'ApolloServerPluginCacheControlDisabled.');
    }
    if (!info.cacheControl?.cacheHint?.restrict) {
        throw new Error('The `info` argument has a cacheControl field but it does not appear to be from Apollo' +
            "Server 3 or newer. Check that you are using Apollo Server 3 or newer and that you aren't using " +
            'ApolloServerPluginCacheControlDisabled.');
    }
    return info.cacheControl;
}
