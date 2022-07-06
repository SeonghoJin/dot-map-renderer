"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _EventContext_filterEventArrayIfFilterIsTrue;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventContext = void 0;
class EventContext {
    constructor() {
        this.eventArray = [];
        this.filter = false;
        this.off = false;
        _EventContext_filterEventArrayIfFilterIsTrue.set(this, () => {
            if (this.filter) {
                const filteredEventArray = this.eventArray.filter(Boolean);
                this.eventArray.splice(0, this.eventArray.length);
                this.eventArray.push(...filteredEventArray);
            }
        });
        this.execute = (...args) => {
            __classPrivateFieldGet(this, _EventContext_filterEventArrayIfFilterIsTrue, "f").call(this);
            if (this.off) {
                return undefined;
            }
            this.eventArray.forEach((event) => {
                event(...args);
            });
        };
    }
    clone() {
        return new EventContext();
    }
}
exports.EventContext = EventContext;
_EventContext_filterEventArrayIfFilterIsTrue = new WeakMap();
//# sourceMappingURL=eventContext.js.map