let nextHandle = 1;
// The promise needs to be created lazily otherwise it won't be patched by Zones
let resolved;
const activeHandles = {};
/**
 * Finds the handle in the list of active handles, and removes it.
 * Returns `true` if found, `false` otherwise. Used both to clear
 * Immediate scheduled tasks, and to identify if a task should be scheduled.
 */
function findAndClearHandle(handle) {
    if (handle in activeHandles) {
        delete activeHandles[handle];
        return true;
    }
    return false;
}
/**
 * Helper functions to schedule and unschedule microtasks.
 */
export const Immediate = {
    setImmediate(cb) {
        const handle = nextHandle++;
        activeHandles[handle] = true;
        if (!resolved) {
            resolved = Promise.resolve();
        }
        resolved.then(() => findAndClearHandle(handle) && cb());
        return handle;
    },
    clearImmediate(handle) {
        findAndClearHandle(handle);
    },
};
/**
 * Used for internal testing purposes only. Do not export from library.
 */
export const TestTools = {
    pending() {
        return Object.keys(activeHandles).length;
    }
};
