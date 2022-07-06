import { Drawable } from './Drawable';
import { IResizable } from './IResizable';
import { IHitable } from '../IHitable';

export interface IComponent extends Drawable, IResizable, IHitable {
}
