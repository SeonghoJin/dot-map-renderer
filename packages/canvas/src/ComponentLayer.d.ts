import { Layer } from './Layer';
import { CanvasRenderer } from './CanvasRenderer';
import { IComponent } from '@dot-map-renderer/component/src/IComponent';
import { CanAnimation } from './CanAnimation';
import { IAnimator } from './IAnimator';
export declare class ComponentLayer extends Layer implements CanAnimation {
  private readonly canvasRenderer;
  private readonly components;
  animation: IAnimator;
  depth: number;
  constructor(canvasRenderer: CanvasRenderer);
  draw: () => void;
  resize: () => void;
  update: () => void;
  addItem(item: IComponent[]): void;
}
