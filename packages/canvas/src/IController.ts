import { DotType, Point } from '@dot-map-renderer/component';
import { ILine } from '@dot-map-renderer/component/src/line/ILine';
import { IComponent } from '@dot-map-renderer/component/src/IComponent';

export interface IController {
  addAnchor: (points: Point) => void;
  addLine: (line: ILine) => void;
  addComponent: (component: IComponent[]) => void;
  move: (moveY: number, moveX: number) => void;
  addZoom: (zoom: number) => void;
  setBackground: (color: string) => void;
  setGapSize: (gapSize: number) => void;
  setPixelSize: (pixelSize: number) => void;
  setPixelColor: (pixelColor: string) => void;
  setDotType: (dotType: DotType) => void;
}
