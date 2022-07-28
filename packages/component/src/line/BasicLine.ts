import { Line } from './Line';
import { ILine } from './ILine';

export class BasicLine extends Line {
  path: Path2D | null = null;

  constructor(line: ILine) {
    super(line);
  }

  draw(context: CanvasRenderingContext2D): void {
    const [startX, startY] = this.startDrawPoint!;
    const [endX, endY] = this.endDrawPoint!;

    this.path = new Path2D();
    this.path.moveTo(startX, startY);
    this.path.lineTo(endX, endY);
    context.beginPath();
    context.lineWidth = 10;
    context.stroke(this.path);
  }
}
