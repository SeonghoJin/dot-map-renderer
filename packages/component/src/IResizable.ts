import { RendererContext } from '@dot-map-renderer/canvas/src/RendererContext';

export interface IResizable {
    resize(renderer: RendererContext): void;
}
