import { DotMapOptionArg} from "./type/dotMapOptionArg";
import {GeoJSONRendererOption} from "../core/types/geoJSONRendererOption";
import { DotMapOption } from "./dotMapOption";
import {GeoJSONRenderer} from "../core/geoJSONRenderer";

export class DotMap {
    private dotMapOption: DotMapOption;

    constructor(dotMapOptionArg? : DotMapOptionArg) {
        this.dotMapOption = new DotMapOption(dotMapOptionArg);
    }

    public attaching = (parentElement: HTMLElement) => {
        const rendererOption = this.dotMapOption.createRendererOption();
        const geoJSONRenderer = new GeoJSONRenderer(parentElement, rendererOption);
    }

}