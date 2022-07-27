import { Layer } from './Layer';
import { CanvasRenderer } from './CanvasRenderer';
import { CanAnimation } from './CanAnimation';
import { IAnimator } from './IAnimator';
export declare class DotMapLayer extends Layer implements CanAnimation {
  private readonly image;
  private readonly countries;
  canvasRenderer: CanvasRenderer;
  animation: IAnimator;
  depth: number;
  constructor(canvasRenderer: CanvasRenderer);
  private loadGeoJson;
  private resizePolygons;
  draw: () => void;
  private makeDots;
  update: () => void;
}
