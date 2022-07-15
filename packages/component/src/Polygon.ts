import { Point } from './Point';
import { Drawable } from './Drawable';
import { formatll } from './coordinateNormalization';

export class Polygon implements Drawable {
  x: number;
  y: number;
  points: Array<Point>;
  polygonRatio: number;
  path: null | Path2D;
  color = '#111111';

  constructor(x: number, y: number, points: Array<Point>) {
    this.x = x;
    this.y = y;
    this.points = points;
    this.polygonRatio = 0;
    this.path = null;
  }

  resize(x: number, y: number, polygonRatio: number) {
    this.x = x;
    this.y = y;
    this.polygonRatio = polygonRatio;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const firstPoint = this.mapping(this.points[0]);

    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.moveTo(firstPoint[0], firstPoint[1]);
    this.points.forEach((point) => {
      const mappedPoint = this.mapping(point);

      ctx.lineTo(mappedPoint[0], mappedPoint[1]);
    });
    ctx.closePath();
    ctx.fill();
  }

  mapping(point: Point): Point {
    const [x, y] = formatll(point);

    return [this.x + x * this.polygonRatio, this.y + y * this.polygonRatio];
  }
}
