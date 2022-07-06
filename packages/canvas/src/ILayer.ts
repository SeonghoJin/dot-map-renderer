import { Drawable } from '@dot-map-renderer/component';
import { IResizable } from '@dot-map-renderer/component/src/IResizable';
import { IComponent } from '@dot-map-renderer/component/src/IComponent';

export interface ILayer {
    resize(): void;
    draw(): void;
    addItem(
        item: Drawable[] | IResizable[] | IComponent[]
    ): void;
}
