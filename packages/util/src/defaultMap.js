"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _DefaultMap_map, _DefaultMap_defalutValue;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultMap = void 0;
const deepCopy_1 = require("./deepCopy");
class DefaultMap {
    constructor(defaultValue) {
        _DefaultMap_map.set(this, new Map());
        _DefaultMap_defalutValue.set(this, void 0);
        __classPrivateFieldSet(this, _DefaultMap_defalutValue, defaultValue, "f");
    }
    get defaultValue() {
        return (0, deepCopy_1.deepCopy)(__classPrivateFieldGet(this, _DefaultMap_defalutValue, "f"));
    }
    set(key, value) {
        __classPrivateFieldGet(this, _DefaultMap_map, "f").set(key, value);
    }
    get(key) {
        const value = __classPrivateFieldGet(this, _DefaultMap_map, "f").get(key);
        if (value === undefined) {
            __classPrivateFieldGet(this, _DefaultMap_map, "f").set(key, this.defaultValue);
            return __classPrivateFieldGet(this, _DefaultMap_map, "f").get(key);
        }
        return value;
    }
    delete(key) {
        __classPrivateFieldGet(this, _DefaultMap_map, "f").delete(key);
    }
}
exports.DefaultMap = DefaultMap;
_DefaultMap_map = new WeakMap(), _DefaultMap_defalutValue = new WeakMap();
//# sourceMappingURL=defaultMap.js.map