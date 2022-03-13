import { DotMapOptionArg } from './dotMapOptionArg';
import { DotMapOption } from './dotMapOption';
import {
    GeoJSONRenderer,
    DefaultRendererController,
    DefaultRendererInteraction
} from '@dot-map-renderer/renderer';

export class DotMap
{
    private dotMapOption: DotMapOption;
    private defaultController?: DefaultRendererController;

    constructor(dotMapOptionArg?: DotMapOptionArg)
    {
        this.dotMapOption = new DotMapOption(dotMapOptionArg);
    }

    public attaching = (parentElement: HTMLElement): void =>
    {
        const rendererOption = this.dotMapOption.createRendererOption();
        const renderer = new GeoJSONRenderer(parentElement, rendererOption);

        this.defaultController = new DefaultRendererController(renderer);
        new DefaultRendererInteraction(renderer, this.defaultController).init();
    };

    get controller(): DefaultRendererController
    {
        return this.defaultController!;
    }
}
