import { DotMapOptionArg } from './dotMapOptionArg';
import { IController } from '@dot-map-renderer/canvas';
export declare class DotMap {
    private dotMapOption;
    private parentElement;
    private renderer;
    private controller;
    private interaction;
    constructor(dotMapOptionArg?: DotMapOptionArg);
    attach: (parentElement: HTMLElement) => void;
    detach: () => void;
    getController: () => IController;
}
