import { IComponent } from '../IComponent';
import { formatll, llToStagell } from '../coordinateNormalization';
import { RendererContext } from '@dot-map-renderer/canvas/src/RendererContext';

export abstract class Anchor extends IComponent {
  drawX: null | number = null;
  drawY: null | number = null;
  x: number;
  y: number;

  constructor(x: number, y: number) {
    super();
    this.x = x;
    this.y = y;
  }

  resize(renderer: RendererContext) {
    const { stageHeight, stageX, stageY, stageWidth } = renderer;
    const [x, y] = llToStagell(formatll([this.y, this.x]), stageWidth, stageHeight);

    this.drawX = x + stageX;
    this.drawY = y + stageY;
  }
}
