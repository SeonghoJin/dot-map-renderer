import { Drawable } from './Drawable';
import { Polygon } from './Polygon';
export declare class Country implements Drawable {
  polygons: Polygon[];
  name: string;
  mapColor: string;
  constructor(feature: any);
  repaint: () => void;
  resize(x: number, y: number, polygonRatio: number): void;
  draw(ctx: CanvasRenderingContext2D): void;
}
