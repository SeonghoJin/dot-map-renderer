import { Point } from '@dot-map-renderer/component';
import { CanvasRenderer } from './CanvasRenderer';
import { IController } from './IController';
import { LineData } from '@dot-map-renderer/component/src/line/LineData';
import { IComponent } from '@dot-map-renderer/component/src/IComponent';
export declare class CanvasController implements IController {
  private readonly renderer;
  constructor(renderer: CanvasRenderer);
  addZoom: (zoom: number) => void;
  addAnchors: (points: Point[] | Point) => void;
  addLine: (line: LineData) => void;
  addComponent: (item: IComponent[]) => void;
  move: (moveY: number, moveX: number) => void;
}
