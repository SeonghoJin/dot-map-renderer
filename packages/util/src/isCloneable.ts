import { Cloneable } from './cloneable';

export const isCloneable = (obj: any): obj is Cloneable =>
{
    if (obj.clone)
    {
        return true;
    }

    return false;
};
