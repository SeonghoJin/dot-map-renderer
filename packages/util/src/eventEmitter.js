"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _EventEmitter_eventMap;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
const defaultMap_1 = require("./defaultMap");
const eventContext_1 = require("./eventContext");
class EventEmitter {
    constructor() {
        _EventEmitter_eventMap.set(this, new defaultMap_1.DefaultMap(new eventContext_1.EventContext()));
        this.once = (key, value) => {
            const eventContext = __classPrivateFieldGet(this, _EventEmitter_eventMap, "f").get(key);
            const { eventArray } = eventContext;
            const length = eventArray.length;
            eventArray.push(((...args) => {
                eventArray[length] = null;
                eventContext.filter = true;
                value === null || value === void 0 ? void 0 : value(...args);
            }));
        };
        this.emit = (key, ...args) => {
            const eventContext = __classPrivateFieldGet(this, _EventEmitter_eventMap, "f").get(key);
            eventContext.execute(...args);
        };
        this.on = (key, value) => {
            const eventContext = __classPrivateFieldGet(this, _EventEmitter_eventMap, "f").get(key);
            const { eventArray } = eventContext;
            eventContext.off = false;
            if (value !== undefined) {
                eventArray.push(value);
            }
        };
        this.off = (key) => {
            const eventContext = __classPrivateFieldGet(this, _EventEmitter_eventMap, "f").get(key);
            eventContext.off = true;
        };
        this.delete = (key) => {
            __classPrivateFieldGet(this, _EventEmitter_eventMap, "f").delete(key);
        };
    }
}
exports.EventEmitter = EventEmitter;
_EventEmitter_eventMap = new WeakMap();
//# sourceMappingURL=eventEmitter.js.map