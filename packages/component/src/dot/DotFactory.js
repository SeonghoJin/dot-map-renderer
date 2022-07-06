"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DotFactory = void 0;
const component_1 = require("@dot-map-renderer/component");
class DotFactory {
    constructor(type) {
        this.type = type;
        if (this.type === 'rectangular') {
            this.createFunction = component_1.RectDot;
        }
        else {
            this.createFunction = component_1.CircleDot;
        }
    }
    create(x, y, size, gapSize, color) {
        return new this.createFunction(x, y, size, gapSize, color);
    }
}
exports.DotFactory = DotFactory;
//# sourceMappingURL=DotFactory.js.map