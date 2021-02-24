define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.assert = void 0;
    function assert(b, msg) {
        if (!b) {
            if (msg == undefined) {
                msg == "assert";
            }
            throw new Error(msg);
        }
    }
    exports.assert = assert;
});
