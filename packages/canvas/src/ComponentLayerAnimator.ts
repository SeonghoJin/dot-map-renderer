import { IAnimator } from './IAnimator';
import { Layer } from './Layer';
import { IRenderer } from './IRenderer';

export class ComponentLayerAnimator implements IAnimator {
  layer: Layer;
  _stop = false;

  constructor(layer: Layer, renderer: IRenderer) {
    this.layer = layer;
    renderer.animation?.add(this);
  }

  loop = () => {
    if (this._stop) {
      return;
    }

    this.layer.update();

    requestAnimationFrame(this.loop);
  };

  start = () => {
    this._stop = false;
    this.loop();
  };

  stop(): void {
    this._stop = true;
  }
}
