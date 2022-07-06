import { DotType } from '@dot-map-renderer/component';
import { IRendererOption } from '@dot-map-renderer/canvas';
export declare type DotMapOptionArg = Partial<Pick<IRendererOption, 'gapSize' | 'pixelSize' | 'backgroundColor' | 'pixelColor'> & {
    dotType: DotType;
    renderer: 'canvas' | 'webgl';
}>;
