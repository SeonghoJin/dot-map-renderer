import { Point } from '@dot-map-renderer/component';
import { LineData } from '@dot-map-renderer/component/src/line/LineData';
import { IComponent } from '@dot-map-renderer/component/src/IComponent';

export interface IController {
  addAnchor: (points: Point) => void;
  addLine: (line: LineData) => void;
  addComponent: (component: IComponent[]) => void;
  move: (moveY: number, moveX: number) => void;
  addZoom: (zoom: number) => void;
}
