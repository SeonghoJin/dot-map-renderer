import { Anchor } from './Anchors';
import { PI2 } from '@dot-map-renderer/consts';
import { RendererContext } from '@dot-map-renderer/canvas/src/RendererContext';
import { formatll, llToStagell, Point } from '@dot-map-renderer/component';
import { Collider } from '@dot-map-renderer/collider';

export class BasicAnchor implements Anchor
{
    x;
    y;
    drawX: number | undefined;
    drawY: number | undefined;
    interaction;
    collider: Collider;

    constructor(x: number, y: number, options?: {
        interaction: boolean
    })
    {
        this.x = x;
        this.y = y;
        this.interaction = options?.interaction ?? false;

        this.collider = new Collider(this, [[x, y], [x + 5, y], [x + 5, y + 5], [x, y + 5]]);
    }

    draw(context: CanvasRenderingContext2D): void
    {
        context.fillStyle = 'red';
        context.beginPath();
        context.arc(this.drawX!, this.drawY!, 5, 0, PI2, false);
        context.fill();
        context.closePath();
    }

    resize({
        stageHeight,
        stageWidth,
        stageY,
        stageX
    }: RendererContext): void
    {
        const [x, y] = llToStagell(formatll([this.y, this.x]), stageWidth, stageHeight);

        this.drawX = x + stageX;
        this.drawY = y + stageY;
    }

    hit(point: Point): Anchor | null
    {
        if (!this.interaction)
        {
            return null;
        }

        return this.collider.hit(point);
    }
}
