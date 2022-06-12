import { Cloneable } from './cloneable';
export declare class DefaultMap<Key, Value extends (Cloneable | object | number | string)> {
    #private;
    get defaultValue(): any;
    constructor(defaultValue: Value);
    set(key: Key, value: Value): void;
    get(key: Key): Value;
    delete(key: Key): void;
}
