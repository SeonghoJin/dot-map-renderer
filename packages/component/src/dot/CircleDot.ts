import { Dot } from "./Dot";
import {PI2} from "@dot-map-renderer/consts";

export class CircleDot implements Dot {
    gapSize: number;
    size: number;
    x: number;
    y: number;
    color: string;


    constructor(x: number, y: number, size: number, gapSize: number, color: string) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.gapSize = gapSize;
        this.color = color;
    }

    draw(context: CanvasRenderingContext2D, ...args: any[]): void {
        const startX = this.x - this.gapSize / 2;
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x + (this.gapSize + this.size) / 2, this.y + (this.gapSize, this.size) / 2, (this.size) / 2, 0, PI2, false);
        context.fill();
        context.closePath();
    }
}
