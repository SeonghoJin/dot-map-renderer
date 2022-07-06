export interface ILayer {
  draw(): void;
  resize?(): void;
  hit?(): void;
}
