import { Drawable } from './Drawable';
import { IComponent } from './IComponent';
export declare class Canvas {
    element: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    get width(): number;
    set width(w: number);
    get height(): number;
    set height(h: number);
    get offsetWidth(): number;
    get offsetHeight(): number;
    constructor();
    reSize: (width: number, height: number) => void;
    matchOffsetSize: () => void;
    setStyleSize: (width: string, height: string) => void;
    getImageData: () => ImageData;
    drawing: (calle: Drawable | IComponent | ((context: CanvasRenderingContext2D) => void) | Drawable[] | IComponent[]) => void;
    toDataURL: () => string;
    clear: () => void;
    drawImage: (image: HTMLImageElement) => void;
}
