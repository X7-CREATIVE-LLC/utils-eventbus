import EventSubscriber from "./EventSubscriber";

export class Registry {

    private _subscribers: EventSubscriber[];

    constructor() {
        this._subscribers = [];
    }

    registerSubscriber<TContext>(eventType: string, callback: Function, context: TContext) {
        if (!this.isSubscribed(eventType, callback, context)) {
            this._subscribers.push(new EventSubscriber(eventType, callback, context));
        }
    }

    unregisterSubscriber<TContext>(eventType: string, callback: Function, context: TContext) {
        let subscriber: EventSubscriber | null = this.getSubscriber(eventType, callback, context);
        let index: number;

        if (subscriber == null) {
            return;
        }

        index =  this._subscribers.indexOf(subscriber, 0);

        if (index >= 0) {
            this._subscribers.splice(index, 1);
        }
    }

    getSubscriber<TContext>(eventType: string, callback: Function, context: TContext): EventSubscriber | null {
        return this._subscribers.find(s => s.eventType == eventType && s.callback == callback) || null;
    }

    getSubscribers(eventType: string): EventSubscriber[] {
        return this._subscribers.filter(s => s.eventType == eventType);
    }

    isSubscribed<TContext>(eventType: string, callback: Function, context: TContext) {
        return (this._subscribers.find(s => s.eventType == eventType && s.callback == callback) != undefined);
    }
}

export default Registry;