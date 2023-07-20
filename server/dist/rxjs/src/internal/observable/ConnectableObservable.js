import { Observable } from '../Observable';
import { Subscription } from '../Subscription';
import { refCount as higherOrderRefCount } from '../operators/refCount';
import { createOperatorSubscriber } from '../operators/OperatorSubscriber';
import { hasLift } from '../util/lift';
/**
 * @class ConnectableObservable<T>
 * @deprecated Will be removed in v8. Use {@link connectable} to create a connectable observable.
 * If you are using the `refCount` method of `ConnectableObservable`, use the {@link share} operator
 * instead.
 * Details: https://rxjs.dev/deprecations/multicasting
 */
export class ConnectableObservable extends Observable {
    /**
     * @param source The source observable
     * @param subjectFactory The factory that creates the subject used internally.
     * @deprecated Will be removed in v8. Use {@link connectable} to create a connectable observable.
     * `new ConnectableObservable(source, factory)` is equivalent to
     * `connectable(source, { connector: factory })`.
     * When the `refCount()` method is needed, the {@link share} operator should be used instead:
     * `new ConnectableObservable(source, factory).refCount()` is equivalent to
     * `source.pipe(share({ connector: factory }))`.
     * Details: https://rxjs.dev/deprecations/multicasting
     */
    constructor(source, subjectFactory) {
        super();
        this.source = source;
        this.subjectFactory = subjectFactory;
        this._subject = null;
        this._refCount = 0;
        this._connection = null;
        // If we have lift, monkey patch that here. This is done so custom observable
        // types will compose through multicast. Otherwise the resulting observable would
        // simply be an instance of `ConnectableObservable`.
        if (hasLift(source)) {
            this.lift = source.lift;
        }
    }
    /** @internal */
    _subscribe(subscriber) {
        return this.getSubject().subscribe(subscriber);
    }
    getSubject() {
        const subject = this._subject;
        if (!subject || subject.isStopped) {
            this._subject = this.subjectFactory();
        }
        return this._subject;
    }
    _teardown() {
        this._refCount = 0;
        const { _connection } = this;
        this._subject = this._connection = null;
        _connection?.unsubscribe();
    }
    /**
     * @deprecated {@link ConnectableObservable} will be removed in v8. Use {@link connectable} instead.
     * Details: https://rxjs.dev/deprecations/multicasting
     */
    connect() {
        let connection = this._connection;
        if (!connection) {
            connection = this._connection = new Subscription();
            const subject = this.getSubject();
            connection.add(this.source.subscribe(createOperatorSubscriber(subject, undefined, () => {
                this._teardown();
                subject.complete();
            }, (err) => {
                this._teardown();
                subject.error(err);
            }, () => this._teardown())));
            if (connection.closed) {
                this._connection = null;
                connection = Subscription.EMPTY;
            }
        }
        return connection;
    }
    /**
     * @deprecated {@link ConnectableObservable} will be removed in v8. Use the {@link share} operator instead.
     * Details: https://rxjs.dev/deprecations/multicasting
     */
    refCount() {
        return higherOrderRefCount()(this);
    }
}
