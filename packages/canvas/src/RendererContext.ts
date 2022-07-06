import { IRenderer } from './IRenderer';

export type RendererContext = Pick<IRenderer, 'stageHeight' | 'stageWidth' | 'stageX' | 'stageY'>;
