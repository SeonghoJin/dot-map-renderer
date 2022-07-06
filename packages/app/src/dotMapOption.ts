import { IRendererOption } from '@dot-map-renderer/canvas';
import { DotMapOptionArg } from './dotMapOptionArg';
import { DotFactory } from '@dot-map-renderer/component';

export class DotMapOption implements DotMapOptionArg
{
    pixelSize;
    gapSize;
    backgroundColor;
    pixelColor;
    dotType;
    renderer;

    constructor(option?: DotMapOptionArg)
    {
        this.pixelSize = option?.pixelSize ?? 4;
        this.gapSize = option?.gapSize ?? 2;
        this.backgroundColor = option?.backgroundColor ?? 'black';
        this.pixelColor = option?.pixelColor ?? '#D3D3D3';
        this.dotType = option?.dotType ?? 'circle';
        this.renderer = option?.renderer ?? 'canvas';
    }

    createRendererOption(): IRendererOption
    {
        const {
            pixelSize,
            gapSize,
            backgroundColor,
            pixelColor,
            dotType
        } = this;

        return {
            pixelSize,
            gapSize,
            backgroundColor,
            pixelColor,
            dotFactory: new DotFactory(dotType || 'circle'),
        };
    }
}
