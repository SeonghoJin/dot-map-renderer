import { GeoJSONRenderer } from './GeoJSONRenderer';
import { DefaultRendererController } from './DefaultRendererController';
export interface IRendererDefaultInteraction {
    onWheel: (event: WheelEvent) => void;
    onMouseMove: (event: MouseEvent) => void;
    onMouseDown: (event: MouseEvent) => void;
    onMouseMoveWithMouseDown: (event: MouseEvent) => void;
    onMouseUp: (event: MouseEvent) => void;
}
export declare class DefaultRendererInteraction implements IRendererDefaultInteraction
{
    private readonly renderer;
    private readonly controller;
    mouseRatioX: number;
    mouseRatioY: number;
    offsetX: number;
    offsetY: number;
    startClientX: number;
    startClientY: number;
    constructor(renderer: GeoJSONRenderer, controller: DefaultRendererController);
    onMouseMove: (event: MouseEvent) => void;
    onWheel: (event: WheelEvent) => void;
    onMouseDown: (event: MouseEvent) => void;
    onMouseUp: (event: MouseEvent) => void;
    onMouseMoveWithMouseDown: (event: MouseEvent) => void;
    init: () => void;
}
