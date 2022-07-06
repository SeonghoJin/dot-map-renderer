"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircleDot = void 0;
const consts_1 = require("@dot-map-renderer/consts");
class CircleDot {
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
        context.arc(this.x + (this.gapSize + this.size) / 2, this.y + (this.gapSize, this.size) / 2, (this.size) / 2, 0, consts_1.PI2, false);
        context.fill();
        context.closePath();
    }
}
exports.CircleDot = CircleDot;
//# sourceMappingURL=CircleDot.js.map