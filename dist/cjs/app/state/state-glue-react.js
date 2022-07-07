define(["require", "exports", "./state-glue-generator", "react"], function (require, exports, state_glue_generator_1, react_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useGlue = void 0;
    exports.useGlue = (0, state_glue_generator_1.generateGlue)(react_1.useState, react_1.useEffect);
});
//# sourceMappingURL=state-glue-react.js.map