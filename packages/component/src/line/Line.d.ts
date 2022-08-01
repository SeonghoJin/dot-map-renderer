import { IComponent } from '../IComponent';
import { RendererContext } from '@dot-map-renderer/canvas/src/RendererContext';
import { ILine } from './ILine';
import { Point } from '../Point';
export declare abstract class Line extends IComponent {
  startPoint: Point;
  endPoint: Point;
  startDrawPoint: Point | null;
  endDrawPoint: Point | null;
  constructor(line: ILine);
  resize({ stageWidth, stageHeight, stageX, stageY }: RendererContext): void;
}
