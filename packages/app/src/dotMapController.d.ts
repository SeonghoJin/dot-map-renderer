import { Point } from "../../renderer/src/point";
export interface DotMapController {
    addAnchors: (points: Point[] | Point) => void;
    move: (moveY: number, moveX: number) => void;
    addZoom: (zoom: number) => void;
}
