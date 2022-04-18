import { deepCopy } from '../src/deepCopy';
import { EventContext } from '../src/eventContext';

describe('deepCopyTest', () =>
{
    test('객체 리터럴 복사', () =>
    {
        const obj = {
            hi: 'hello',
            test: 'hello'
        };

        const cloneObj = deepCopy(obj);

        expect(obj).toStrictEqual(cloneObj);

        const obj1 = {
            hi: ['hello'],
            test: 'hello'
        };

        const cloneObj1 = deepCopy(obj1);

        expect(cloneObj1).toStrictEqual(obj1);
        obj1.hi.push('hello');
        expect(cloneObj1).not.toStrictEqual(obj1);
    });

    test('class 복사', () =>
    {
        class Class
        {
            hello = 'hello';
            hi: string;
            constructor()
            {
                this.hi = 'hi';
            }

            printHi()
            {
                console.log(this.hi);
            }

            printHello()
            {
                console.log(this.hello);
            }
        }

        const instance1 = new Class();
        const clone1 = deepCopy(instance1);

        expect(instance1).toStrictEqual(clone1);

        instance1.hi = 'hi2';

        expect(instance1).not.toStrictEqual(clone1);
    });

    test('class복사 2', () =>
    {
        const instance = new EventContext();
        const clone = deepCopy(instance);

        expect(instance).not.toBe(clone);
        expect(instance).toBeInstanceOf(EventContext);
        expect(clone).toBeInstanceOf(EventContext);

        // eslint-disable-next-line @typescript-eslint/no-empty-function
        instance.eventArray.push(() => {});
        expect(instance).not.toStrictEqual(clone);
    });
});
