export class DefaultMap<Key, Value>
{
    #map = new Map<Key, Value>();
    #defalutValue: Value;

    constructor(defaultValue: Value)
    {
        this.#defalutValue = defaultValue;
    }

    set(key: Key, value: Value)
    {
        this.#map.set(key, value);
    }

    get(key: Key)
    {
        const value = this.#map.get(key);

        if (value === undefined)
        {
            const cloneDefaultValue = Object.assign({}, this.#defalutValue);

            this.#map.set(key, cloneDefaultValue);

            return cloneDefaultValue;
        }

        return value;
    }

    delete(key: Key)
    {
        this.#map.delete(key);
    }
}
