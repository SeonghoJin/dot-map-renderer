import { Cloneable } from './cloneable';

export class EventContext<T extends (...args: any[]) => any> implements Cloneable
{
    eventArray: (T | null)[] = [];
    filter = false;
    off = false;

    #filterEventArrayIfFilterIsTrue = () =>
    {
        if (this.filter)
        {
            const filteredEventArray = this.eventArray.filter(Boolean);

            this.eventArray.splice(0, this.eventArray.length);
            this.eventArray.push(...filteredEventArray);
        }
    };

    execute = (...args: Parameters<T>) : (ReturnType<T> | undefined) =>
    {
        this.#filterEventArrayIfFilterIsTrue();
        if (this.off)
        {
            return undefined;
        }

        this.eventArray.forEach((event) =>
        {
            (event as T)(...args);
        });
    };

    clone(): Cloneable
    {
        return new EventContext();
    }
}
