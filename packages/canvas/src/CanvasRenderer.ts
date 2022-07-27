import { Canvas } from '@dot-map-renderer/component';
import { componentLayerKey, dotMapLayerKey, stageRatio } from '@dot-map-renderer/consts';
import { IRendererOption } from './IRendererOption';
import { IRenderer } from './IRenderer';
import { RendererContext } from './RendererContext';
import { Layer } from './Layer';
import { ComponentLayer } from './ComponentLayer';
import { DotMapLayer } from './DotMapLayer';
import { AnimationManager } from './AnimationManager';

export class CanvasRenderer implements IRenderer {
  private readonly layers: Map<string, Layer> = new Map();
  readonly bufferCanvas: Canvas;
  private attachingElement: HTMLElement;
  canvas: Canvas;
  parent: HTMLElement;
  option: IRendererOption;
  stageHeight = 0;
  stageWidth = 0;
  stageX = 0;
  stageY = 0;
  zoom = 1;
  animation?: AnimationManager;

  get pixelAndGapSize(): number {
    return this.pixelSize + this.gapSize;
  }

  get pixelSize(): number {
    return Math.ceil(this.zoom) * this.option.pixelSize;
  }

  get gapSize(): number {
    return Math.ceil(this.zoom) * this.option.gapSize;
  }

  get canvasOffsetWidth() {
    return this.canvas.offsetWidth;
  }

  get canvasOffsetHeight() {
    return this.canvas.offsetHeight;
  }

  constructor(attachingElement: HTMLElement, rendererOption: IRendererOption) {
    this.attachingElement = attachingElement;
    this.canvas = new Canvas();
    this.bufferCanvas = new Canvas();
    this.parent = document.createElement('div');
    this.option = rendererOption;
    this.animation = new AnimationManager(this);

    this.initHTML();
    this.resize();
    this.initLayer();
    this.animation.start();
  }

  private initHTML = () => {
    this.canvas.setStyleSize('100%', '100%');
    this.parent.style.overflow = 'auto';
    this.parent.style.width = '100%';
    this.parent.style.height = '100%';
    this.attachingElement.appendChild(this.parent);
    this.parent.appendChild(this.canvas.element);
    this.parent.style.backgroundColor = this.option.backgroundColor;
  };

  private initLayer = () => {
    this.layers.set(dotMapLayerKey, new DotMapLayer(this));
    this.layers.set(componentLayerKey, new ComponentLayer(this));
  };

  private resizeStage = (width: number, height: number) => {
    const clientRatio = width / height;

    this.stageWidth = width;
    this.stageHeight = height;
    if (clientRatio > stageRatio) {
      this.stageWidth = Math.round(height * stageRatio);
    } else {
      this.stageHeight = Math.round(width / stageRatio);
    }
    this.stageX = (this.canvas.element.width - this.stageWidth) / 2;
    this.stageY = (this.canvas.element.height - this.stageHeight) / 2;
  };

  resize = () => {
    this.bufferCanvas.clear();
    this.canvas.matchOffsetSize();
    this.resizeStage(this.canvasOffsetWidth, this.canvasOffsetHeight);
    this.bufferCanvas.resize(this.stageWidth, this.stageHeight);

    this.layers.forEach((layer) => layer.resize?.());
  };

  public getContext = (): RendererContext => this;

  public getLayer = <T extends Layer = Layer>(layerKey: string): T => {
    const layer = this.layers.get(layerKey) as T;

    if (layer === undefined) {
      throw new Error(`not found layer(${layerKey})`);
    }

    return layer;
  };

  public refresh = () => {
    this.canvas.clear();
    this.bufferCanvas.clear();
  };

  remove() {
    this.canvas.element.remove();
    this.bufferCanvas.element.remove();
    this.parent.remove();
    this.animation!.stop();

    delete this.animation;
  }
}
