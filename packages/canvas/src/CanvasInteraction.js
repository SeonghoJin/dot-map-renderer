"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasInteraction = void 0;
class CanvasInteraction {
    constructor(renderer, controller) {
        this.renderer = renderer;
        this.controller = controller;
        this.mouseRatioX = 0;
        this.mouseRatioY = 0;
        this.offsetX = 0;
        this.offsetY = 0;
        this.startClientX = 0;
        this.startClientY = 0;
        this.onMouseMove = (event) => {
            const clientRect = this.renderer.canvas.element.getBoundingClientRect();
            this.mouseRatioX = event.offsetX / clientRect.width;
            this.mouseRatioY = event.offsetY / clientRect.height;
        };
        this.onWheel = (event) => {
            event.preventDefault();
            const { deltaY } = event;
            if (deltaY < 0) {
                this.controller.addZoom(+0.1);
            }
            if (deltaY > 0) {
                this.controller.addZoom(-0.1);
            }
            const clientRect = this.renderer.canvas.element.getBoundingClientRect();
            const { width, height } = clientRect;
            this.renderer.parent.scrollTo(Math.floor(width * this.mouseRatioX) - (event.clientX - this.renderer.parent.getBoundingClientRect().x), Math.floor(height * this.mouseRatioY) - (event.clientY - this.renderer.parent.getBoundingClientRect().y));
        };
        this.onMouseDown = (event) => {
            const { clientX, clientY } = event;
            this.startClientX = clientX;
            this.startClientY = clientY;
            this.renderer.canvas.element.style.cursor = 'grab';
            this.renderer.canvas.element.addEventListener('mousemove', this.onMouseMoveWithMouseDown);
        };
        this.onMouseUp = () => {
            this.renderer.canvas.element.removeEventListener('mousemove', this.onMouseMoveWithMouseDown);
            this.renderer.canvas.element.style.cursor = '';
        };
        this.onMouseMoveWithMouseDown = (event) => {
            const { clientX, clientY } = event;
            this.offsetX = this.startClientX - clientX;
            this.offsetY = this.startClientY - clientY;
            this.renderer.parent.scrollBy({
                top: this.offsetY,
                left: this.offsetX,
            });
            this.startClientX = clientX;
            this.startClientY = clientY;
        };
        this.renderer.canvas.element.addEventListener('mousemove', this.onMouseMove);
        this.renderer.parent.addEventListener('wheel', this.onWheel, { passive: false });
        window.addEventListener('mousedown', this.onMouseDown);
        window.addEventListener('mouseup', this.onMouseUp);
    }
}
exports.CanvasInteraction = CanvasInteraction;
//# sourceMappingURL=CanvasInteraction.js.map