import { Anchor } from './Anchors';
import { PI2 } from '@dot-map-renderer/consts';
import { RendererContext } from '@dot-map-renderer/canvas/src/RendererContext';
import { formatll, llToStagell } from '../coordinateNormalization';

export class BasicAnchor extends Anchor {
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
    super();
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

  override start = (context: CanvasRenderingContext2D, rendererContext: RendererContext) => {
    this.update(context, rendererContext);
  };

  override update = (context: CanvasRenderingContext2D, rendererContext: RendererContext) => {
    this.x += 0.1;
    this.y += 0.1;
    this.resize(rendererContext);
    this.draw(context);
  };
}
