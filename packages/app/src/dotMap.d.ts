import { DotMapOptionArg } from "./dotMapOptionArg";
import { RendererController } from "@dot-map-renderer/renderer/src/RendererController";
export declare class DotMap {
    private dotMapOption;
    constructor(dotMapOptionArg?: DotMapOptionArg);
    attaching: (parentElement: HTMLElement) => RendererController;
}
