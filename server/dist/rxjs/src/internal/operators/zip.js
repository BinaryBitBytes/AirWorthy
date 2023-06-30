import { zip as zipStatic } from '../observable/zip';
import { operate } from '../util/lift';
/**
 * @deprecated Replaced with {@link zipWith}. Will be removed in v8.
 */
export function zip(...sources) {
    return operate((source, subscriber) => {
        zipStatic(source, ...sources).subscribe(subscriber);
    });
}
