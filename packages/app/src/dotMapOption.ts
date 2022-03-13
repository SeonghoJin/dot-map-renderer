import { GeoJSONRendererOption } from '@dot-map-renderer/renderer';
import { DotMapOptionArg } from './dotMapOptionArg';
import { DotFactory } from '@dot-map-renderer/component';

export class DotMapOption
{
    dotMapOption?: DotMapOptionArg;

    constructor(option?: DotMapOptionArg)
    {
        this.dotMapOption = option;
    }

    createRendererOption(): GeoJSONRendererOption
    {
        return {
            pixelSize: this.dotMapOption?.pixelSize ?? 4,
            gapSize: this.dotMapOption?.gapSize ?? 2,
            backgroundColor: this.dotMapOption?.backgroundColor ?? 'black',
            pixelColor: this.dotMapOption?.pixelColor ?? '#D3D3D3',
            dotFactory: new DotFactory(this.dotMapOption?.dotType || 'circle'),
        };
    }
}
