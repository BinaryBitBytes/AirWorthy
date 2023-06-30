import { iterator as Symbol_iterator } from '../symbol/iterator';
import { isFunction } from './isFunction';
/** Identifies an input as being an Iterable */
export function isIterable(input) {
    return isFunction(input?.[Symbol_iterator]);
}
