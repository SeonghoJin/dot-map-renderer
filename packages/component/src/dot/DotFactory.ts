import { DotType, CircleDot, RectDot } from '@dot-map-renderer/component';
import { Dot } from './Dot';

type CreateFunctionType = {
    new (...args: any[]): Dot
};

export class DotFactory
{
    type: DotType;
    createFunction: CreateFunctionType;

    constructor(type: DotType)
    {
        this.type = type;
        if (this.type === 'rectangular')
        {
            this.createFunction = RectDot;
        }
        else
        {
            this.createFunction = CircleDot;
        }
    }

    create(x: number, y: number, size: number, gapSize: number, color: string): Dot
    {
        return new this.createFunction(x, y, size, gapSize, color);
    }
}
