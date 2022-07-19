var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "immer", "../../_/inline-error"], function (require, exports, immer_1, inline_error_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.stateLoggerInjector = exports.State = void 0;
    immer_1 = __importDefault(immer_1);
    /**
     * State manager
     *
     * TODO: take care about async operations inside update method
     *  I need to test consistency, because appareantly the changes are made
     *  againt the initial draft (which makes sense), but if that's true,
     *  it means you can lose updates from parallel updates
     */
    class State {
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
            const produceResult = (0, immer_1.default)(this.state, updater);
            if (produceResult instanceof Promise) {
                this.prevState = this.getStateData();
                this.isUpdating = true;
                this.runSubscribers();
            }
            const [result, err] = await (0, inline_error_1.inlineErr)(produceResult);
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
    exports.State = State;
    const stateLoggerInjector = (logName, state) => {
        console.log(exports.stateLoggerInjector.name, "Started");
        state.subscribe(() => {
            console.groupCollapsed(`State ${logName}`);
            console.log("data:", state.getState());
            console.log("updating:", state.isUpdating);
            console.log("error:", state.error);
            console.groupEnd();
        });
    };
    exports.stateLoggerInjector = stateLoggerInjector;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBwL3N0YXRlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0lBZUE7Ozs7Ozs7T0FPRztJQUNILE1BQWEsS0FBSztRQWVjO1FBYnBCLEtBQUssQ0FBSTtRQUNULFNBQVMsQ0FBNEI7UUFFckMsYUFBYSxHQUFzQixFQUFFLENBQUM7UUFDN0IsWUFBWSxDQUFJO1FBQ3pCLElBQUksR0FBRyxLQUFLLENBQUM7UUFDYixLQUFLLEdBQW1CLEVBQUUsQ0FBQztRQUU1QixVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLEtBQUssQ0FBTTtRQUVWLE1BQU0sQ0FBQyxTQUFTLEdBQWlCLEVBQUUsQ0FBQTtRQUUzQyxZQUE0QixFQUFVLEVBQUUsS0FBUSxFQUFFLElBQXlDO1lBQS9ELE9BQUUsR0FBRixFQUFFLENBQVE7WUFDbEMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDMUIsSUFBSSxDQUFDLElBQUksRUFBRSx1QkFBdUIsRUFBRTtnQkFDaEMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDOUI7UUFDTCxDQUFDO1FBRUQsTUFBTSxDQUFDLFlBQVk7WUFDZixPQUFPLEtBQUssQ0FBQyxTQUFTLENBQUM7UUFDM0IsQ0FBQztRQUVELFFBQVE7WUFDSixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUE7UUFDckIsQ0FBQztRQUVPLFlBQVk7WUFDaEIsT0FBTztnQkFDSCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0JBQ2pCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztnQkFDakIsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO2FBQzlCLENBQUE7UUFDTCxDQUFDO1FBRUQsVUFBVTtZQUNOLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxD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