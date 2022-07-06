import produce from "immer";
import {inlineErr} from "../../../inline-error";
import {Dictionary, Undefinable} from "../../../types";
import {DeepReadonly} from "utility-types";

type Subscription<T = any> = (prev:Undefinable<StateData<T>>, current:StateData<T>) => void;

type Updater<T extends Dictionary<any>> = (() => T | Promise<T>) | ((draftState: T) => void | Promise<void>);

type StateData<T> = {
    state: T,
    isUpdating: boolean,
    error: any
}

export class State<T extends Dictionary<any>> {

    private state: T;
    private prevState: Undefinable<StateData<T>>;

    private subscriptions: Subscription<T>[] = [];
    private readonly initialState: T;
    private hold = false;
    private queue: (() => void)[] = [];

    public isUpdating = false;
    public error: any;

    private static instances: State<any>[] = []

    constructor(public readonly id: string, state: T, opts?: {preventInstanceTracking: boolean}) {
        this.state = state;
        this.initialState = state;
        if (!opts?.preventInstanceTracking) {
            State.instances.push(this);
        }
    }

    static getInstances() {
        return State.instances;
    }

    getState(): T {
        return this.state
    }

    private getStateData(): StateData<T> {
        return {
            state: this.state,
            error: this.error,
            isUpdating: this.isUpdating
        }
    }

    resetState() {
        this.prevState = this.getStateData();
        this.state = {...this.initialState};
        this.runSubscribers();
    }

    getInitialState(): DeepReadonly<T> {
        return this.initialState as DeepReadonly<T>;
    }

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
    holdUpdates(): void {
        this.hold = true;
    }

    /**
     * This method release all updates that were on hold, check `holdUpdate()` to learn more
     * @param priorUpdate Queued tasks will be run against the result of this param
     */
    async releaseUpdates(priorUpdate?: Updater<T>): Promise<void> {
        const queue = this.queue;
        this.queue = [];

        this.hold = false;

        if (priorUpdate) {
            await this.update(priorUpdate);
        }

        for (let queueElement of queue) {
            //Each loop will trigger this state subscriber, it's intentional
            //if one of the update takes too long as it's async
            //we want the respective subscribers listen to the changes as soon as possible
            await this.update(queueElement);
        }
    }

    async update(updater: Updater<T>, opts?: {}): Promise<void> {
        if (this.hold) {
            return new Promise<void>((resolve, reject) => {
                this.queue.push(() => {
                    this.update(updater).then(resolve).catch(reject);
                });
            })
        }

        const produceResult = produce(this.state, updater as any);

        if (produceResult instanceof Promise) {
            this.prevState = this.getStateData();
            this.isUpdating = true;
            this.runSubscribers();
        }

        const [result, err] = await inlineErr(produceResult);
        this.prevState = this.getStateData();

        this.isUpdating = false;
        if (err) {
            this.error = err;
            this.runSubscribers();
            throw err;
        } else {
            this.state = result!;
            this.runSubscribers();
        }
    }

    clearError() {
        this.prevState = this.getStateData();
        this.error = undefined;
        this.runSubscribers();
    }

    subscribe(subscription: Subscription<T>): () => Boolean {
        this.subscriptions.push(subscription);
        subscription(this.prevState, this.getStateData());
        return () => this.unsubscribe(subscription);
    }

    runSubscribers() {
        this.subscriptions.forEach(it => it(this.prevState, this.getStateData()));
    }

    unsubscribe(subscription: Subscription): Boolean {
        const indexFound = this.subscriptions.indexOf(subscription);
        const deletedItem = this.subscriptions.splice(indexFound, 1);
        return Boolean(deletedItem);
    }
}

export const stateLoggerInjector = (logName: string, state: State<any>) => {
    console.log(stateLoggerInjector.name, "Started");

    state.subscribe(() => {
        console.groupCollapsed(`State ${logName}`);
        console.log("data:", state.getState());
        console.log("updating:", state.isUpdating);
        console.log("error:", state.error);
        console.groupEnd();
    })
}