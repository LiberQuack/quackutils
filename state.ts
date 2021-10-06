import produce from "immer";
import {inlineErr} from "./inline-error";
import {Dictionary} from "./types";
import {DeepReadonly} from "utility-types";

type Subscription = () => void;

type Updater<T extends Dictionary<any>> = (() => T | Promise<T>) | ((draftState: T) => void | Promise<void>);

export class State<T extends Dictionary<any>> {

    private state: T;
    private subscriptions: Subscription[] = [];
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

    resetState() {
        this.state = {...this.initialState};
        this.runSubscribers();
    }

    getInitialState(): T {
        return this.initialState;
    }

    holdUpdates(): void {
        this.hold = true;
    }

    async releaseUpdates(updater: Updater<T>): Promise<void> {
        const queue = this.queue;
        this.queue = [];

        this.hold = false;
        await this.update(updater);

        for (let queueElement of queue) {
            await this.update(queueElement);
        }
    }

    async update(updater: Updater<T>): Promise<void> {
        if (this.hold) {
            return new Promise<void>((resolve, reject) => {
                this.queue.push(() => {
                    this.update(updater).then(resolve).catch(reject);
                });
            })
        }

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