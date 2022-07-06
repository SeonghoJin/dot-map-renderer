import { formatll, Point, isPoint, BasicAnchor } from '@dot-map-renderer/component';
import { CanvasRenderer } from './CanvasRenderer';
import { IController } from './IController';
import { componentLayerKey } from '@dot-map-renderer/consts';
import { ComponentLayer } from './ComponentLayer';
import { BasicLine } from '@dot-map-renderer/component/src/line/BasicLine';
import { LineData } from '@dot-map-renderer/component/src/line/LineData';
import { IComponent } from '@dot-map-renderer/component/src/IComponent';

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
        const anchors = [...isPoint(points) ? [new BasicAnchor(points[0], points[1])] : points.map(([x, y]) => new BasicAnchor(x, y))];

        this.addComponent(anchors);
    };

    addLine = (line: LineData) =>
    {
        const lineComponent = new BasicLine(line);

        this.addComponent([lineComponent]);
    };

    addComponent = (item: IComponent[]) =>
    {
        const componentLayer = this.renderer.getLayer<ComponentLayer>(componentLayerKey);

        componentLayer.addItem(item);
        componentLayer.resize();
        componentLayer.draw();
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
