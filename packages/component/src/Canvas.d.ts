import { Drawable } from "./Drawable";
export declare class Canvas {
    element: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    get width(): number;
    get height(): number;
    set width(w: number);
    set height(h: number);
    constructor();
    reSize: (width: number, height: number) => void;
    matchOffsetSize: () => {
        width: number;
        height: number;
    };
    setStyleSize: (width: string, height: string) => void;
    getImageData: () => ImageData;
    drawing: (calle: Drawable | ((context: CanvasRenderingContext2D) => void) | Drawable[]) => void;
    toDataURL: () => string;
    clear: () => void;
    drawImage: (image: HTMLImageElement) => void;
}
