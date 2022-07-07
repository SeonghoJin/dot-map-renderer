import { Anchor } from './Anchors';
import { PI2 } from '@dot-map-renderer/consts';
import { RendererContext } from '@dot-map-renderer/canvas/src/RendererContext';
import { formatll, llToStagell } from '@dot-map-renderer/component';

export class BasicAnchor implements Anchor {
  x;
  y;
  drawX: number | undefined;
  drawY: number | undefined;
  interaction;
  path: Path2D | null = null;

  constructor(
    x: number,
    y: number,
    options?: {
      interaction: boolean;
    },
  ) {
    this.x = x;
    this.y = y;
    this.interaction = options?.interaction ?? false;
  }

  draw(context: CanvasRenderingContext2D): void {
    context.fillStyle = 'red';
    context.beginPath();
    context.arc(this.drawX!, this.drawY!, 5, 0, PI2, false);
    context.fill();
    context.closePath();
  }

  resize({ stageHeight, stageWidth, stageY, stageX }: RendererContext): void {
    const [x, y] = llToStagell(formatll([this.y, this.x]), stageWidth, stageHeight);

    this.drawX = x + stageX;
    this.drawY = y + stageY;
  }

  start = (context: CanvasRenderingContext2D) => {
    this.update(context);
  };

  update = (context: CanvasRenderingContext2D) => {
    this.draw(context);
  };
}
