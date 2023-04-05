import { EventSubscriber, Registry } from "../src";

const TEST_EVENT_TYPE = "testevent";
var validator: number = 0;

test("Register Subscriber: Inline Function", () => {
    let reg: Registry = new Registry();

    reg.registerSubscriber(TEST_EVENT_TYPE, testHandler, null);
    expect(reg.isSubscribed(TEST_EVENT_TYPE, testHandler, null)).toBe(true);
});

test("Get Subscriber: Inline Function", () => {
    let reg: Registry = new Registry();

    reg.registerSubscriber(TEST_EVENT_TYPE, testHandler, null);
    expect(reg.getSubscriber(TEST_EVENT_TYPE, testHandler, null)).toBeInstanceOf(EventSubscriber);
});

test("Get Subscriber: No Handler", () => {
    let reg: Registry = new Registry();

    expect(reg.getSubscriber(TEST_EVENT_TYPE, testHandler, null)).toBeNull();
});

test("Unregister Subscriber: Inline Function", () => {
    let reg: Registry = new Registry();

    reg.registerSubscriber(TEST_EVENT_TYPE, testHandler, null);
    expect(reg.isSubscribed(TEST_EVENT_TYPE, testHandler, null)).toBe(true);

    reg.unregisterSubscriber(TEST_EVENT_TYPE, testHandler, null);
    expect(reg.isSubscribed(TEST_EVENT_TYPE, testHandler, null)).toBe(false);
});

test("Register Subscriber: Class Instance Method", () => {
    let reg: Registry = new Registry();
    let obj: TestHandlerClass = new TestHandlerClass();

    reg.registerSubscriber(TEST_EVENT_TYPE, obj.testHandler, obj);
    expect(reg.isSubscribed(TEST_EVENT_TYPE, obj.testHandler, obj)).toBe(true);
});

function testHandler() {
    validator = 1;
}

class TestHandlerClass {
    public validator: number = -1;

    constructor() {
        validator = 0;
    }

    testHandler() {
        validator = 1;
    }
}