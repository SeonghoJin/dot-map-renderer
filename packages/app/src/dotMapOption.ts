import {GeoJSONRendererOption} from "@dot-map-renderer/renderer";
import { DotMapOptionArg } from "./dotMapOptionArg";
import {DotFactory} from "@dot-map-renderer/renderer";

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