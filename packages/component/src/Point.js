"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPoint = void 0;
const isPoint = (object) => {
    if (typeof object[0] !== 'number')
        return false;
    if (typeof object[1] !== 'number')
        return false;
    return true;
};
exports.isPoint = isPoint;
//# sourceMappingURL=Point.js.map