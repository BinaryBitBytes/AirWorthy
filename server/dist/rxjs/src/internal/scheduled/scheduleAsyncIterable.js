import { Observable } from '../Observable';
import { executeSchedule } from '../util/executeSchedule';
export function scheduleAsyncIterable(input, scheduler) {
    if (!input) {
        throw new Error('Iterable cannot be null');
    }
    return new Observable((subscriber) => {
        executeSchedule(subscriber, scheduler, () => {
            const iterator = input[Symbol.asyncIterator]();
            executeSchedule(subscriber, scheduler, () => {
                iterator.next().then((result) => {
                    if (result.done) {
                        // This will remove the subscriptions from
                        // the parent subscription.
                        subscriber.complete();
                    }
                    else {
                        subscriber.next(result.value);
                    }
                });
            }, 0, true);
        });
    });
}
