"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultMap_1 = require("../src/defaultMap");
describe('default = array', () => {
    const defaultMap = new defaultMap_1.DefaultMap([]);
    test('기본 값이 잘 들어가는지 테스트', () => {
        const test1 = defaultMap.get('key');
        expect(test1).toStrictEqual([]);
    });
    test('얕은 복사인지 테스트', () => {
        const test1 = defaultMap.get('key');
        test1.push('hi');
        const test2 = defaultMap.get('key');
        expect(test1).toStrictEqual(test2);
        test1.push('hello');
        expect(test1).toStrictEqual(test2);
        const test3 = defaultMap.get('key2');
        expect(test3).toStrictEqual([]);
        expect(test1).not.toStrictEqual(test3);
    });
});
describe('default = string', () => {
    const defaultMap = new defaultMap_1.DefaultMap('hi');
    test('기본 값이 잘 들어가는지 테스트', () => {
        const test1 = defaultMap.get('key');
        expect(test1).toEqual('hi');
    });
});
describe('default = object', () => {
    const defaultMap = new defaultMap_1.DefaultMap({
        hi: 'hello',
        hello: 'hi',
    });
    test('기본 값이 잘 들어가는지 테스트', () => {
        const test1 = defaultMap.get('key');
        expect(test1).toStrictEqual({
            hi: 'hello',
            hello: 'hi'
        });
    });
    test('얕은 복사인가?', () => {
        const test1 = defaultMap.get('key');
        test1.yes = 'yes';
        const test2 = defaultMap.get('key');
        expect(test1).toStrictEqual(test2);
    });
});
describe('default = number', () => {
    const defaultMap = new defaultMap_1.DefaultMap(0);
    test('기본 값이 잘 들어가는지 테스트', () => {
        const test1 = defaultMap.get('key');
        expect(test1).toEqual(0);
    });
});
//# sourceMappingURL=defaultMap.test.js.map