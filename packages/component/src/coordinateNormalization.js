"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.llToStagell = exports.formatll = void 0;
const formatll = (point) => [point[0] + 180, -point[1] + 90];
exports.formatll = formatll;
const llToStagell = (point, stageWidth, stageHeight) => {
    const xRatio = point[0] / 360;
    const yRatio = point[1] / 180;
    return [xRatio * stageWidth, yRatio * stageHeight];
};
exports.llToStagell = llToStagell;
//# sourceMappingURL=coordinateNormalization.js.map