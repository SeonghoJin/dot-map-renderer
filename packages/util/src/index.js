"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
__exportStar(require("./bezierCurve"), exports);
__exportStar(require("./throttle"), exports);
__exportStar(require("./debounce"), exports);
var eventEmitter_1 = require("./eventEmitter");
Object.defineProperty(exports, "EventEmitter", { enumerable: true, get: function () { return eventEmitter_1.EventEmitter; } });
//# sourceMappingURL=index.js.map