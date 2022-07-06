"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RectDot = void 0;
class RectDot {
    constructor(x, y, size, gapSize, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.gapSize = gapSize;
        this.color = color;
    }
    draw(context) {
        context.beginPath();
        context.fillStyle = this.color;
        context.fillRect(this.x + this.gapSize, this.y + this.gapSize, this.size, this.size);
        context.closePath();
    }
}
exports.RectDot = RectDot;
//# sourceMappingURL=RectDot.js.map