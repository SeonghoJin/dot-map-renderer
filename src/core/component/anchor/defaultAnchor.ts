import {Anchor} from "../../interfaces/anchors";
import {PI2} from "../../consts";

export class DefaultAnchor implements Anchor{

    draw(context: CanvasRenderingContext2D, x: number, y: number): void {
        context.fillStyle = 'red';
        context.beginPath();
        context.arc(x, y, 5, 0, PI2, false);
        context.fill()
        context.closePath();
    }

}