import { Collider } from '@dot-map-renderer/collider';
import { Point } from '@dot-map-renderer/component';
import { IComponent } from './src/IComponent';

export interface IHitable {
    interaction: boolean;
    collider: Collider;
    hit(point: Point): IComponent | null;
}
