import { GeoJSONRendererOption } from "../../renderer/src/geoJSONRendererOption";
import { DotMapOptionArg } from "./dotMapOptionArg";
export declare class DotMapOption {
    dotMapOption?: DotMapOptionArg;
    constructor(option?: DotMapOptionArg);
    createRendererOption(): GeoJSONRendererOption;
}
