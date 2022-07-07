import { IAnimator } from './IAnimator';

export class AnimationManager {
  animationItems: IAnimator[] = [];

  add = (animator: IAnimator) => {
    this.animationItems.push(animator);
  };

  start = () => {
    this.animationItems.forEach((item) => item.start());
  };
}
