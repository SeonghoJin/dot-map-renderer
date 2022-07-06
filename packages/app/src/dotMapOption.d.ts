import { IRendererOption } from '@dot-map-renderer/canvas';
import { DotMapOptionArg } from './dotMapOptionArg';
export declare class DotMapOption implements DotMapOptionArg {
    pixelSize: number;
    gapSize: number;
    backgroundColor: string;
    pixelColor: string;
    dotType: import("@dot-map-renderer/component").DotType;
    renderer: "canvas" | "webgl";
    constructor(option?: DotMapOptionArg);
    createRendererOption(): IRendererOption;
}
