import { Subscriber } from '../Subscriber';
/**
 * Creates an instance of an `OperatorSubscriber`.
 * @param destination The downstream subscriber.
 * @param onNext Handles next values, only called if this subscriber is not stopped or closed. Any
 * error that occurs in this function is caught and sent to the `error` method of this subscriber.
 * @param onError Handles errors from the subscription, any errors that occur in this handler are caught
 * and send to the `destination` error handler.
 * @param onComplete Handles completion notification from the subscription. Any errors that occur in
 * this handler are sent to the `destination` error handler.
 * @param onFinalize Additional teardown logic here. This will only be called on teardown if the
 * subscriber itself is not already closed. This is called after all other teardown logic is executed.
 */
export function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
    return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
}
/**
 * A generic helper for allowing operators to be created with a Subscriber and
 * use closures to capture necessary state from the operator function itself.
 */
export class OperatorSubscriber extends Subscriber {
    /**
     * Creates an instance of an `OperatorSubscriber`.
     * @param destination The downstream subscriber.
     * @param onNext Handles next values, only called if this subscriber is not stopped or closed. Any
     * error that occurs in this function is caught and sent to the `error` method of this subscriber.
     * @param onError Handles errors from the subscription, any errors that occur in this handler are caught
     * and send to the `destination` error handler.
     * @param onComplete Handles completion notification from the subscription. Any errors that occur in
     * this handler are sent to the `destination` error handler.
     * @param onFinalize Additional finalization logic here. This will only be called on finalization if the
     * subscriber itself is not already closed. This is called after all other finalization logic is executed.
     * @param shouldUnsubscribe An optional check to see if an unsubscribe call should truly unsubscribe.
     * NOTE: This currently **ONLY** exists to support the strange behavior of {@link groupBy}, where unsubscription
     * to the resulting observable does not actually disconnect from the source if there are active subscriptions
     * to any grouped observable. (DO NOT EXPOSE OR USE EXTERNALLY!!!)
     */
    constructor(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
        // It's important - for performance reasons - that all of this class's
        // members are initialized and that they are always initialized in the same
        // order. This will ensure that all OperatorSubscriber instances have the
        // same hidden class in V8. This, in turn, will help keep the number of
        // hidden classes involved in property accesses within the base class as
        // low as possible. If the number of hidden classes involved exceeds four,
        // the property accesses will become megamorphic and performance penalties
        // will be incurred - i.e. inline caches won't be used.
        //
        // The reasons for ensuring all instances have the same hidden class are
        // further discussed in this blog post from Benedikt Meurer:
        // https://benediktmeurer.de/2018/03/23/impact-of-polymorphism-on-component-based-frameworks-like-react/
        super(destination);
        this.onFinalize = onFinalize;
        this.shouldUnsubscribe = shouldUnsubscribe;
        this._next = onNext
            ? function (value) {
                try {
                    onNext(value);
                }
                catch (err) {
                    destination.error(err);
                }
            }
            : super._next;
        this._error = onError
            ? function (err) {
                try {
                    onError(err);
                }
                catch (err) {
                    // Send any errors that occur down stream.
                    destination.error(err);
                }
                finally {
                    // Ensure finalization.
                    this.unsubscribe();
                }
            }
            : super._error;
        this._complete = onComplete
            ? function () {
                try {
                    onComplete();
                }
                catch (err) {
                    // Send any errors that occur down stream.
                    destination.error(err);
                }
                finally {
                    // Ensure finalization.
                    this.unsubscribe();
                }
            }
            : super._complete;
    }
    unsubscribe() {
        if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed } = this;
            super.unsubscribe();
            // Execute additional teardown if we have any and we didn't already do so.
            !closed && this.onFinalize?.();
        }
    }
}
