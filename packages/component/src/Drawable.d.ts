export declare const isDrawable: (object: any) => object is Drawable;
export interface Drawable {
    draw(context: CanvasRenderingContext2D, ...args: any[]): void;
}
