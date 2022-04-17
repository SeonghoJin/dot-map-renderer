export type EventType = ((...args: any[]) => any);

export class EventContext
{
    eventArray: (EventType | null)[] = [];
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

    execute = () =>
    {
        this.#filterEventArrayIfFilterIsTrue();
        if (this.off)
        {
            return;
        }
        this.eventArray.forEach((event) =>
        {
            (event as EventType)();
        });
    };
}
