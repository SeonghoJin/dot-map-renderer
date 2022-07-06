import { IComponent } from '@dot-map-renderer/component/src/IComponent';
import { Point } from '@dot-map-renderer/component';
import { isInside } from './isInside';

export class Collider
{
    private readonly hitArea: {
        x: number,
        y: number
    }[];

    constructor(
        private readonly component: IComponent,
        hitArea: Point[])
    {
        this.hitArea = hitArea.map((point) =>
        {
            const [x, y] = point;

            return { x, y };
        });
    }

    hit<T extends IComponent>(point: Point)
    {
        const [x, y] = point;

        if (isInside(this.hitArea, {
            x, y
        }))
        {
            return this.component as T;
        }

        return null;
    }
}
