import { ReplaySubject } from '../ReplaySubject';
import { multicast } from './multicast';
import { isFunction } from '../util/isFunction';
/**
 * @deprecated Will be removed in v8. Use the {@link connectable} observable, the {@link connect} operator or the
 * {@link share} operator instead. See the overloads below for equivalent replacement examples of this operator's
 * behaviors.
 * Details: https://rxjs.dev/deprecations/multicasting
 */
export function publishReplay(bufferSize, windowTime, selectorOrScheduler, timestampProvider) {
    if (selectorOrScheduler && !isFunction(selectorOrScheduler)) {
        timestampProvider = selectorOrScheduler;
    }
    const selector = isFunction(selectorOrScheduler) ? selectorOrScheduler : undefined;
    // Note, we're passing `selector!` here, because at runtime, `undefined` is an acceptable argument
    // but it makes our TypeScript signature for `multicast` unhappy (as it should, because it's gross).
    return (source) => multicast(new ReplaySubject(bufferSize, windowTime, timestampProvider), selector)(source);
}
