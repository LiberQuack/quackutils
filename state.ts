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

    constructor(state: T) {
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

        if (err) {
            this.error = err;
            this.isUpdating = false;
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