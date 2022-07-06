"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throttle = void 0;
const throttle = (callback, second) => {
    let timer;
    return (event) => {
        if (timer !== undefined) {
            clearTimeout(timer);
        }
        timer = setTimeout(callback(event), second);
    };
};
exports.throttle = throttle;
//# sourceMappingURL=throttle.js.map