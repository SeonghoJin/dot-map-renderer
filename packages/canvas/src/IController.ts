import { Point } from '@dot-map-renderer/component';

export interface IController {
    addAnchors: (points: Point[] | Point) => void;
    move: (moveY: number, moveX: number) => void;
    addZoom: (zoom: number) => void;
}
