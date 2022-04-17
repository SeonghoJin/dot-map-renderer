import { DefaultMap } from '../src/DefaultMap';

test('테스트1', () =>
{
    const map = new DefaultMap('test');
    const test = map.get('key');

    expect(test).toBe(test);
});
