export declare class EventContext<T extends (...args: any[]) => any> {
    #private;
    eventArray: (T | null)[];
    filter: boolean;
    off: boolean;
    execute: (...args: Parameters<T>) => (ReturnType<T> | undefined);
}
