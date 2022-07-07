import { Dictionary, Undefinable } from "../../_/types";
import { DeepReadonly } from "utility-types";
declare type Subscription<T = any> = (prev: Undefinable<StateData<T>>, current: StateData<T>) => void;
declare type Updater<T extends Dictionary<any>> = (() => T | Promise<T>) | ((draftState: T) => void | Promise<void>);
declare type StateData<T> = {
    state: T;
    isUpdating: boolean;
    error: any;
};
export declare class State<T extends Dictionary<any>> {
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
export declare const stateLoggerInjector: (logName: string, state: State<any>) => void;
export {};
