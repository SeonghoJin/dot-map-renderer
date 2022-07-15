import { Anchor } from './Anchors';
import { RendererContext } from '@dot-map-renderer/canvas/src/RendererContext';
export declare class BasicAnchor extends Anchor {
  x: number;
  y: number;
  drawX: number | undefined;
  drawY: number | undefined;
  interaction: boolean;
  path: Path2D | null;
  constructor(
    x: number,
    y: number,
    options?: {
      interaction: boolean;
    },
  );
  draw(context: CanvasRenderingContext2D): void;
  resize({ stageHeight, stageWidth, stageY, stageX }: RendererContext): void;
  start: (context: CanvasRenderingContext2D, rendererContext: RendererContext) => void;
  update: (context: CanvasRenderingContext2D, rendererContext: RendererContext) => void;
}
