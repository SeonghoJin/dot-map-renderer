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
            let cloneDefaultValue = null;

            if (typeof this.#defalutValue === 'string')
            {
                cloneDefaultValue = this.#defalutValue as any;
            }
            else if ((this.#defalutValue as any).length !== undefined)
            {
                cloneDefaultValue = Array.from(this.#defalutValue as any);
            }
            else if (typeof this.#defalutValue === 'object')
            {
                cloneDefaultValue = Object.assign({}, this.#defalutValue);
            }
            else
            {
                cloneDefaultValue = this.#defalutValue;
            }

            this.#map.set(key, cloneDefaultValue as any);

            return this.#map.get(key)!;
        }

        return value;
    }

    delete(key: Key)
    {
        this.#map.delete(key);
    }
}
