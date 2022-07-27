import { IInteraction } from './IInteraction';
import { IController } from './IController';
import { IRenderer } from './IRenderer';
export declare class CanvasInteraction implements IInteraction {
    private readonly renderer;
    private readonly controller;
    mouseRatioX: number;
    mouseRatioY: number;
    offsetX: number;
    offsetY: number;
    startClientX: number;
    startClientY: number;
    currentMouseX: number | null;
    currentMouseY: number | null;
    constructor(renderer: IRenderer, controller: IController);
    initInteraction(): void;
    remove(): void;
    onMouseMove: (event: MouseEvent) => void;
    onWheel: (event: WheelEvent) => void;
    onMouseDown: (event: MouseEvent) => void;
    onMouseUp: () => void;
    onMouseMoveWithMouseDown: (event: MouseEvent) => void;
}
