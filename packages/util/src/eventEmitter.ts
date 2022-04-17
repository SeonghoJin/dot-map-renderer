import { DefaultMap } from './defaultMap';
import { EventContext, EventType } from './eventContext';
type EventKey = string;

export class EventEmitter
{
    #eventMap = new DefaultMap<EventKey, EventContext>(new EventContext());

    once = (key: EventKey, value: EventType) =>
    {
        const eventContext = this.#eventMap.get(key);
        const { eventArray } = eventContext;
        const length = eventArray.length;

        eventArray.push(() =>
        {
            value?.();
            eventArray[length] = null;
            eventContext.filter = true;
        });
    };

    emit = (key: EventKey) =>
    {
        const eventContext = this.#eventMap.get(key);

        eventContext.execute();
    };

    on = (key: EventKey, value?: EventType) =>
    {
        const eventContext = this.#eventMap.get(key);
        const { eventArray } = eventContext;

        eventContext.off = false;

        if (value !== undefined)
        {
            eventArray.push(value);
        }
    };

    off = (key: EventKey) =>
    {
        const eventContext = this.#eventMap.get(key);

        eventContext.off = true;
    };

    delete = (key: EventKey) =>
    {
        this.#eventMap.delete(key);
    };
}
