import { isCloneable } from './isCloneable';

export const deepCopy = (obj: any) =>
{
    if (isCloneable(obj))
    {
        return obj.clone();
    }
    else if (typeof obj === 'string' || typeof obj === 'function')
    {
        return obj as any;
    }
    else if ((obj).length !== undefined)
    {
        return Array.from(obj as any);
    }
    else if (typeof obj === 'object' && obj !== null)
    {
        const clone = Object.assign(Object.create(Object.getPrototypeOf(obj)), obj);

        for (const key in obj)
        {
            if (typeof clone[key] !== 'function')
            {
                clone[key] = deepCopy(obj[key]);
            }
        }

        return clone;
    }

    return obj;
};
