import { IComponent } from '../IComponent';
import { Point } from '@dot-map-renderer/component';
export interface Line extends IComponent {
  startPoint: Point;
  endPoint: Point;
  startDrawPoint: Point | undefined;
  endDrawPoint: Point | undefined;
}
