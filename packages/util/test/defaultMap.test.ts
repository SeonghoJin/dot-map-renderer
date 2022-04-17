import { DefaultMap } from '../src/defaultMap';

describe('default = array', () =>
{
    const defaultMap = new DefaultMap<string, string[]>([]);

    test('기본 값이 잘 들어가는지 테스트', () =>
    {
        const test1 = defaultMap.get('key');

        expect(test1).toStrictEqual([]);
    });

    test('얕은 복사인지 테스트', () =>
    {
        const test1 = defaultMap.get('key');

        test1.push('hi');
        const test2 = defaultMap.get('key');

        expect(test1).toStrictEqual(test2);

        test1.push('hello');
        expect(test1).toStrictEqual(test2);
    });
});

describe('default = string', () =>
{
    const defaultMap = new DefaultMap<string, string>('hi');

    test('기본 값이 잘 들어가는지 테스트', () =>
    {
        const test1 = defaultMap.get('key');

        expect(test1).toEqual('hi');
    });
});

describe('default = object', () =>
{
    const defaultMap = new DefaultMap<string, object>({
        hi: 'hello',
        hello: 'hi',
    });

    test('기본 값이 잘 들어가는지 테스트', () =>
    {
        const test1 = defaultMap.get('key');

        expect(test1).toStrictEqual({
            hi: 'hello',
            hello: 'hi'
        });
    });

    test('얕은 복사인가?', () =>
    {
        const test1 = defaultMap.get('key');

        (test1 as any).yes = 'yes';
        const test2 = defaultMap.get('key');

        expect(test1).toStrictEqual(test2);
    });
});

describe('default = number', () =>
{
    const defaultMap = new DefaultMap<string, number>(0);

    test('기본 값이 잘 들어가는지 테스트', () =>
    {
        const test1 = defaultMap.get('key');

        expect(test1).toEqual(0);
    });
});

