import { DotMapOptionArg } from "./dotMapOptionArg";
import { DotMapController } from "./dotMapController";
export declare class DotMap {
    private dotMapOption;
    constructor(dotMapOptionArg?: DotMapOptionArg);
    attaching: (parentElement: HTMLElement) => DotMapController;
}
