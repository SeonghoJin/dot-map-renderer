import { Point } from '@dot-map-renderer/component';
import { CanvasRenderer } from './CanvasRenderer';
export interface IRendererController {
    addAnchors: (points: Point[] | Point) => void;
    move: (moveY: number, moveX: number) => void;
    addZoom: (zoom: number) => void;
}
export declare class DefaultRendererController implements IRendererController {
    private readonly renderer;
    constructor(renderer: CanvasRenderer);
    addZoom: (zoom: number) => void;
    addAnchors: (points: Point[] | Point) => void;
    move: (moveY: number, moveX: number) => void;
}
