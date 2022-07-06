import { Anchor } from './Anchors';
import { RendererContext } from '@dot-map-renderer/canvas/src/RendererContext';
export declare class BasicAnchor implements Anchor {
    x: number;
    y: number;
    drawX: number | undefined;
    drawY: number | undefined;
    constructor(x: number, y: number, rendererContext: RendererContext);
    draw(context: CanvasRenderingContext2D): void;
    resize({ stageHeight, stageWidth, stageY, stageX }: RendererContext): void;
}
