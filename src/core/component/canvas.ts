import {Drawable, isDrawable} from "../interfaces/drawable";

export class Canvas {
    element: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    constructor() {
        this.element = document.createElement('canvas');
        this.context = this.element.getContext('2d') as CanvasRenderingContext2D;
    }

    reSize = (width: number, height: number) => {
        this.element.width = width;
        this.element.height = height;
    }

    matchOffsetSize = () => {
        this.reSize(this.element.offsetWidth, this.element.offsetHeight);
    }

    setStyleSize = (width: string, height: string) => {
        this.element.style.height = width;
        this.element.style.width = width;
    }

    getImageData = (x: number, y: number, width: number, height:number) => {
        return this.context.getImageData(x,y,width,height);
    }

    drawing = (calle: ((context: CanvasRenderingContext2D) => void) | Drawable | Drawable[]) => {
        if(typeof calle === 'function'){
            calle(this.context);
        } else if(isDrawable(calle)){
            calle.draw(this.context);
        } else {
            calle.forEach((call) => {
                call.draw(this.context);
            })
        }
    }

}