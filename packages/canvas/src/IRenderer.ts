import { IRendererOption } from './IRendererOption';
import { AnimationManager } from './AnimationManager';

export interface IRenderer {
  option: IRendererOption;
  stageHeight: number;
  stageWidth: number;
  stageX: number;
  stageY: number;
  zoom: number;
  animation: AnimationManager;
}
