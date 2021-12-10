import {Anchor} from "@dot-map-renderer/renderer";
import {PI2} from "@dot-map-renderer/renderer";

export class DefaultAnchor implements Anchor{

    draw(context: CanvasRenderingContext2D, x: number, y: number): void {
        context.fillStyle = 'red';
        context.beginPath();
        context.arc(x, y, 5, 0, PI2, false);
        context.fill()
        context.closePath();
    }

}