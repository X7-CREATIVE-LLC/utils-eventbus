import { EventBus } from "../src";

const TEST_EVENT_TYPE = "testevent";
const TEST_EVENT_DATA = "test string";

var validator: number = 0;
var validationData: string;

test("Confirm getInstance() Returns Singleton", () => {
    let obj1: EventBus;
    let obj2: EventBus;

    expect(EventBus.getInstance()).toEqual(EventBus.getInstance());
});

test("Confirm Subscribed Handler Ran: Inline Method", () => {
    EventBus.subscribe(TEST_EVENT_TYPE, testHandler, this);
    EventBus.raiseEvent(TEST_EVENT_TYPE, TEST_EVENT_DATA);
    expect(validator).toEqual(1);
});

test("Confirm Subscribed Handler Ran: Object Method", () => {
    let obj: TestHandlerClass = new TestHandlerClass();

    EventBus.subscribe(TEST_EVENT_TYPE, obj.testHandler, obj);
    EventBus.raiseEvent(TEST_EVENT_TYPE, { message: TEST_EVENT_DATA });
    expect(obj.validator).toEqual(1);
    expect(obj.validationData).toEqual(TEST_EVENT_DATA);
});

function testHandler(data: { message: string }) {
    validator = 1;
    validationData = data.message;
}

class TestHandlerClass {
    public validator: number = -1;
    public validationData: string;

    constructor() {
        this.validator = 0;
        this.validationData = "";
    }

    testHandler(data: { message: string }) {
        this.validator = 1;
        this.validationData = data.message;
    }
}