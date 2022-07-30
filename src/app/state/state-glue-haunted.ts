import {generateGlue} from "./state-glue-generator.js";
import {useEffect, useState} from "haunted/lib/core.js";

export const useGlue = generateGlue(useState as any, useEffect as any)