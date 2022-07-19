import produce from "immer";
import { inlineErr } from "../../_/inline-error";
/**
 * State manager
 *
 * TODO: take care about async operations inside update method
 *  I need to test consistency, because appareantly the changes are made
 *  againt the initial draft (which makes sense), but if that's true,
 *  it means you can lose updates from parallel updates
 */
export class State {
    id;
    state;
    prevState;
    subscriptions = [];
    initialState;
    hold = false;
    queue = [];
    isUpdating = false;
    error;
    static instances = [];
    constructor(id, state, opts) {
        this.id = id;
        this.state = state;
        this.initialState = state;
        if (!opts?.preventInstanceTracking) {
            State.instances.push(this);
        }
    }
    static getInstances() {
        return State.instances;
    }
    getState() {
        return this.state;
    }
    getStateData() {
        return {
            state: this.state,
            error: this.error,
            isUpdating: this.isUpdating
        };
    }
    resetState() {
        this.prevState = this.getStateData();
        this.state = { ...this.initialState };
        this.runSubscribers();
    }
    getInitialState() {
        return this.initialState;
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
    holdUpdates() {
        this.hold = true;
    }
    /**
     * This method release all updates that were on hold, check `holdUpdate()` to learn more
     * @param priorUpdate Queued tasks will be run against the result of this param
     */
    async releaseUpdates(priorUpdate) {
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
    async update(updater, opts) {
        if (this.hold) {
            return new Promise((resolve, reject) => {
                this.queue.push(() => {
                    this.update(updater).then(resolve).catch(reject);
                });
            });
        }
        const produceResult = produce(this.state, updater);
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
        }
        else {
            this.state = result;
            this.runSubscribers();
        }
    }
    clearError() {
        this.prevState = this.getStateData();
        this.error = undefined;
        this.runSubscribers();
    }
    subscribe(subscription) {
        this.subscriptions.push(subscription);
        subscription(this.prevState, this.getStateData());
        return () => this.unsubscribe(subscription);
    }
    runSubscribers() {
        this.subscriptions.forEach(it => it(this.prevState, this.getStateData()));
    }
    unsubscribe(subscription) {
        const indexFound = this.subscriptions.indexOf(subscription);
        const deletedItem = this.subscriptions.splice(indexFound, 1);
        return Boolean(deletedItem);
    }
}
export const stateLoggerInjector = (logName, state) => {
    console.log(stateLoggerInjector.name, "Started");
    state.subscribe(() => {
        console.groupCollapsed(`State ${logName}`);
        console.log("data:", state.getState());
        console.log("updating:", state.isUpdating);
        console.log("error:", state.error);
        console.groupEnd();
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBwL3N0YXRlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sT0FBTyxNQUFNLE9BQU8sQ0FBQztBQUM1QixPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFjL0M7Ozs7Ozs7R0FPRztBQUNILE1BQU0sT0FBTyxLQUFLO0lBZWM7SUFicEIsS0FBSyxDQUFJO0lBQ1QsU0FBUyxDQUE0QjtJQUVyQyxhQUFhLEdBQXNCLEVBQUUsQ0FBQztJQUM3QixZQUFZLENBQUk7SUFDekIsSUFBSSxHQUFHLEtBQUssQ0FBQztJQUNiLEtBQUssR0FBbUIsRUFBRSxDQUFDO0lBRTVCLFVBQVUsR0FBRyxLQUFLLENBQUM7SUFDbkIsS0FBSyxDQUFNO0lBRVYsTUFBTSxDQUFDLFNBQVMsR0FBaUIsRUFBRSxDQUFBO0lBRTNDLFlBQTRCLEVBQVUsRUFBRSxLQUFRLEVBQUUsSUFBeUM7UUFBL0QsT0FBRSxHQUFGLEVBQUUsQ0FBUTtRQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsSUFBSSxFQUFFLHVCQUF1QixFQUFFO1lBQ2hDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzlCO0lBQ0wsQ0FBQztJQUVELE1BQU0sQ0FBQyxZQUFZO1FBQ2YsT0FBTyxLQUFLLENBQUMsU0FBUyxDQUFDO0lBQzNCLENBQUM7SUFFRCxRQUFRO1FBQ0osT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFBO0lBQ3JCLENBQUM7SUFFTyxZQUFZO1FBQ2hCLE9BQU87WUFDSCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLFVBQVUsRUFBRSxJQUFJLENBQUMs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