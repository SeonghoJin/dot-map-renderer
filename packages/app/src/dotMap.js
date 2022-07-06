"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DotMap = void 0;
const dotMapOption_1 = require("./dotMapOption");
const canvas_1 = require("@dot-map-renderer/canvas");
class DotMap {
    constructor(dotMapOptionArg) {
        this.attaching = (parentElement) => {
            if (this.dotMapOption.renderer === 'canvas') {
                const rendererOption = this.dotMapOption.createRendererOption();
                const renderer = new canvas_1.CanvasRenderer(parentElement, rendererOption);
                const controller = new canvas_1.CanvasController(renderer);
                new canvas_1.CanvasInteraction(renderer, controller);
                this.defaultController = controller;
                return;
            }
            if (this.dotMapOption.renderer === 'webgl') {
                throw new Error('not support webgl dotmap');
            }
            throw new Error('not support renderer');
        };
        this.dotMapOption = new dotMapOption_1.DotMapOption(dotMapOptionArg);
    }
    get controller() {
        return this.defaultController;
    }
}
exports.DotMap = DotMap;
//# sourceMappingURL=dotMap.js.map