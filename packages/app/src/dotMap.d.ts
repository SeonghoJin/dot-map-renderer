import { DotMapOptionArg } from './dotMapOptionArg';
import { IController } from '@dot-map-renderer/canvas';
export declare class DotMap {
    private dotMapOption;
    private defaultController?;
    constructor(dotMapOptionArg?: DotMapOptionArg);
    attaching: (parentElement: HTMLElement) => void;
    get controller(): IController;
}
