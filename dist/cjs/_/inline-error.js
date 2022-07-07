define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.inlineErr = void 0;
    async function inlineErr(arg, preventLog) {
        try {
            return [await arg];
        }
        catch (err) {
            if (!preventLog) {
                console.error(err);
            }
            return [undefined, err];
        }
    }
    exports.inlineErr = inlineErr;
});
//# sourceMappingURL=inline-error.js.map