import { isFunction } from './isFunction';
export function isAsyncIterable(obj) {
    return Symbol.asyncIterator && isFunction(obj?.[Symbol.asyncIterator]);
}
