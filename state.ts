import produce from "immer";
import {inlineErr} from "./inline-error";
import {Dictionary} from "./types";

type Subscription = () => void;

export class State<T extends Dictionary<any>> {

    private state: T;
    private subscriptions: Subscription[] = [];
    private readonly initialState: T;

    public isUpdating = false;
    public error: any;

    constructor(
        public readonly id: string,
        state: T
    ) {
        this.state = state;
        this.initialState = state;
    }

    getState(): T {
        return this.state
    }

    getInitialState(): T {
        return this.initialState;
    }

    async update(updater: (draftState: T) => void | Promise<void>) {
        const produceResult = produce(this.state, updater);

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
            this.state = (result || {}) as T;
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

export const stateLoggerInjector = (name: string, state: State<any>) => {
    console.log(stateLoggerInjector.name, "Started");

    state.subscribe(() => {
        console.groupCollapsed(`State ${name} changed`);
        console.log("data:", state.getState());
        console.log("updating:", state.isUpdating);
        console.log("error:", state.error);
        console.groupEnd();
    })
}