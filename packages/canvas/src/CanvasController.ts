import { formatll, Point, BasicAnchor, DotType } from '@dot-map-renderer/component';
import { IController } from './IController';
import { componentLayerKey } from '@dot-map-renderer/consts';
import { ComponentLayer } from './ComponentLayer';
import { BasicLine } from '@dot-map-renderer/component/src/line/BasicLine';
import { ILine } from '@dot-map-renderer/component/src/line/ILine';
import { IComponent } from '@dot-map-renderer/component/src/IComponent';
import { IRenderer } from './IRenderer';

export class CanvasController implements IController {
  constructor(private readonly renderer: IRenderer) {}

  setBackground = (color: string) => {
    this.renderer.backgroundColor = color;
  };

  setGapSize = (gapSize: number) => {
    this.renderer.gapSize = gapSize;
  };

  setPixelSize = (pixelSize: number) => {
    this.renderer.pixelSize = pixelSize;
  };

  setPixelColor = (pixelColor: string) => {
    this.renderer.pixelColor = pixelColor;
  };

  setDotType = (dotType: DotType) => {
    this.renderer.setDotFactory(dotType);
  };

  addZoom = (zoom: number) => {
    this.renderer.zoom += zoom;
    this.renderer.zoom = Math.min(Math.max(this.renderer.zoom, 1), 3);
    this.renderer.canvas.setStyleSize(`${this.renderer.zoom * 100}%`, `${this.renderer.zoom * 100}%`);
    this.renderer.resize();
  };

  addAnchor = (points: Point) => {
    const anchorComponent = new BasicAnchor(points[0], points[1]);

    this.addComponent([anchorComponent]);
  };

  addLine = (line: ILine) => {
    const lineComponent = new BasicLine(line);

    this.addComponent([lineComponent]);
  };

  addComponent = (item: IComponent[]) => {
    const componentLayer = this.renderer.getLayer<ComponentLayer>(componentLayerKey);

    componentLayer.addItem(item);
    componentLayer.resize();
  };

  move = (moveY: number, moveX: number) => {
    const [x, y] = formatll([moveX, moveY]);
    const xRatio = x / 360;
    const yRatio = y / 180;
    const testBoundRect = this.renderer.parent.getBoundingClientRect();
    const targetX = Math.floor(this.renderer.stageWidth * xRatio);
    const targetY = Math.floor(this.renderer.stageHeight * yRatio);

    this.renderer.canvas.context.beginPath();
    this.renderer.parent.scrollTo({
      left: targetX + this.renderer.stageX - testBoundRect.width / 2,
      top: targetY + this.renderer.stageY - testBoundRect.height / 2,
      behavior: 'smooth',
    });
  };
}
