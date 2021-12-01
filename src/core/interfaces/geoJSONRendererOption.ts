import {DotType} from "../type/DotType";

export interface GeoJSONRendererOption {
    backgroundColor?: string;
    pixelColor?: string;
    defaultPixelSize?: number;
    defaultGapSize?: number;
    dotType?: DotType
}