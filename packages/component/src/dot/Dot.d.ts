import { Drawable } from '@dot-map-renderer/component';
export interface Dot extends Drawable {
    x: number;
    y: number;
    size: number;
    gapSize: number;
    color: string;
}
