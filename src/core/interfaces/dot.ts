import {Drawable} from "./drawable";

export interface Dot extends Drawable {
    x: number;
    y: number;
    size: number;
    gapSize: number;
    red: number;
    green: number;
    blue: number;
}