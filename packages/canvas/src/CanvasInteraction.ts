import { CanvasRenderer } from './CanvasRenderer';
import { IInteraction } from './IInteraction';
import { IController } from './IController';

export class CanvasInteraction implements IInteraction
{
    public mouseRatioX = 0;
    public mouseRatioY = 0;
    public offsetX = 0;
    public offsetY = 0;
    public startClientX = 0;
    public startClientY = 0;

    constructor(
        private readonly renderer: CanvasRenderer,
        private readonly controller: IController
    )
    {
        this.renderer.canvas.element.addEventListener('mousemove', this.onMouseMove);
        this.renderer.parent.addEventListener('wheel', this.onWheel, { passive: false });
        window.addEventListener('mousedown', this.onMouseDown);
        window.addEventListener('mouseup', this.onMouseUp);
    }

    onMouseMove = (event: MouseEvent) =>
    {
        const clientRect = this.renderer.canvas.element.getBoundingClientRect();

        this.mouseRatioX = event.offsetX / clientRect.width;
        this.mouseRatioY = event.offsetY / clientRect.height;
    };

    onWheel = (event: WheelEvent) =>
    {
        event.preventDefault();
        const { deltaY } = event;

        if (deltaY < 0)
        {
            this.controller.addZoom(+0.1);
        }
        if (deltaY > 0)
        {
            this.controller.addZoom(-0.1);
        }
        const clientRect = this.renderer.canvas.element.getBoundingClientRect();
        const { width, height } = clientRect;

        this.renderer.parent.scrollTo(
            Math.floor(width * this.mouseRatioX) - (event.clientX - this.renderer.parent.getBoundingClientRect().x),
            Math.floor(height * this.mouseRatioY) - (event.clientY - this.renderer.parent.getBoundingClientRect().y),
        );
    };

    onMouseDown = (event: MouseEvent) =>
    {
        const { clientX, clientY } = event;

        this.startClientX = clientX;
        this.startClientY = clientY;
        this.renderer.canvas.element.style.cursor = 'grab';
        this.renderer.canvas.element.addEventListener('mousemove', this.onMouseMoveWithMouseDown);
    };

    onMouseUp = () =>
    {
        this.renderer.canvas.element.removeEventListener('mousemove', this.onMouseMoveWithMouseDown);
        this.renderer.canvas.element.style.cursor = '';
    };

    onMouseMoveWithMouseDown = (event: MouseEvent) =>
    {
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
}
