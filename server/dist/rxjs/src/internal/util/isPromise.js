import { isFunction } from "./isFunction";
/**
 * Tests to see if the object is "thennable".
 * @param value the object to test
 */
export function isPromise(value) {
    return isFunction(value?.then);
}
