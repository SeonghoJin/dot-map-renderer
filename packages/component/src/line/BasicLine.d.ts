import { Line } from './Line';
import { RendererContext } from '@dot-map-renderer/canvas/src/RendererContext';
import { Point } from '@dot-map-renderer/component';
import { LineData } from './LineData';
export declare class BasicLine implements Line {
  startDrawPoint: Point | undefined;
  endDrawPoint: Point | undefined;
  startPoint: Point;
  endPoint: Point;
  interaction: boolean;
  path: Path2D | null;
  constructor(
    lineData: LineData,
    options?: {
      interaction: boolean;
    },
  );
  draw(context: CanvasRenderingContext2D): void;
  resize({ stageWidth, stageHeight, stageX, stageY }: RendererContext): void;
  update: (context: CanvasRenderingContext2D) => void;
  start: (context: CanvasRenderingContext2D) => void;
}
