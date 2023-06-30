import { observable as Symbol_observable } from '../symbol/observable';
import { isFunction } from './isFunction';
/** Identifies an input as being Observable (but not necessary an Rx Observable) */
export function isInteropObservable(input) {
    return isFunction(input[Symbol_observable]);
}
