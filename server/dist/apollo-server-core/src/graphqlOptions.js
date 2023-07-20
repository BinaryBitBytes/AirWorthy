export async function resolveGraphqlOptions(options, ...args) {
    if (typeof options === 'function') {
        return await options(...args);
    }
    else {
        return options;
    }
}
