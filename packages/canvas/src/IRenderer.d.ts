import { IRendererOption } from './IRendererOption';
import { AnimationManager } from './AnimationManager';
import { Layer } from './Layer';
import { Canvas, DotFactory, DotType } from '@dot-map-renderer/component';
export interface IRenderer {
    option: IRendererOption;
    stageHeight: number;
    stageWidth: number;
    stageX: number;
    stageY: number;
    zoom: number;
    animation?: AnimationManager;
    canvas: Canvas;
    parent: HTMLElement;
    get pixelSize(): number;
    set pixelSize(pixelSize: number);
    get gapSize(): number;
    set gapSize(gapSize: number);
    set backgroundColor(backgroundColor: string);
    get pixelColor(): string;
    set pixelColor(pixelColor: string);
    setDotFactory(dotType: DotType): void;
    get dotFactory(): DotFactory;
    resize(): void;
    refresh(): void;
    getLayer<T extends Layer>(layerKey: string): T;
    remove(): void;
}
