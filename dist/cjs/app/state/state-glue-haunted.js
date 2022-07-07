define(["require", "exports", "./state-glue-generator", "haunted/lib/core"], function (require, exports, state_glue_generator_1, core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useGlue = void 0;
    exports.useGlue = (0, state_glue_generator_1.generateGlue)(core_1.useState, core_1.useEffect);
});
//# sourceMappingURL=state-glue-haunted.js.map