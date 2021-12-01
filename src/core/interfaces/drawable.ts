export const isDrawable = (object: any): object is Drawable  => {
    if(object.x === undefined)return false;
    if(object.y === undefined)return false;
    if(object.z === undefined)return false;
    return true;
}

export interface Drawable {
    x : number,
    y : number,
    draw(context: CanvasRenderingContext2D, ...args: any[]): void;
}