"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Polygon = void 0;
const coordinateNormalization_1 = require("./coordinateNormalization");
class Polygon {
    constructor(x, y, points) {
        this.x = x;
        this.y = y;
        this.points = points;
        this.polygonRatio = 0;
    }
    resize(x, y, polygonRatio) {
        this.x = x;
        this.y = y;
        this.polygonRatio = polygonRatio;
    }
    draw(ctx) {
        const firstPoint = this.mapping(this.points[0]);
        ctx.beginPath();
        ctx.fillStyle = '#111111';
        ctx.moveTo(firstPoint[0], firstPoint[1]);
        this.points.forEach((point) => {
            const mappedPoint = this.mapping(point);
            ctx.lineTo(mappedPoint[0], mappedPoint[1]);
        });
        ctx.fill();
    }
    mapping(point) {
        const [x, y] = (0, coordinateNormalization_1.formatll)(point);
        return [
            this.x + x * this.polygonRatio,
            this.y + y * this.polygonRatio,
        ];
    }
}
exports.Polygon = Polygon;
//# sourceMappingURL=Polygon.js.map