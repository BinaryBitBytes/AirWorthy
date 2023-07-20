import { map } from "../operators/map";
const { isArray } = Array;
function callOrApply(fn, args) {
    return isArray(args) ? fn(...args) : fn(args);
}
/**
 * Used in several -- mostly deprecated -- situations where we need to
 * apply a list of arguments or a single argument to a result selector.
 */
export function mapOneOrManyArgs(fn) {
    return map(args => callOrApply(fn, args));
}
