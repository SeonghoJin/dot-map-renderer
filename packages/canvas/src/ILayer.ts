export interface ILayer {
    draw(): void;
    resize?(): void;
    depth: number;
}
