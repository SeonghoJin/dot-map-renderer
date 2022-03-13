import { Dot } from './Dot';

export class RectDot implements Dot
{
    gapSize: number;
    size: number;
    x: number;
    y: number;
    color: string;

    constructor(x: number, y: number, size: number, gapSize: number, color: string)
    {
        this.x = x;
        this.y = y;
        this.size = size;
        this.gapSize = gapSize;
        this.color = color;
    }

    draw(context: CanvasRenderingContext2D): void
    {
        context.beginPath();
        context.fillStyle = this.color;
        context.fillRect(this.x + this.gapSize, this.y + this.gapSize, this.size, this.size);
        context.closePath();
    }
}
