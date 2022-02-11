import { DotMapOptionArg } from "./dotMapOptionArg";
import { RendererDefaultController } from "@dot-map-renderer/renderer";
export declare class DotMap {
    private dotMapOption;
    private defaultController?;
    constructor(dotMapOptionArg?: DotMapOptionArg);
    attaching: (parentElement: HTMLElement) => void;
    get controller(): RendererDefaultController;
}
