export function executeSchedule(parentSubscription, scheduler, work, delay = 0, repeat = false) {
    const scheduleSubscription = scheduler.schedule(function () {
        work();
        if (repeat) {
            parentSubscription.add(this.schedule(null, delay));
        }
        else {
            this.unsubscribe();
        }
    }, delay);
    parentSubscription.add(scheduleSubscription);
    if (!repeat) {
        // Because user-land scheduler implementations are unlikely to properly reuse
        // Actions for repeat scheduling, we can't trust that the returned subscription
        // will control repeat subscription scenarios. So we're trying to avoid using them
        // incorrectly within this library.
        return scheduleSubscription;
    }
}
