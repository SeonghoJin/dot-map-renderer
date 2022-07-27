import { IAnimator } from './IAnimator';
import { IRenderer } from './IRenderer';
export declare class AnimationManager {
  private readonly renderer;
  animationItems: IAnimator[];
  _stop: boolean;
  constructor(renderer: IRenderer);
  add: (animator: IAnimator) => void;
  loop: () => void;
  start: () => void;
  stop: () => void;
}
