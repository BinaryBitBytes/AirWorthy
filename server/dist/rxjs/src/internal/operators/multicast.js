import { ConnectableObservable } from '../observable/ConnectableObservable';
import { isFunction } from '../util/isFunction';
import { connect } from './connect';
/**
 * @deprecated Will be removed in v8. Use the {@link connectable} observable, the {@link connect} operator or the
 * {@link share} operator instead. See the overloads below for equivalent replacement examples of this operator's
 * behaviors.
 * Details: https://rxjs.dev/deprecations/multicasting
 */
export function multicast(subjectOrSubjectFactory, selector) {
    const subjectFactory = isFunction(subjectOrSubjectFactory) ? subjectOrSubjectFactory : () => subjectOrSubjectFactory;
    if (isFunction(selector)) {
        // If a selector function is provided, then we're a "normal" operator that isn't
        // going to return a ConnectableObservable. We can use `connect` to do what we
        // need to do.
        return connect(selector, {
            connector: subjectFactory,
        });
    }
    return (source) => new ConnectableObservable(source, subjectFactory);
}
