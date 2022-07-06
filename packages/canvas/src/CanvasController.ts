import { formatll, Point, isPoint } from '@dot-map-renderer/component';
import { CanvasRenderer } from './CanvasRenderer';
import { IController } from './IController';

export class CanvasController implements IController
{
    constructor(private readonly renderer: CanvasRenderer)
    {

    }

    addZoom = (zoom: number) =>
    {
        this.renderer.zoom += zoom;
        this.renderer.zoom = Math.min(Math.max(this.renderer.zoom, 1), 3);
        this.renderer.canvas.setStyleSize(`${this.renderer.zoom * 100}%`, `${this.renderer.zoom * 100}%`);
        this.renderer.run();
    };

    addAnchors = (points: Point[] | Point) =>
    {
        this.renderer.anchorPoints.push(...isPoint(points) ? [points] : points);
        this.renderer.drawAnchors();
    };

    move = (moveY: number, moveX: number) =>
    {
        const [x, y] = formatll([moveX, moveY]);
        const xRatio = x / 360;
        const yRatio = y / 180;
        const testBoundRect = this.renderer.parent.getBoundingClientRect();
        const targetX = Math.floor(this.renderer.stageWidth * xRatio);
        const targetY = Math.floor(this.renderer.stageHeight * yRatio);

        this.renderer.canvas.context.beginPath();
        this.renderer.parent.scrollTo({
            left: targetX + this.renderer.stageX - testBoundRect.width / 2,
            top: targetY + this.renderer.stageY - testBoundRect.height / 2,
            behavior: 'smooth'
        });
    };
}
