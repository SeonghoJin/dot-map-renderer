"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCloneable = void 0;
const isCloneable = (obj) => {
    if (obj.clone) {
        return true;
    }
    return false;
};
exports.isCloneable = isCloneable;
//# sourceMappingURL=isCloneable.js.map