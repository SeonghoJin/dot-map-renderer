import { Collider } from '@dot-map-renderer/collider';
import { Point } from 'packages/component/src/index';
import { IComponent } from './IComponent';

export interface IHitable {
    interaction: boolean;
    collider: Collider;
    hit(point: Point): IComponent | null;
}
