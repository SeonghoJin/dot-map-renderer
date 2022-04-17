type EventKey = string;
type EventValue = (...args: any[]) => any;

export class EventEmitter
{
    #eventMap = new Map<EventKey, EventValue[]>();

    // once = (key: EventKey, value: EventValue) =>
    // {
    //     const eventArray = this.#eventMap.get(key);
    //
    //     if (eventArray == null)
    //     {
    //         this.#eventMap.set(key, []);
    //     }
    // eventMap.push(value);
    // };

    // on = () =>
    // {
    //
    // };
    //
    // add = () =>
    // {
    //
    // };
}
