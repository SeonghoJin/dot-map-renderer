import { Point } from "../interfaces/point";
import {Drawable} from "../interfaces/drawable";

export class Polygon implements Drawable{
    x: number;
    y: number;
    points: Array<Point>;
    polygonRatio: number;
    constructor(x: number, y: number, polygonRatio: number, points: Array<Point>) {
        this.x = x;
        this.y = y;
        this.points = points;
        this.polygonRatio = polygonRatio;
    }

    resize(x: number, y: number, polygonRatio: number) {
        this.x = x;
        this.y = y;
        this.polygonRatio = polygonRatio;
    }

    draw(ctx: CanvasRenderingContext2D) {
        const firstPoint = this.mapping(this.points[0]);
        ctx.beginPath();
        ctx.moveTo(firstPoint[0], firstPoint[1]);
        this.points.forEach((point) => {
            const mappedPoint = this.mapping(point);
            ctx.lineTo(mappedPoint[0], mappedPoint[1]);
        });
        ctx.fill();
    }

    mapping(point: Point): Point {
        return [
            this.x + (point[0] + 180) * this.polygonRatio,
            this.y + (-(point[1]) + 90) * this.polygonRatio,
        ];
    }
}