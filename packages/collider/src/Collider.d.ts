import { IComponent } from '@dot-map-renderer/component/src/IComponent';
import { Point } from '@dot-map-renderer/component';
export declare class Collider {
  private readonly component;
  private readonly hitArea;
  constructor(component: IComponent, hitArea: Point[]);
  hit<T extends IComponent>(point: Point): T | null;
}
