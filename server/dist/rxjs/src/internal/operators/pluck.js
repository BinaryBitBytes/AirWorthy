import { map } from './map';
/* tslint:enable:max-line-length */
/**
 * Maps each source value to its specified nested property.
 *
 * <span class="informal">Like {@link map}, but meant only for picking one of
 * the nested properties of every emitted value.</span>
 *
 * ![](pluck.png)
 *
 * Given a list of strings or numbers describing a path to a property, retrieves
 * the value of a specified nested property from all values in the source
 * Observable. If a property can't be resolved, it will return `undefined` for
 * that value.
 *
 * ## Example
 *
 * Map every click to the tagName of the clicked target element
 *
 * ```ts
 * import { fromEvent, pluck } from 'rxjs';
 *
 * const clicks = fromEvent(document, 'click');
 * const tagNames = clicks.pipe(pluck('target', 'tagName'));
 *
 * tagNames.subscribe(x => console.log(x));
 * ```
 *
 * @see {@link map}
 *
 * @param properties The nested properties to pluck from each source
 * value.
 * @return A function that returns an Observable of property values from the
 * source values.
 * @deprecated Use {@link map} and optional chaining: `pluck('foo', 'bar')` is `map(x => x?.foo?.bar)`. Will be removed in v8.
 */
export function pluck(...properties) {
    const length = properties.length;
    if (length === 0) {
        throw new Error('list of properties cannot be empty.');
    }
    return map((x) => {
        let currentProp = x;
        for (let i = 0; i < length; i++) {
            const p = currentProp?.[properties[i]];
            if (typeof p !== 'undefined') {
                currentProp = p;
            }
            else {
                return undefined;
            }
        }
        return currentProp;
    });
}
