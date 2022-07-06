import { ILayer } from './ILayer';
import { CanvasRenderer } from './CanvasRenderer';
import { IComponent } from '@dot-map-renderer/component/src/IComponent';
export declare class ComponentLayer implements ILayer {
  private readonly canvasRenderer;
  private readonly components;
  depth: number;
  constructor(canvasRenderer: CanvasRenderer);
  draw(): void;
  resize(): void;
  addItem(item: IComponent[]): void;
}
