"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicLine = void 0;
const component_1 = require("@dot-map-renderer/component");
const collider_1 = require("@dot-map-renderer/collider");
class BasicLine {
    constructor(lineData, options) {
        var _a;
        const [start, end] = lineData;
        this.startPoint = start;
        this.endPoint = end;
        this.interaction = (_a = options === null || options === void 0 ? void 0 : options.interaction) !== null && _a !== void 0 ? _a : false;
        this.collider = new collider_1.Collider(this, [
            this.startPoint,
            [this.startPoint[0] + 10, this.startPoint[1] + 10],
            this.endPoint,
            [this.endPoint[0] + 10, this.endPoint[1] + 10]
        ]);
    }
    draw(context) {
        const [startX, startY] = this.startDrawPoint;
        const [endX, endY] = this.endDrawPoint;
        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(endX, endY);
        context.lineWidth = 10;
        context.stroke();
        context.closePath();
    }
    resize({ stageWidth, stageHeight, stageX, stageY }) {
        const [startX, startY] = (0, component_1.llToStagell)((0, component_1.formatll)([this.startPoint[1], this.startPoint[0]]), stageWidth, stageHeight);
        const [endX, endY] = (0, component_1.llToStagell)((0, component_1.formatll)([this.endPoint[1], this.endPoint[0]]), stageWidth, stageHeight);
        this.startDrawPoint = [
            startX + stageX,
            startY + stageY
        ];
        this.endDrawPoint = [
            endX + stageX,
            endY + stageY
        ];
    }
    hit(point) {
        if (!this.interaction) {
            return null;
        }
        return this.collider.hit(point);
    }
}
exports.BasicLine = BasicLine;
//# sourceMappingURL=BasicLine.js.map