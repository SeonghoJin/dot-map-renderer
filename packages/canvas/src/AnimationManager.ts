import { IAnimator } from './IAnimator';
import { IRenderer } from './IRenderer';

export class AnimationManager {
  animationItems: IAnimator[] = [];
  _stop = false;

  constructor(private readonly renderer: IRenderer) {
    this.start();
  }

  add = (animator: IAnimator) => {
    this.animationItems.push(animator);
  };

  loop = () => {
    if (this._stop) {
      return;
    }
    requestAnimationFrame(() => {
      this.renderer.refresh();
      this.animationItems.forEach((item) => item.loop());
      this.loop();
    });
  };

  start = () => {
    this._stop = false;
    requestAnimationFrame(this.loop);
  };

  stop = () => {
    this._stop = true;
  };
}
