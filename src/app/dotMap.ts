import { DotMapOptionArg} from "./type/dotMapOptionArg";
import { DotMapOption } from "./dotMapOption";
import {GeoJSONRenderer} from "../renderer/geoJSONRenderer";
import {DotMapController} from "./interfaces/dotMapController";

export class DotMap {
    private dotMapOption: DotMapOption;

    constructor(dotMapOptionArg? : DotMapOptionArg) {
        this.dotMapOption = new DotMapOption(dotMapOptionArg);
    }

    public attaching = (parentElement: HTMLElement) : DotMapController => {
        const rendererOption = this.dotMapOption.createRendererOption();
        const geoJSONRenderer = new GeoJSONRenderer(parentElement, rendererOption);
        return geoJSONRenderer;
    }

}