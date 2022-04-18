export declare class DefaultMap<Key, Value> {
    #private;
    get defaultValue(): any;
    constructor(defaultValue: Value);
    set(key: Key, value: Value): void;
    get(key: Key): Value;
    delete(key: Key): void;
}
