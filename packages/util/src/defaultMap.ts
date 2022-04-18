import { deepCopy } from './deepCopy';
import { Cloneable } from './cloneable';

export class DefaultMap<Key, Value extends (Cloneable | object | number | string)>
{
    #map = new Map<Key, Value>();
    #defalutValue: Value;

    get defaultValue()
    {
        return deepCopy(this.#defalutValue);
    }

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
            this.#map.set(key, this.defaultValue as any);

            return this.#map.get(key)!;
        }

        return value;
    }

    delete(key: Key)
    {
        this.#map.delete(key);
    }
}
