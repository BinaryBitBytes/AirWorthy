export const intervalProvider = {
    // When accessing the delegate, use the variable rather than `this` so that
    // the functions can be called without being bound to the provider.
    setInterval(handler, timeout, ...args) {
        const { delegate } = intervalProvider;
        if (delegate?.setInterval) {
            return delegate.setInterval(handler, timeout, ...args);
        }
        return setInterval(handler, timeout, ...args);
    },
    clearInterval(handle) {
        const { delegate } = intervalProvider;
        return (delegate?.clearInterval || clearInterval)(handle);
    },
    delegate: undefined,
};
