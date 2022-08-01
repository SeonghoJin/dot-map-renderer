import { Anchor } from './Anchor';
import { PI2 } from '@dot-map-renderer/consts';

export class BasicAnchor extends Anchor {
  path: Path2D | null = null;

  constructor(x: number, y: number) {
    super(x, y);
  }

  draw(context: CanvasRenderingContext2D): void {
    context.fillStyle = 'red';
    context.beginPath();
    context.arc(this.drawX!, this.drawY!, 5, 0, PI2, false);
    context.fill();
    context.closePath();
  }
}
