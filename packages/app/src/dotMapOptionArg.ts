import {DotType} from "@dot-map-renderer/component";
import {GeoJSONRendererOption} from "@dot-map-renderer/renderer";

export type DotMapOptionArg = Partial<Pick<GeoJSONRendererOption, 'gapSize'
    | 'pixelSize'
    | 'backgroundColor'
    | 'pixelColor'> & {
    dotType: DotType
}>;
