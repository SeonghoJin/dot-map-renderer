import { Point } from "./point";

export class Polygon {
    ctx: CanvasRenderingContext2D;
    constructor(context: CanvasRenderingContext2D) {
        this.ctx = context;
    }

    draw(points: Array<Point>) {
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        const firstPoint = points[0];
        this.ctx.moveTo(firstPoint[0], firstPoint[1]);
        points.forEach((point) => {
            const x = (point[0]) + 180
            const y = -(point[1]) + 90;
            this.ctx.lineTo(x * 2, y * 3);
        });
        this.ctx.closePath();
        this.ctx.fill();
    }
}