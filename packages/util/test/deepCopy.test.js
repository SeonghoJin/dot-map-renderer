"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deepCopy_1 = require("../src/deepCopy");
const eventContext_1 = require("../src/eventContext");
describe('deepCopyTest', () => {
    test('객체 리터럴 복사', () => {
        const obj = {
            hi: 'hello',
            test: 'hello'
        };
        const cloneObj = (0, deepCopy_1.deepCopy)(obj);
        expect(obj).toStrictEqual(cloneObj);
        const obj1 = {
            hi: ['hello'],
            test: 'hello'
        };
        const cloneObj1 = (0, deepCopy_1.deepCopy)(obj1);
        expect(cloneObj1).toStrictEqual(obj1);
        obj1.hi.push('hello');
        expect(cloneObj1).not.toStrictEqual(obj1);
    });
    test('class 복사', () => {
        class Class {
            constructor() {
                this.hello = 'hello';
                this.hi = 'hi';
            }
            printHi() {
                console.log(this.hi);
            }
            printHello() {
                console.log(this.hello);
            }
        }
        const instance1 = new Class();
        const clone1 = (0, deepCopy_1.deepCopy)(instance1);
        expect(instance1).toStrictEqual(clone1);
        instance1.hi = 'hi2';
        expect(instance1).not.toStrictEqual(clone1);
    });
    test('class복사 2', () => {
        const instance = new eventContext_1.EventContext();
        const clone = (0, deepCopy_1.deepCopy)(instance);
        expect(instance).not.toBe(clone);
        expect(instance).toBeInstanceOf(eventContext_1.EventContext);
        expect(clone).toBeInstanceOf(eventContext_1.EventContext);
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        instance.eventArray.push(() => { });
        expect(instance).not.toStrictEqual(clone);
    });
});
//# sourceMappingURL=deepCopy.test.js.map