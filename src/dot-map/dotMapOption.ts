import {GeoJSONRendererOption} from "../core/types/geoJSONRendererOption";
import { DotMapOptionArg } from "./type/dotMapOptionArg";
import {DotFactory} from "../core/dotFactory";

export class DotMapOption {
    dotMapOption?: DotMapOptionArg;
    constructor(option?: DotMapOptionArg) {
        this.dotMapOption = option;
    }

    createRendererOption() : GeoJSONRendererOption {
        return {
            defaultPixelSize: this.dotMapOption?.defaultPixelSize ?? 4,
            defaultGapSize: this.dotMapOption?.defaultGapSize ?? 2,
            backgroundColor: this.dotMapOption?.backgroundColor ?? 'black',
            pixelColor: this.dotMapOption?.pixelColor ?? '#D3D3D3',
            dotFactory: new DotFactory(this.dotMapOption?.dotType || 'circle'),
        }
    }
}