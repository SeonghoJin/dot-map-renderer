import { IComponent } from '../IComponent';
import { RendererContext } from '@dot-map-renderer/canvas/src/RendererContext';
export declare abstract class Anchor extends IComponent {
  drawX: null | number;
  drawY: null | number;
  x: number;
  y: number;
  constructor(x: number, y: number);
  resize(renderer: RendererContext): void;
}
