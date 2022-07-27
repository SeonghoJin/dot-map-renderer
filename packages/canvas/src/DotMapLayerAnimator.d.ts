import { IAnimator } from './IAnimator';
import { Layer } from './Layer';
import { IRenderer } from './IRenderer';
export declare class DotMapLayerAnimator implements IAnimator {
  layer: Layer;
  constructor(layer: Layer, renderer: IRenderer);
  loop: () => void;
}
