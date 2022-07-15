import { IInteraction } from './IInteraction';
import { IController } from './IController';
import { IRenderer } from './IRenderer';
import { throttle } from '@dot-map-renderer/util';

export class CanvasInteraction implements IInteraction {
  public mouseRatioX = 0;
  public mouseRatioY = 0;
  public offsetX = 0;
  public offsetY = 0;
  public startClientX = 0;
  public startClientY = 0;
  public currentMouseX: number | null = null;
  public currentMouseY: number | null = null;

  constructor(private readonly renderer: IRenderer, private readonly controller: IController) {
    this.initInteraction();
  }

  initInteraction() {
    this.renderer.canvas.element.addEventListener('mousemove', this.onMouseMove);
    this.renderer.parent.addEventListener('wheel', this.onWheel, { passive: false });
    window.addEventListener('resize', throttle(this.renderer.resize, 100));
    window.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('mouseup', this.onMouseUp);
  }

  public remove() {
    this.renderer.canvas.element.removeEventListener('mousemove', this.onMouseDown);
    this.renderer.parent.removeEventListener('wheel', this.onWheel);
    window.removeEventListener('mousedown', this.onMouseDown);
    window.removeEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove = (event: MouseEvent) => {
    const { offsetX, offsetY } = event;
    const clientRect = this.renderer.canvas.element.getBoundingClientRect();

    this.currentMouseX = offsetX;
    this.currentMouseY = offsetY;

    this.mouseRatioX = offsetX / clientRect.width;
    this.mouseRatioY = offsetY / clientRect.height;
  };

  onWheel = (event: WheelEvent) => {
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

    this.renderer.parent.scrollTo(
      Math.floor(width * this.mouseRatioX) - (event.clientX - this.renderer.parent.getBoundingClientRect().x),
      Math.floor(height * this.mouseRatioY) - (event.clientY - this.renderer.parent.getBoundingClientRect().y),
    );
  };

  onMouseDown = (event: MouseEvent) => {
    const { clientX, clientY } = event;

    this.startClientX = clientX;
    this.startClientY = clientY;
    this.renderer.canvas.element.style.cursor = 'grab';
    this.renderer.canvas.element.addEventListener('mousemove', this.onMouseMoveWithMouseDown);
  };

  onMouseUp = () => {
    this.renderer.canvas.element.removeEventListener('mousemove', this.onMouseMoveWithMouseDown);
    this.renderer.canvas.element.style.cursor = '';
  };

  onMouseMoveWithMouseDown = (event: MouseEvent) => {
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
