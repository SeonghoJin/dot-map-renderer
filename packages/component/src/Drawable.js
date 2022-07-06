"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDrawable = void 0;
const isDrawable = (object) => {
    if (object.x === undefined)
        return false;
    if (object.y === undefined)
        return false;
    return true;
};
exports.isDrawable = isDrawable;
//# sourceMappingURL=Drawable.js.map