export declare const isDrawable: (object: any) => object is Drawable;
export interface Drawable {
    x: number;
    y: number;
    draw(context: CanvasRenderingContext2D, ...args: any[]): void;
}
