import { GeoJSONRendererOption } from "@dot-map-renderer/renderer";
import { DotMapOptionArg } from "./dotMapOptionArg";
export declare class DotMapOption {
    dotMapOption?: DotMapOptionArg;
    constructor(option?: DotMapOptionArg);
    createRendererOption(): GeoJSONRendererOption;
}
