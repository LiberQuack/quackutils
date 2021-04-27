import produce from "immer";
import {inlineErr} from "./inline-error";

type Subscription = () => void;

export class State<T extends { [x: string]: any }> {

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

        if (result) {
            this.state = result;
        }

        this.error = err;
        this.isUpdating = false;
        this.runSubscribers();

        if (err) {
            throw err;
        }
    }

    subscribe(subscription: Subscription): () => Boolean {
        this.subscriptions.push(subscription);
        subscription();
        return () => this.unsub(subscription);
    }

    runSubscribers() {
        this.subscriptions.forEach(it => it());
    }

    unsub(subscription: Subscription): Boolean {
        const indexFound = this.subscriptions.indexOf(subscription);
        const deletedItem = this.subscriptions.splice(indexFound, 1);
        return Boolean(deletedItem);
    }
}