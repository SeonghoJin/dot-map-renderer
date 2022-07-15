import { Point } from 'packages/component/src/index';
import { IComponent } from './IComponent';
export interface IHitable {
  interaction: boolean;
  hit(point: Point): IComponent | null;
}
