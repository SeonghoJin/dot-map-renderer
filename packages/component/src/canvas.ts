import {Drawable, isDrawable} from "./drawable";

export class Canvas {
    element: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    get width() : number {
        return this.element.width;
    }

    get height() : number {
        return this.element.height;
    }

    set width(w: number){
        this.element.width = w;
    }

    set height(h: number){
        this.element.height = h;
    }

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
        return {width: this.element.offsetWidth, height: this.element.offsetHeight}
    }

    setStyleSize = (width: string, height: string) => {
        this.element.style.height = height;
        this.element.style.width = width;
    }

    getImageData = () => {
        return this.context.getImageData(0, 0, this.width, this.height);
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

    toDataURL = () => {
        return this.element.toDataURL();
    }

    clear = () => {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    drawImage = (image: HTMLImageElement) => {
        this.context.drawImage(image, 0, 0, this.width, this.height);
    }
}