import {Point} from "@dot-map-renderer/renderer";

export interface DotMapController {
    addAnchors : (points: Point[] | Point) => void;
    move : (moveY: number, moveX: number) => void;
    addZoom : (zoom: number) => void;
}