declare module "_/inline-error" {
    export function inlineErr<T = any>(arg: Promise<T> | T, preventLog?: boolean): Promise<[T | undefined, Error?]>;
}
declare module "_/types" {
    import type { Struct } from "superstruct";
    export type Dictionary<T> = {
        [x: string]: T;
    };
    export type UnPartial<T> = T extends Partial<infer U> ? U : never;
    export type Nullable<T> = T | null;
    export type Undefinable<T> = T | undefined;
    /** @deprecated Use ValuesType from "utility-types" instead */
    export type UnArray<T> = T extends Array<infer U> ? U : never;
    export type StructType<T extends Struct<any>> = T extends Struct<infer U> ? U : never;
    export type ConditionalType<Boolean, X, Y> = Boolean extends true ? X : Y;
    type NativeType = Date | number | string | boolean | undefined | null;
    export type Pojo = {
        [x: string]: NativeType | NativeType[] | Pojo | Pojo[];
    };
    global {
        interface Navigator {
            getInstalledRelatedApps(): Promise<{
                platform: "webapp";
                url: string;
            }[]>;
        }
    }
    export interface BeforeInstallPromptEvent extends Event {
        readonly platforms: string[];
        readonly userChoice: Promise<{
            outcome: "accepted" | "dismissed";
            platform: string;
        }>;
        prompt(): Promise<void>;
    }
    global {
        interface WindowEventMap {
            beforeinstallprompt: BeforeInstallPromptEvent;
        }
    }
}
declare module "app/state/index" {
    import { Dictionary, Undefinable } from "_/types";
    import { DeepReadonly } from "utility-types";
    type Subscription<T = any> = (prev: Undefinable<StateData<T>>, current: StateData<T>) => void;
    type Updater<T extends Dictionary<any>> = (() => T | Promise<T>) | ((draftState: T) => void | Promise<void>);
    type StateData<T> = {
        state: T;
        isUpdating: boolean;
        error: any;
    };
    export class State<T extends Dictionary<any>> {
        readonly id: string;
        private state;
        private prevState;
        private subscriptions;
        private readonly initialState;
        private hold;
        private queue;
        isUpdating: boolean;
        error: any;
        private static instances;
        constructor(id: string, state: T, opts?: {
            preventInstanceTracking: boolean;
        });
        static getInstances(): State<any>[];
        getState(): T;
        private getStateData;
        resetState(): void;
        getInitialState(): DeepReadonly<T>;
        /**
         * This method defers updates for the next `releaseUpdates()` call.
         *
         * Very useful for apps startup, where you may want to start with external data, but since it's an async task,
         * you do not want your subscribers reacting until you fetch it
         *
         * @example using hold
         *     //counter-state.js
         *     const state = new State({count: 0}));
         *     state.hold();
         *
         *     //counter-ui.js
         *     state.update(s => {s.count = s.count + 1});
         *
         *     //counter-fetcher.js
         *     const userCount = await loadUserCount(); //10
         *     state.releaseUpdates(s = > {s.count = userCount});
         *
         *     //result.js (after all is run)
         *     state.getState().count //RESULT IS: 11
         */
        holdUpdates(): void;
        /**
         * This method release all updates that were on hold, check `holdUpdate()` to learn more
         * @param priorUpdate Queued tasks will be run against the result of this param
         */
        releaseUpdates(priorUpdate?: Updater<T>): Promise<void>;
        update(updater: Updater<T>, opts?: {}): Promise<void>;
        clearError(): void;
        subscribe(subscription: Subscription<T>): () => Boolean;
        runSubscribers(): void;
        unsubscribe(subscription: Subscription): Boolean;
    }
    export const stateLoggerInjector: (logName: string, state: State<any>) => void;
}
declare module "index" {
    export * from "app/state/index";
}
declare module "app/state/state-glue-generator" {
    import { State } from "app/state/index";
    import { DeepReadonly } from "utility-types";
    import type { useEffect as reactUseEffect, useState as reactUseState } from "react";
    export type GlueStatus = {
        error: any;
        isUpdating: boolean;
    };
    export type GlueResult<T> = [T, DeepReadonly<GlueStatus>];
    export type ExternalState<T> = State<T>;
    /**
     * Usage example:
     * ```
     *     const [fooGlue, fooStatus] = useGlue(fooState)
     * ```
     */
    export const generateGlue: (useState: typeof reactUseState, useEffect: typeof reactUseEffect) => <Z>(externalState: State<Z>, logId?: string) => GlueResult<Z>;
}
declare module "app/state/state-glue-haunted" {
    export const useGlue: <Z>(externalState: import("index").State<Z>, logId?: string | undefined) => import("app/state/state-glue-generator").GlueResult<Z>;
}
declare module "state-glue-haunted" {
    export { useGlue } from "app/state/state-glue-haunted";
}
declare module "app/state/state-glue-react" {
    export const useGlue: <Z>(externalState: import("index").State<Z>, logId?: string | undefined) => import("app/state/state-glue-generator").GlueResult<Z>;
}
declare module "state-glue-react" {
    export { useGlue } from "app/state/state-glue-react";
}
//# sourceMappingURL=types.d.ts.map