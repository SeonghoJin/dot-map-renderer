import { ILayer } from './ILayer';
import { CanvasRenderer } from './CanvasRenderer';
import { Polygon } from '@dot-map-renderer/component';

export class DotMapLayer implements ILayer
{
    private readonly polygons: Array<Polygon> = [];
    constructor(
        private readonly canvasRenderer: CanvasRenderer
    )
    {

    }

    resize()
    {
        console.log('resize');
    }

    draw()
    {
        console.log('draw');
    }

    addItem(item: Drawable[] | IResizable[] | IComponent[]): void
    {
        console.log(item);
    }
}
