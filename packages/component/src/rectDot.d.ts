import { Dot } from "../../renderer/src/dot";
export declare class RectDot implements Dot {
    gapSize: number;
    size: number;
    x: number;
    y: number;
    color: string;
    constructor(x: number, y: number, size: number, gapSize: number, color: string);
    draw(context: CanvasRenderingContext2D, ...args: any[]): void;
}
