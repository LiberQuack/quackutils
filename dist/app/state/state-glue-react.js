import { generateGlue } from "./state-glue-generator";
import { useEffect, useState } from "react";
export const useGlue = generateGlue(useState, useEffect);
//# sourceMappingURL=state-glue-react.js.map