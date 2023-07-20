import { operate } from '../util/lift';
import { concatAll } from './concatAll';
import { popScheduler } from '../util/args';
import { from } from '../observable/from';
/**
 * @deprecated Replaced with {@link concatWith}. Will be removed in v8.
 */
export function concat(...args) {
    const scheduler = popScheduler(args);
    return operate((source, subscriber) => {
        concatAll()(from([source, ...args], scheduler)).subscribe(subscriber);
    });
}
