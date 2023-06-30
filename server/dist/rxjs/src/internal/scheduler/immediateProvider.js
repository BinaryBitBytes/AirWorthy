import { Immediate } from '../util/Immediate';
const { setImmediate, clearImmediate } = Immediate;
export const immediateProvider = {
    // When accessing the delegate, use the variable rather than `this` so that
    // the functions can be called without being bound to the provider.
    setImmediate(...args) {
        const { delegate } = immediateProvider;
        return (delegate?.setImmediate || setImmediate)(...args);
    },
    clearImmediate(handle) {
        const { delegate } = immediateProvider;
        return (delegate?.clearImmediate || clearImmediate)(handle);
    },
    delegate: undefined,
};
