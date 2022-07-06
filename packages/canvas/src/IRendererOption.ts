import { DotFactory } from '@dot-map-renderer/component';

export type IRendererOption = {
    backgroundColor: string;
    pixelColor: string;
    pixelSize: number;
    gapSize: number;
    dotFactory: DotFactory,
};
