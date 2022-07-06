"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Canvas = void 0;
const Drawable_1 = require("./Drawable");
class Canvas {
    constructor() {
        this.reSize = (width, height) => {
            this.element.width = width;
            this.element.height = height;
        };
        this.matchOffsetSize = () => {
            this.reSize(this.element.offsetWidth, this.element.offsetHeight);
        };
        this.setStyleSize = (width, height) => {
            this.element.style.height = height;
            this.element.style.width = width;
        };
        this.getImageData = () => this.context.getImageData(0, 0, this.width, this.height);
        this.drawing = (calle) => {
            if (typeof calle === 'function') {
                calle(this.context);
            }
            else if ((0, Drawable_1.isDrawable)(calle)) {
                calle.draw(this.context);
            }
            else {
                calle.forEach((call) => {
                    call.draw(this.context);
                });
            }
        };
        this.toDataURL = () => this.element.toDataURL();
        this.clear = () => {
            this.context.clearRect(0, 0, this.width, this.height);
        };
        this.drawImage = (image) => {
            this.context.drawImage(image, 0, 0, this.width, this.height);
        };
        this.element = document.createElement('canvas');
        this.context = this.element.getContext('2d');
    }
    get width() {
        return this.element.width;
    }
    set width(w) {
        this.element.width = w;
    }
    get height() {
        return this.element.height;
    }
    set height(h) {
        this.element.height = h;
    }
    get offsetWidth() {
        return this.element.offsetWidth;
    }
    get offsetHeight() {
        return this.element.offsetHeight;
    }
}
exports.Canvas = Canvas;
//# sourceMappingURL=Canvas.js.map