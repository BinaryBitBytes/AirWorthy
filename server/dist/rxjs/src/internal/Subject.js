import { Observable } from './Observable';
import { Subscription, EMPTY_SUBSCRIPTION } from './Subscription';
import { ObjectUnsubscribedError } from './util/ObjectUnsubscribedError';
import { arrRemove } from './util/arrRemove';
import { errorContext } from './util/errorContext';
/**
 * A Subject is a special type of Observable that allows values to be
 * multicasted to many Observers. Subjects are like EventEmitters.
 *
 * Every Subject is an Observable and an Observer. You can subscribe to a
 * Subject, and you can call next to feed values as well as error and complete.
 */
class Subject extends Observable {
    constructor() {
        // NOTE: This must be here to obscure Observable's constructor.
        super();
        this.closed = false;
        this.currentObservers = null;
        /** @deprecated Internal implementation detail, do not use directly. Will be made internal in v8. */
        this.observers = [];
        /** @deprecated Internal implementation detail, do not use directly. Will be made internal in v8. */
        this.isStopped = false;
        /** @deprecated Internal implementation detail, do not use directly. Will be made internal in v8. */
        this.hasError = false;
        /** @deprecated Internal implementation detail, do not use directly. Will be made internal in v8. */
        this.thrownError = null;
    }
    /** @deprecated Internal implementation detail, do not use directly. Will be made internal in v8. */
    lift(operator) {
        const subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    }
    /** @internal */
    _throwIfClosed() {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
    }
    next(value) {
        errorContext(() => {
            this._throwIfClosed();
            if (!this.isStopped) {
                if (!this.currentObservers) {
                    this.currentObservers = Array.from(this.observers);
                }
                for (const observer of this.currentObservers) {
                    observer.next(value);
                }
            }
        });
    }
    error(err) {
        errorContext(() => {
            this._throwIfClosed();
            if (!this.isStopped) {
                this.hasError = this.isStopped = true;
                this.thrownError = err;
                const { observers } = this;
                while (observers.length) {
                    observers.shift().error(err);
                }
            }
        });
    }
    complete() {
        errorContext(() => {
            this._throwIfClosed();
            if (!this.isStopped) {
                this.isStopped = true;
                const { observers } = this;
                while (observers.length) {
                    observers.shift().complete();
                }
            }
        });
    }
    unsubscribe() {
        this.isStopped = this.closed = true;
        this.observers = this.currentObservers = null;
    }
    get observed() {
        return this.observers?.length > 0;
    }
    /** @internal */
    _trySubscribe(subscriber) {
        this._throwIfClosed();
        return super._trySubscribe(subscriber);
    }
    /** @internal */
    _subscribe(subscriber) {
        this._throwIfClosed();
        this._checkFinalizedStatuses(subscriber);
        return this._innerSubscribe(subscriber);
    }
    /** @internal */
    _innerSubscribe(subscriber) {
        const { hasError, isStopped, observers } = this;
        if (hasError || isStopped) {
            return EMPTY_SUBSCRIPTION;
        }
        this.currentObservers = null;
        observers.push(subscriber);
        return new Subscription(() => {
            this.currentObservers = null;
            arrRemove(observers, subscriber);
        });
    }
    /** @internal */
    _checkFinalizedStatuses(subscriber) {
        const { hasError, thrownError, isStopped } = this;
        if (hasError) {
            subscriber.error(thrownError);
        }
        else if (isStopped) {
            subscriber.complete();
        }
    }
    /**
     * Creates a new Observable with this Subject as the source. You can do this
     * to create custom Observer-side logic of the Subject and conceal it from
     * code that uses the Observable.
     * @return {Observable} Observable that the Subject casts to
     */
    asObservable() {
        const observable = new Observable();
        observable.source = this;
        return observable;
    }
}
/**
 * Creates a "subject" by basically gluing an observer to an observable.
 *
 * @nocollapse
 * @deprecated Recommended you do not use. Will be removed at some point in the future. Plans for replacement still under discussion.
 */
Subject.create = (destination, source) => {
    return new AnonymousSubject(destination, source);
};
export { Subject };
/**
 * @class AnonymousSubject<T>
 */
export class AnonymousSubject extends Subject {
    constructor(
    /** @deprecated Internal implementation detail, do not use directly. Will be made internal in v8. */
    destination, source) {
        super();
        this.destination = destination;
        this.source = source;
    }
    next(value) {
        this.destination?.next?.(value);
    }
    error(err) {
        this.destination?.error?.(err);
    }
    complete() {
        this.destination?.complete?.();
    }
    /** @internal */
    _subscribe(subscriber) {
        return this.source?.subscribe(subscriber) ?? EMPTY_SUBSCRIPTION;
    }
}
