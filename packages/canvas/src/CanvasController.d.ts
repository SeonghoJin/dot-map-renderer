import { Point, DotType } from '@dot-map-renderer/component';
import { IController } from './IController';
import { ILine } from 'packages/component/src/line/ILine';
import { IComponent } from '@dot-map-renderer/component/src/IComponent';
import { IRenderer } from './IRenderer';
export declare class CanvasController implements IController {
  private readonly renderer;
  constructor(renderer: IRenderer);
  setBackground: (color: string) => void;
  setGapSize: (gapSize: number) => void;
  setPixelSize: (pixelSize: number) => void;
  setPixelColor: (pixelColor: string) => void;
  setDotType: (dotType: DotType) => void;
  addZoom: (zoom: number) => void;
  addAnchor: (points: Point) => void;
  addLine: (line: ILine) => void;
  addComponent: (item: IComponent[]) => void;
  move: (moveY: number, moveX: number) => void;
}
