import { Registry, EventSubscriber } from ".";

export class EventBus {
    private static _instance?: EventBus = undefined;
    private readonly _registry: Registry;
    
    private constructor() {
        this._registry = new Registry();
    }

    public static getInstance(): EventBus {
        if (this._instance == undefined) {
            this._instance = new EventBus();
        }

        return this._instance;
    }

    public static subscribe<TContext>(eventType: string, callback: Function, context: TContext) {
        this.getInstance()._registry.registerSubscriber(eventType, callback, context);
    }

    public static unsubscribe<TContext>(eventType: string, callback: Function, context: TContext) {
        this.getInstance()._registry.unregisterSubscriber(eventType, callback, context);
    }

    public static raiseEvent<TData>(eventType: string, data?: TData) {
        let instance: EventBus = this.getInstance();
        let subscribers: EventSubscriber[] = instance._registry.getSubscribers(eventType);

        for (var subscriber of subscribers) {
            subscriber.callback.call(subscriber.context, data);
        }
    }
}

export default EventBus;