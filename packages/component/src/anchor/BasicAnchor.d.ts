import { Anchor } from './Anchors';
import { RendererContext } from '@dot-map-renderer/canvas/src/RendererContext';
import { Point } from '@dot-map-renderer/component';
import { Collider } from '@dot-map-renderer/collider';
export declare class BasicAnchor implements Anchor {
  x: number;
  y: number;
  drawX: number | undefined;
  drawY: number | undefined;
  interaction: boolean;
  collider: Collider;
  constructor(
    x: number,
    y: number,
    options?: {
      interaction: boolean;
    },
  );
  draw(context: CanvasRenderingContext2D): void;
  resize({ stageHeight, stageWidth, stageY, stageX }: RendererContext): void;
  hit(point: Point): Anchor | null;
}
