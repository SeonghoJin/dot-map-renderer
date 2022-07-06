import { ILayer } from './ILayer';
import { CanvasRenderer } from './CanvasRenderer';
export declare class DotMapLayer implements ILayer {
  private readonly canvasRenderer;
  private readonly image;
  private readonly polygons;
  depth: number;
  constructor(canvasRenderer: CanvasRenderer);
  private loadGeoJson;
  private resizePolygons;
  draw(): void;
  private makeDots;
}
