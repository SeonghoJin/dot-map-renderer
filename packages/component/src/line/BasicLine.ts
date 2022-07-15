import { Line } from './Line';
import { RendererContext } from '@dot-map-renderer/canvas/src/RendererContext';
import { formatll, llToStagell, Point } from '@dot-map-renderer/component';
import { LineData } from './LineData';

export class BasicLine implements Line {
  startDrawPoint: Point | undefined;
  endDrawPoint: Point | undefined;

  startPoint;
  endPoint;
  interaction;
  path: Path2D | null = null;

  constructor(
    lineData: LineData,
    options?: {
      interaction: boolean;
    },
  ) {
    const [start, end] = lineData;

    this.startPoint = start;
    this.endPoint = end;
    this.interaction = options?.interaction ?? false;
    this.path = null;
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

  resize({ stageWidth, stageHeight, stageX, stageY }: RendererContext): void {
    const [startX, startY] = llToStagell(formatll([this.startPoint[1], this.startPoint[0]]), stageWidth, stageHeight);
    const [endX, endY] = llToStagell(formatll([this.endPoint[1], this.endPoint[0]]), stageWidth, stageHeight);

    this.startDrawPoint = [startX + stageX, startY + stageY];

    this.endDrawPoint = [endX + stageX, endY + stageY];
  }

  update = (context: CanvasRenderingContext2D) => {
    this.draw(context);
  };

  start = (context: CanvasRenderingContext2D) => {
    this.update(context);
  };
}
