import { IRendererOption } from './IRendererOption';
import { AnimationManager } from './AnimationManager';
import { Layer } from './Layer';
import { Canvas } from '@dot-map-renderer/component';
export interface IRenderer {
  option: IRendererOption;
  stageHeight: number;
  stageWidth: number;
  stageX: number;
  stageY: number;
  zoom: number;
  animation: AnimationManager;
  canvas: Canvas;
  parent: HTMLElement;
  resize(): void;
  refresh(): void;
  getLayer<T extends Layer>(layerKey: string): T;
  remove(): void;
}
