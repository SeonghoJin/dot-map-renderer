import { Point } from '@dot-map-renderer/component';
import { CanvasRenderer } from './CanvasRenderer';
import { IController } from './IController';
export declare class CanvasController implements IController {
    private readonly renderer;
    constructor(renderer: CanvasRenderer);
    addZoom: (zoom: number) => void;
    addAnchors: (points: Point[] | Point) => void;
    move: (moveY: number, moveX: number) => void;
}
