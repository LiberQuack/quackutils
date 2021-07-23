import produce, {Draft} from "immer";
import {inlineErr} from "./inline-error";
import {Dictionary} from "./types";
import {DeepReadonly} from "utility-types";

type Subscription = () => void;

export class State<T extends Dictionary<any>> {

    private state: DeepReadonly<T>;
    private subscriptions: Subscription[] = [];
    private readonly initialState: T;

    public isUpdating = false;
    public error: any;

    constructor(
        public readonly id: string,
        state: T
    ) {
        this.state = state as DeepReadonly<T>;
        this.initialState = state;
    }

    getState(): DeepReadonly<T> {
        return this.state
    }

    getInitialState(): T {
        return this.initialState;
    }

    async update(updater: (() => T | Promise<T>) | ((draftState: T) => void | Promise<void>)) {
        const produceResult = produce(this.state, updater as any);

        if (produceResult instanceof Promise) {
            this.isUpdating = true;
            this.runSubscribers();
        }

        const [result, err] = await inlineErr(produceResult);
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
        this.error = undefined;
        this.runSubscribers();
    }

    subscribe(subscription: Subscription): () => Boolean {
        this.subscriptions.push(subscription);
        subscription();
        return () => this.unsubscribe(subscription);
    }

    runSubscribers() {
        this.subscriptions.forEach(it => it());
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