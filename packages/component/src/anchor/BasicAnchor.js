"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicAnchor = void 0;
const consts_1 = require("@dot-map-renderer/consts");
const component_1 = require("@dot-map-renderer/component");
const collider_1 = require("@dot-map-renderer/collider");
class BasicAnchor {
    constructor(x, y, options) {
        var _a;
        this.x = x;
        this.y = y;
        this.interaction = (_a = options === null || options === void 0 ? void 0 : options.interaction) !== null && _a !== void 0 ? _a : false;
        this.collider = new collider_1.Collider(this, [[x, y], [x + 5, y], [x + 5, y + 5], [x, y + 5]]);
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
    hit(point) {
        if (!this.interaction) {
            return null;
        }
        return this.collider.hit(point);
    }
}
exports.BasicAnchor = BasicAnchor;
//# sourceMappingURL=BasicAnchor.js.map