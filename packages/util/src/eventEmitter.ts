import { DefaultMap } from './defaultMap';
import { EventContext } from './eventContext';

export class EventEmitter<T extends {
    [x: string]: (...args: any[]) => void
}>
{
    #eventMap = new DefaultMap<keyof T, EventContext<T[keyof T]>>(new EventContext());

    once = (key: keyof T, value: T[keyof T]) =>
    {
        const eventContext = this.#eventMap.get(key);
        const { eventArray } = eventContext;
        const length = eventArray.length;

        eventArray.push(((...args) =>
        {
            eventArray[length] = null;
            eventContext.filter = true;
            value?.(...args);
        }) as T[keyof T]);
    };

    emit = (key: keyof T, ...args: Parameters<T[keyof T]>) =>
    {
        const eventContext = this.#eventMap.get(key);

        eventContext.execute(...args);
    };

    on = (key: keyof T, value?: T[keyof T]) =>
    {
        const eventContext = this.#eventMap.get(key);
        const { eventArray } = eventContext;

        eventContext.off = false;

        if (value !== undefined)
        {
            eventArray.push(value);
        }
    };

    off = (key: keyof T) =>
    {
        const eventContext = this.#eventMap.get(key);

        eventContext.off = true;
    };

    delete = (key: keyof T) =>
    {
        this.#eventMap.delete(key);
    };
}
