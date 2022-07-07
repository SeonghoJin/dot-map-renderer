import { IAnimator } from './IAnimator';
export declare class AnimationManager {
  animationItems: IAnimator[];
  add: (animator: IAnimator) => void;
  start: () => void;
}
