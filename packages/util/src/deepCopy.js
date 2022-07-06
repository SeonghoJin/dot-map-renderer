"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepCopy = void 0;
const isCloneable_1 = require("./isCloneable");
const deepCopy = (obj) => {
    if ((0, isCloneable_1.isCloneable)(obj)) {
        return obj.clone();
    }
    else if (typeof obj === 'string' || typeof obj === 'function') {
        return obj;
    }
    else if ((obj).length !== undefined) {
        return Array.from(obj);
    }
    else if (typeof obj === 'object' && obj !== null) {
        const clone = Object.assign(Object.create(Object.getPrototypeOf(obj)), obj);
        for (const key in obj) {
            if (typeof clone[key] !== 'function') {
                clone[key] = (0, exports.deepCopy)(obj[key]);
            }
        }
        return clone;
    }
    return obj;
};
exports.deepCopy = deepCopy;
//# sourceMappingURL=deepCopy.js.map