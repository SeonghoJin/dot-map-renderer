import { DotMapOptionArg } from './dotMapOptionArg';
import { DotMapOption } from './dotMapOption';
import {
  CanvasRenderer,
  CanvasController,
  CanvasInteraction,
  IController,
  IInteraction,
} from '@dot-map-renderer/canvas';
import { IRenderer } from '@dot-map-renderer/canvas/src/IRenderer';

export class DotMap {
  private dotMapOption: DotMapOption;
  private parentElement: HTMLElement | null = null;
  private renderer: IRenderer | null = null;
  private controller: IController | null = null;
  private interaction: IInteraction | null = null;

  constructor(dotMapOptionArg?: DotMapOptionArg) {
    this.dotMapOption = new DotMapOption(dotMapOptionArg);
  }

  public attach = (parentElement: HTMLElement): void => {
    if (this.dotMapOption.renderer === 'canvas') {
      const rendererOption = this.dotMapOption.createRendererOption();

      this.renderer = new CanvasRenderer(parentElement, rendererOption);
      this.controller = new CanvasController(this.renderer!);
      this.interaction = new CanvasInteraction(this.renderer!, this.controller!);

      return;
    }

    if (this.dotMapOption.renderer === 'webgl') {
      throw new Error('not support webgl dotmap');
    }

    throw new Error('not support renderer');
  };

  public detach = () => {
    if (this.parentElement) {
      throw new Error('not defined parentElement');
    }

    this.renderer?.remove();
    this.interaction?.remove();

    this.renderer = null;
    this.controller = null;
    this.interaction = null;
  };

  public getController = () => {
    if (this.controller) {
      return this.controller;
    }

    throw new Error('not defined controller, if you To have a controller, an attach API must be called.');
  };
}
