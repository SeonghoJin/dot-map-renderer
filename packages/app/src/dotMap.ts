import { DotMapOptionArg } from './dotMapOptionArg';
import { DotMapOption } from './dotMapOption';
import {
    CanvasRenderer,
    CanvasController,
    CanvasInteraction,
    IController,
} from '@dot-map-renderer/canvas';

export class DotMap
{
    private dotMapOption: DotMapOption;
    private defaultController?: IController;

    constructor(dotMapOptionArg?: DotMapOptionArg)
    {
        this.dotMapOption = new DotMapOption(dotMapOptionArg);
    }

    public attaching = (parentElement: HTMLElement): void =>
    {
        if (this.dotMapOption.renderer === 'canvas')
        {
            const rendererOption = this.dotMapOption.createRendererOption();
            const renderer = new CanvasRenderer(parentElement, rendererOption);
            const controller = new CanvasController(renderer);

            new CanvasInteraction(renderer, controller);

            this.defaultController = controller;

            return;
        }

        if (this.dotMapOption.renderer === 'webgl')
        {
            throw new Error('not support webgl dotmap');
        }

        throw new Error('not support renderer');
    };

    get controller(): IController
    {
        return this.defaultController!;
    }
}

