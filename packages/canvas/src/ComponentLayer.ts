import { Layer } from './Layer';
import { CanvasRenderer } from './CanvasRenderer';
import { IComponent } from '@dot-map-renderer/component/src/IComponent';
import { CanAnimation } from './CanAnimation';
import { IAnimator } from './IAnimator';
import { ComponentLayerAnimator } from './ComponentLayerAnimator';

export class ComponentLayer extends Layer implements CanAnimation {
  private readonly components: Array<IComponent> = [];
  animation: IAnimator;
  depth = 0;

  constructor(private readonly canvasRenderer: CanvasRenderer) {
    super();
    this.animation = new ComponentLayerAnimator(this, this.canvasRenderer);
  }

  override draw = () => {
    this.canvasRenderer.canvas.drawing(this.components);
  };

  override resize = () => {
    this.components.forEach((component) => {
      component.resize(this.canvasRenderer);
    });
  };

  override update = () => {
    this.components.forEach((component) => component.update(this.canvasRenderer.canvas.context));
    requestAnimationFrame(this.update);
  };

  addItem(item: IComponent[]): void {
    this.components.push(...item);
  }
}
