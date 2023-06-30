export const performanceTimestampProvider = {
    now() {
        // Use the variable rather than `this` so that the function can be called
        // without being bound to the provider.
        return (performanceTimestampProvider.delegate || performance).now();
    },
    delegate: undefined,
};
