import { Line } from './Line';
import { ILine } from './ILine';
export declare class BasicLine extends Line {
  path: Path2D | null;
  constructor(line: ILine);
  draw(context: CanvasRenderingContext2D): void;
}
