export class SubscriptionLog {
    constructor(subscribedFrame, unsubscribedFrame = Infinity) {
        this.subscribedFrame = subscribedFrame;
        this.unsubscribedFrame = unsubscribedFrame;
    }
}
