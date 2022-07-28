import { IComponent } from '../IComponent';
import { formatll, llToStagell, Point } from '@dot-map-renderer/component';
import { RendererContext } from '@dot-map-renderer/canvas/src/RendererContext';
import { ILine } from './ILine';

export abstract class Line extends IComponent {
  startPoint: Point;
  endPoint: Point;
  startDrawPoint: Point | null = null;
  endDrawPoint: Point | null = null;

  protected constructor(line: ILine) {
    super();
    this.startPoint = line[0];
    this.endPoint = line[1];
  }

  override resize({ stageWidth, stageHeight, stageX, stageY }: RendererContext): void {
    const [startX, startY] = llToStagell(formatll([this.startPoint[1], this.startPoint[0]]), stageWidth, stageHeight);
    const [endX, endY] = llToStagell(formatll([this.endPoint[1], this.endPoint[0]]), stageWidth, stageHeight);
    this.startDrawPoint = [startX + stageX, startY + stageY];
    this.endDrawPoint = [endX + stageX, endY + stageY];
  }
}
