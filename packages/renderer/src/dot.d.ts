import { Drawable } from "./drawable";
export interface Dot extends Drawable {
    x: number;
    y: number;
    size: number;
    gapSize: number;
    color: string;
}
