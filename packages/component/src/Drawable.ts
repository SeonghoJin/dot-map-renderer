export const isDrawable = (object: any): object is Drawable =>
{
    if (object.x === undefined) return false;
    if (object.y === undefined) return false;

    return true;
};

export interface Drawable {
    draw(context: CanvasRenderingContext2D, ...args: any[]): void;
}
