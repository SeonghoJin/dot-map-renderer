import { Layer } from './Layer';
import { CanvasRenderer } from './CanvasRenderer';
import { IComponent } from '@dot-map-renderer/component/src/IComponent';

export class ComponentLayer extends Layer {
  private readonly components: Array<IComponent> = [];
  depth = 0;

  constructor(private readonly canvasRenderer: CanvasRenderer) {
    super();
  }

  override draw = () => {
    this.canvasRenderer.canvas.drawing(this.components);
  };

  override resize = () => {
    this.components.forEach((component) => {
      component.resize(this.canvasRenderer);
    });
  };

  addItem(item: IComponent[]): void {
    this.components.push(...item);
  }
}
