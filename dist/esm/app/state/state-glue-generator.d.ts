import { State } from "./index";
import { DeepReadonly } from "utility-types";
import type { useEffect as reactUseEffect, useState as reactUseState } from "react";
export declare type GlueStatus = {
    error: any;
    isUpdating: boolean;
};
export declare type GlueResult<T> = [T, DeepReadonly<GlueStatus>];
export declare type ExternalState<T> = State<T>;
/**
 * Usage example:
 * ```
 *     const [fooGlue, fooStatus] = useGlue(fooState)
 * ```
 */
export declare const generateGlue: (useState: typeof reactUseState, useEffect: typeof reactUseEffect) => <Z>(externalState: State<Z>, logId?: string) => GlueResult<Z>;
//# sourceMappingURL=state-glue-generator.d.ts.map