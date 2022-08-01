import { Point } from './Point';
import { IComponent } from './IComponent';

export interface IHitable {
  interaction: boolean;
  hit(point: Point): IComponent | null;
}
