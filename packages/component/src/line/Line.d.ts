import { IComponent } from '../IComponent';
import { Point } from '@dot-map-renderer/component';
import { RendererContext } from '@dot-map-renderer/canvas/src/RendererContext';
import { ILine } from './ILine';
export declare abstract class Line extends IComponent {
  startPoint: Point;
  endPoint: Point;
  startDrawPoint: Point | null;
  endDrawPoint: Point | null;
  protected constructor(line: ILine);
  resize({ stageWidth, stageHeight, stageX, stageY }: RendererContext): void;
}
