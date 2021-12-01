import { Point } from "./point";
export declare class Polygon {
    x: number;
    y: number;
    points: Array<Point>;
    polygonRatio: number;
    constructor(x: number, y: number, polygonRatio: number, points: Array<Point>);
    resize(x: number, y: number, polygonRatio: number): void;
    draw(ctx: CanvasRenderingContext2D): void;
    mapping(point: Point): Point;
}
