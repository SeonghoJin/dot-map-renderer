import { Point } from '@dot-map-renderer/component';
import { LineData } from '@dot-map-renderer/component/src/line/LineData';

export interface IController {
  addAnchor: (points: Point) => void;
  addLine: (line: LineData) => void;
  move: (moveY: number, moveX: number) => void;
  addZoom: (zoom: number) => void;
}
