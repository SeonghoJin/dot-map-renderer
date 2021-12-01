export declare class Dot {
    x: number;
    y: number;
    pixelSize: number;
    red: number;
    green: number;
    blue: number;
    radius: number;
    radiusHalf: number;
    constructor(x: number, y: number, radius: number, pixelSize: number, red: number, green: number, blue: number);
    pixelSizeHalf: () => number;
    draw: (ctx: CanvasRenderingContext2D) => void;
    resize: (x: number, y: number, pixelSize: number, radius: number, red: number, green: number, blue: number) => void;
}
