export interface IInteraction {
    onWheel: (event: WheelEvent) => void;
    onMouseMove: (event: MouseEvent) => void;
    onMouseDown: (event: MouseEvent) => void;
    onMouseMoveWithMouseDown: (event: MouseEvent) => void;
    onMouseUp: (event: MouseEvent) => void;
}
