import { Anchor } from './Anchor';
export declare class BasicAnchor extends Anchor {
  path: Path2D | null;
  constructor(x: number, y: number);
  draw(context: CanvasRenderingContext2D): void;
}
