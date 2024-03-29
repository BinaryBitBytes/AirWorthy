import { isDefined } from './isDefined.js';
export async function invokeDidStartHook(targets, hook) {
    const didEndHooks = (await Promise.all(targets.map((target) => hook(target)))).filter(isDefined);
    didEndHooks.reverse();
    return async (...args) => {
        for (const didEndHook of didEndHooks) {
            didEndHook(...args);
        }
    };
}
// Almost all hooks are async, but as a special case, willResolveField is sync
// due to performance concerns.
export function invokeSyncDidStartHook(targets, hook) {
    const didEndHooks = targets
        .map((target) => hook(target))
        .filter(isDefined);
    didEndHooks.reverse();
    return (...args) => {
        for (const didEndHook of didEndHooks) {
            didEndHook(...args);
        }
    };
}
export async function invokeHooksUntilDefinedAndNonNull(targets, hook) {
    for (const target of targets) {
        const value = await hook(target);
        if (value != null) {
            return value;
        }
    }
    return null;
}
