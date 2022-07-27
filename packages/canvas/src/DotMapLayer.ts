import { Layer } from './Layer';
import { CanvasRenderer } from './CanvasRenderer';
import { Dot } from '@dot-map-renderer/component';
import { geoJsonWidth } from '@dot-map-renderer/consts';
import geoJson from '@dot-map-renderer/map';
import { CanAnimation } from './CanAnimation';
import { IAnimator } from './IAnimator';
import { DotMapLayerAnimator } from './DotMapLayerAnimator';
import { Country } from '@dot-map-renderer/component/src/Country';

export class DotMapLayer extends Layer implements CanAnimation {
  private readonly image: HTMLImageElement;
  private readonly countries: Array<Country> = [];
  canvasRenderer: CanvasRenderer;
  animation: IAnimator;
  depth = -9999;

  constructor(canvasRenderer: CanvasRenderer) {
    super();
    this.canvasRenderer = canvasRenderer;
    this.animation = new DotMapLayerAnimator(this, this.canvasRenderer);

    const { stageWidth, stageHeight, bufferCanvas } = this.canvasRenderer;

    this.loadGeoJson();
    this.resizePolygons(stageWidth / geoJsonWidth);

    bufferCanvas.drawing(this.countries);

    const dataURL = bufferCanvas.toDataURL();

    this.image = new Image(0, 0);
    this.image.width = stageWidth;
    this.image.height = stageHeight;
    this.image.src = dataURL;
  }

  private loadGeoJson = () => {
    geoJson.features.forEach((feature) => {
      this.countries.push(new Country(feature));
    });
  };

  private resizePolygons = (ratio: number) => {
    this.countries.forEach((country) => {
      country.resize(0, 0, ratio);
    });
  };

  override draw = () => {
    const { bufferCanvas, canvas } = this.canvasRenderer;

    bufferCanvas.drawImage(this.image);
    const imageData = bufferCanvas.getImageData();
    const dots = this.makeDots(imageData);

    canvas.drawing(dots);
  };

  private makeDots = (imgData: ImageData) => {
    const { pixelAndGapSize, stageHeight, stageWidth, stageY, stageX, dotFactory, gapSize, pixelSize, pixelColor } =
      this.canvasRenderer;

    const { data, width, height } = imgData;
    const columns = Math.floor(width / pixelAndGapSize);
    const rows = Math.floor(height / pixelAndGapSize);
    const dots: Dot[] = [];

    for (let i = 0; i < rows; i++) {
      const y = Math.floor((i + 0.5) * pixelAndGapSize);
      const pixelY = Math.max(Math.min(y, stageHeight), 0);

      for (let j = 0; j < columns; j++) {
        const x = Math.floor((j + 0.5) * pixelAndGapSize);
        const pixelX = Math.max(Math.min(x, stageWidth), 0);
        const pixelIndex = (pixelX + pixelY * stageWidth) * 4;

        if (data[pixelIndex] > 0 || data[pixelIndex + 1] > 0 || data[pixelIndex + 2] > 0) {
          dots.push(dotFactory.create(stageX + x, stageY + y, pixelSize, gapSize, pixelColor));
        }
      }
    }

    return dots;
  };

  override update = () => {
    this.draw();
  };
}
