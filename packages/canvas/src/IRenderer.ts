import { IRendererOption } from './IRendererOption';

export interface IRenderer
{
    option: IRendererOption;
    stageHeight: number;
    stageWidth: number;
    stageX: number;
    stageY: number;
    zoom: number;
}
