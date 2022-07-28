import { Drawable } from './Drawable';
import { IResizable } from './IResizable';
import { RendererContext } from '@dot-map-renderer/canvas/src/RendererContext';

export abstract class IComponent implements Drawable, IResizable {
  abstract path: Path2D | null;

  abstract draw(context: CanvasRenderingContext2D, ...args: any[]): void;

  abstract resize(renderer: RendererContext): void;

  update = (context: CanvasRenderingContext2D, rendererContext: RendererContext) => {
    this.resize(rendererContext);
    this.draw(context);
  };
}
