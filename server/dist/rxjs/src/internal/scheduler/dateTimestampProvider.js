export const dateTimestampProvider = {
    now() {
        // Use the variable rather than `this` so that the function can be called
        // without being bound to the provider.
        return (dateTimestampProvider.delegate || Date).now();
    },
    delegate: undefined,
};
