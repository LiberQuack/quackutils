import $leRCG$immer from "immer";

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $3339d7d8fc279603$exports = {};

$parcel$export($3339d7d8fc279603$exports, "State", () => $a08c88a429c4d4a7$export$7254cc27399e90bd);

async function $310fd7c0054db06b$export$19af69b8fa933a33(arg, preventLog) {
    try {
        return [
            await arg
        ];
    } catch (err) {
        if (!preventLog) console.error(err);
        return [
            undefined,
            err
        ];
    }
}


class $a08c88a429c4d4a7$export$7254cc27399e90bd {
    static instances = [];
    constructor(id, state, opts){
        this.id = id;
        this.subscriptions = [];
        this.hold = false;
        this.queue = [];
        this.isUpdating = false;
        this.state = state;
        this.initialState = state;
        if (!opts?.preventInstanceTracking) $a08c88a429c4d4a7$export$7254cc27399e90bd.instances.push(this);
    }
    static getInstances() {
        return $a08c88a429c4d4a7$export$7254cc27399e90bd.instances;
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
        this.state = {
            ...this.initialState
        };
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
     */ holdUpdates() {
        this.hold = true;
    }
    /**
     * This method release all updates that were on hold, check `holdUpdate()` to learn more
     * @param priorUpdate Queued tasks will be run against the result of this param
     */ async releaseUpdates(priorUpdate) {
        const queue = this.queue;
        this.queue = [];
        this.hold = false;
        if (priorUpdate) await this.update(priorUpdate);
        for (let queueElement of queue)//Each loop will trigger this state subscriber, it's intentional
        //if one of the update takes too long as it's async
        //we want the respective subscribers listen to the changes as soon as possible
        await this.update(queueElement);
    }
    async update(updater, opts) {
        if (this.hold) return new Promise((resolve, reject)=>{
            this.queue.push(()=>{
                this.update(updater).then(resolve).catch(reject);
            });
        });
        const produceResult = (0, $leRCG$immer)(this.state, updater);
        if (produceResult instanceof Promise) {
            this.prevState = this.getStateData();
            this.isUpdating = true;
            this.runSubscribers();
        }
        const [result, err] = await (0, $310fd7c0054db06b$export$19af69b8fa933a33)(produceResult);
        this.prevState = this.getStateData();
        this.isUpdating = false;
        if (err) {
            this.error = err;
            this.runSubscribers();
            throw err;
        } else {
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
        return ()=>this.unsubscribe(subscription);
    }
    runSubscribers() {
        this.subscriptions.forEach((it)=>it(this.prevState, this.getStateData()));
    }
    unsubscribe(subscription) {
        const indexFound = this.subscriptions.indexOf(subscription);
        const deletedItem = this.subscriptions.splice(indexFound, 1);
        return Boolean(deletedItem);
    }
}
const $a08c88a429c4d4a7$export$7fa6d73f36ba184f = (logName, state)=>{
    console.log($a08c88a429c4d4a7$export$7fa6d73f36ba184f.name, "Started");
    state.subscribe(()=>{
        console.groupCollapsed(`State ${logName}`);
        console.log("data:", state.getState());
        console.log("updating:", state.isUpdating);
        console.log("error:", state.error);
        console.groupEnd();
    });
};






export {$a08c88a429c4d4a7$export$7254cc27399e90bd as State};
//# sourceMappingURL=index.js.map
