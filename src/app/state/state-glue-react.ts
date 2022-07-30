import {generateGlue} from "./state-glue-generator.js";
import {useEffect, useState} from "react";

export const useGlue = generateGlue(useState, useEffect)