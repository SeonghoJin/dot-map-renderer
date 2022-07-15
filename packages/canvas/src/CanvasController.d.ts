import { Point } from '@dot-map-renderer/component';
import { IController } from './IController';
import { LineData } from '@dot-map-renderer/component/src/line/LineData';
import { IComponent } from '@dot-map-renderer/component/src/IComponent';
import { IRenderer } from './IRenderer';
export declare class CanvasController implements IController {
  private readonly renderer;
  constructor(renderer: IRenderer);
  addZoom: (zoom: number) => void;
  addAnchor: (points: Point) => void;
  addLine: (line: LineData) => void;
  addComponent: (item: IComponent[]) => void;
  move: (moveY: number, moveX: number) => void;
}
