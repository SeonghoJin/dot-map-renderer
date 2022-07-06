"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = void 0;
const debounce = (callback, second) => {
    let flag = true;
    return (event) => {
        event.preventDefault();
        if (!flag)
            return;
        flag = false;
        setTimeout(() => {
            flag = true;
            callback(event);
        }, second);
    };
};
exports.debounce = debounce;
//# sourceMappingURL=debounce.js.map