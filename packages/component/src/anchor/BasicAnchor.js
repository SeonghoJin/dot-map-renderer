"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicAnchor = void 0;
const consts_1 = require("@dot-map-renderer/consts");
const component_1 = require("@dot-map-renderer/component");
class BasicAnchor {
    constructor(x, y, rendererContext) {
        this.x = x;
        this.y = y;
        this.resize(rendererContext);
    }
    draw(context) {
        context.fillStyle = 'red';
        context.beginPath();
        context.arc(this.drawX, this.drawY, 5, 0, consts_1.PI2, false);
        context.fill();
        context.closePath();
    }
    resize({ stageHeight, stageWidth, stageY, stageX }) {
        const [x, y] = (0, component_1.llToStagell)((0, component_1.formatll)([this.y, this.x]), stageWidth, stageHeight);
        this.drawX = x + stageX;
        this.drawY = y + stageY;
    }
}
exports.BasicAnchor = BasicAnchor;
//# sourceMappingURL=BasicAnchor.js.map