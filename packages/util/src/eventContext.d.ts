import { Cloneable } from './cloneable';
export declare class EventContext<T extends (...args: any[]) => any> implements Cloneable {
    #private;
    eventArray: (T | null)[];
    filter: boolean;
    off: boolean;
    execute: (...args: Parameters<T>) => (ReturnType<T> | undefined);
    clone(): Cloneable;
}
