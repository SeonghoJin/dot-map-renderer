"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasController = void 0;
const component_1 = require("@dot-map-renderer/component");
class CanvasController {
    constructor(renderer) {
        this.renderer = renderer;
        this.addZoom = (zoom) => {
            this.renderer.zoom += zoom;
            this.renderer.zoom = Math.min(Math.max(this.renderer.zoom, 1), 3);
            this.renderer.canvas.setStyleSize(`${this.renderer.zoom * 100}%`, `${this.renderer.zoom * 100}%`);
            this.renderer.run();
        };
        this.addAnchors = (points) => {
            const context = this.renderer.getContext();
            const anchors = [...(0, component_1.isPoint)(points) ? [new component_1.BasicAnchor(points[0], points[1], context)] : points.map(([x, y]) => new component_1.BasicAnchor(x, y, context))];
            console.log(anchors);
            this.renderer.components.push(...anchors);
            this.renderer.drawComponents();
        };
        this.move = (moveY, moveX) => {
            const [x, y] = (0, component_1.formatll)([moveX, moveY]);
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
}
exports.CanvasController = CanvasController;
//# sourceMappingURL=CanvasController.js.map