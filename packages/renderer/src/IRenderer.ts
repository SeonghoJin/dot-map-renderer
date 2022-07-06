import { GeoJSONRendererOption } from './GeoJSONRendererOption';

export interface IRenderer
{
    option: GeoJSONRendererOption;
    stageHeight: number;
    stageWidth: number;
    stageX: number;
    stageY: number;
    image: HTMLImageElement;
    zoom: number;
}
