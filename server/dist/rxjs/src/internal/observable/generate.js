import { identity } from '../util/identity';
import { isScheduler } from '../util/isScheduler';
import { defer } from './defer';
import { scheduleIterable } from '../scheduled/scheduleIterable';
export function generate(initialStateOrOptions, condition, iterate, resultSelectorOrScheduler, scheduler) {
    let resultSelector;
    let initialState;
    // TODO: Remove this as we move away from deprecated signatures
    // and move towards a configuration object argument.
    if (arguments.length === 1) {
        // If we only have one argument, we can assume it is a configuration object.
        // Note that folks not using TypeScript may trip over this.
        ({
            initialState,
            condition,
            iterate,
            resultSelector = identity,
            scheduler,
        } = initialStateOrOptions);
    }
    else {
        // Deprecated arguments path. Figure out what the user
        // passed and set it here.
        initialState = initialStateOrOptions;
        if (!resultSelectorOrScheduler || isScheduler(resultSelectorOrScheduler)) {
            resultSelector = identity;
            scheduler = resultSelectorOrScheduler;
        }
        else {
            resultSelector = resultSelectorOrScheduler;
        }
    }
    // The actual generator used to "generate" values.
    function* gen() {
        for (let state = initialState; !condition || condition(state); state = iterate(state)) {
            yield resultSelector(state);
        }
    }
    // We use `defer` because we want to defer the creation of the iterator from the iterable.
    return defer((scheduler
        ? // If a scheduler was provided, use `scheduleIterable` to ensure that iteration/generation
            // happens on the scheduler.
            () => scheduleIterable(gen(), scheduler)
        : // Otherwise, if there's no scheduler, we can just use the generator function directly in
            // `defer` and executing it will return the generator (which is iterable).
            gen));
}
