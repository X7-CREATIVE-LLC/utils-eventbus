import { getTextOfJSDocComment } from 'typescript';
import { v4 as uuidv4 } from 'uuid';

export class EventSubscriber {
    readonly id: string;
    readonly eventType: string;
    readonly callback: Function;
    readonly context: any;

    constructor(eventType: string, callback: Function, context: any) {
        this.id = uuidv4();
        this.eventType = eventType;
        this.callback = callback;
        this.context = context;
    }
}

export default EventSubscriber;