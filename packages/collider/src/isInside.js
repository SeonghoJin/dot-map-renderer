"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInside = void 0;
const isInside = (polygon, point) => {
    let count = 0;
    const polygonPointSize = polygon.length;
    for (let i = 0; i < polygonPointSize; i++) {
        const j = (i + 1) % polygonPointSize;
        const currentPoint = polygon[i];
        const nextPoint = polygon[j];
        if ((currentPoint.y > point.y) !== (nextPoint.y > point.y)) {
            const atX = (nextPoint.x - currentPoint.x) * (point.y - currentPoint.y) / (nextPoint.y - currentPoint.y) + currentPoint.x;
            if (point.x < atX) {
                count++;
            }
        }
    }
    return count % 2;
};
exports.isInside = isInside;
//# sourceMappingURL=isInside.js.map