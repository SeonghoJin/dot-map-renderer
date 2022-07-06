"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DotMapOption = void 0;
const component_1 = require("@dot-map-renderer/component");
class DotMapOption {
    constructor(option) {
        var _a, _b, _c, _d, _e, _f;
        this.pixelSize = (_a = option === null || option === void 0 ? void 0 : option.pixelSize) !== null && _a !== void 0 ? _a : 4;
        this.gapSize = (_b = option === null || option === void 0 ? void 0 : option.gapSize) !== null && _b !== void 0 ? _b : 2;
        this.backgroundColor = (_c = option === null || option === void 0 ? void 0 : option.backgroundColor) !== null && _c !== void 0 ? _c : 'black';
        this.pixelColor = (_d = option === null || option === void 0 ? void 0 : option.pixelColor) !== null && _d !== void 0 ? _d : '#D3D3D3';
        this.dotType = (_e = option === null || option === void 0 ? void 0 : option.dotType) !== null && _e !== void 0 ? _e : 'circle';
        this.renderer = (_f = option === null || option === void 0 ? void 0 : option.renderer) !== null && _f !== void 0 ? _f : 'canvas';
    }
    createRendererOption() {
        const { pixelSize, gapSize, backgroundColor, pixelColor, dotType } = this;
        return {
            pixelSize,
            gapSize,
            backgroundColor,
            pixelColor,
            dotFactory: new component_1.DotFactory(dotType || 'circle'),
        };
    }
}
exports.DotMapOption = DotMapOption;
//# sourceMappingURL=dotMapOption.js.map