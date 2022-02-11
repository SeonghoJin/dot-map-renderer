import { DotMapOptionArg} from "./dotMapOptionArg";
import { DotMapOption } from "./dotMapOption";
import {
    GeoJSONRenderer,
    RendererDefaultController,
    RendererDefaultInteraction
} from "@dot-map-renderer/renderer";

export class DotMap {
    private dotMapOption: DotMapOption;
    private defaultController?: RendererDefaultController;

    constructor(dotMapOptionArg? : DotMapOptionArg) {
        this.dotMapOption = new DotMapOption(dotMapOptionArg);
    }

    public attaching = (parentElement: HTMLElement) : void => {
        const rendererOption = this.dotMapOption.createRendererOption();
        const renderer = new GeoJSONRenderer(parentElement, rendererOption);
        this.defaultController = new RendererDefaultController(renderer);
        new RendererDefaultInteraction(renderer, this.defaultController).init();
    }

    get controller() : RendererDefaultController {
        return this.defaultController!!;
    }

}
