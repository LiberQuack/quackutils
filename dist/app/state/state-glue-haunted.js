import { generateGlue } from "./state-glue-generator";
import { useEffect, useState } from "haunted/lib/core";
export const useGlue = generateGlue(useState, useEffect);
//# sourceMappingURL=state-glue-haunted.js.map