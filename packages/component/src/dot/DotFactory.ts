import { CircleDot } from './CircleDot';
import { Dot } from './Dot';
import { DotType } from './DotType';
import { RectDot } from './RectDot';

type CreateFunctionType = {
  new (...args: any[]): Dot;
};

export class DotFactory {
  type: DotType;
  createFunction: CreateFunctionType;

  constructor(type: DotType) {
    this.type = type;
    if (this.type === 'rectangular') {
      this.createFunction = RectDot;
    } else {
      this.createFunction = CircleDot;
    }
  }

  create(x: number, y: number, size: number, gapSize: number, color: string): Dot {
    return new this.createFunction(x, y, size, gapSize, color);
  }
}
