import { Point } from "./Point";
import { Drawable } from "./drawable";
export declare class Polygon implements Drawable {
    x: number;
    y: number;
    points: Array<Point>;
    polygonRatio: number;
    constructor(x: number, y: number, points: Array<Point>);
    resize(x: number, y: number, polygonRatio: number): void;
    draw(ctx: CanvasRenderingContext2D): void;
    mapping(point: Point): Point;
}
