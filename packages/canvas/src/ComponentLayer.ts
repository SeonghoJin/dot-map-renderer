import { ILayer } from './ILayer';
import { CanvasRenderer } from './CanvasRenderer';
import { IComponent } from '@dot-map-renderer/component/src/IComponent';

export class ComponentLayer implements ILayer
{
    private readonly components: Array<IComponent> = [];

    constructor(
        private readonly canvasRenderer: CanvasRenderer
    )
    {
    }

    draw(): void
    {
        this.canvasRenderer.canvas.drawing(this.components);
    }

    resize(): void
    {
        this.components.forEach((component) =>
        {
            component.resize(this.canvasRenderer);
        });
    }

    addItem(item: IComponent[]): void
    {
        this.components.push(...item);
    }
}

