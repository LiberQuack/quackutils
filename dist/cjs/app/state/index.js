var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "immer", "../../_/inline-error"], function (require, exports, immer_1, inline_error_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.stateLoggerInjector = exports.State = void 0;
    immer_1 = __importDefault(immer_1);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBwL3N0YXRlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0lBZUEsTUFBYSxLQUFLO1FBZWM7UUFicEIsS0FBSyxDQUFJO1FBQ1QsU0FBUyxDQUE0QjtRQUVyQyxhQUFhLEdBQXNCLEVBQUUsQ0FBQztRQUM3QixZQUFZLENBQUk7UUFDekIsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUNiLEtBQUssR0FBbUIsRUFBRSxDQUFDO1FBRTVCLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsS0FBSyxDQUFNO1FBRVYsTUFBTSxDQUFDLFNBQVMsR0FBaUIsRUFBRSxDQUFBO1FBRTNDLFlBQTRCLEVBQVUsRUFBRSxLQUFRLEVBQUUsSUFBeUM7WUFBL0QsT0FBRSxHQUFGLEVBQUUsQ0FBUTtZQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUMxQixJQUFJLENBQUMsSUFBSSxFQUFFLHVCQUF1QixFQUFFO2dCQUNoQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUM5QjtRQUNMLENBQUM7UUFFRCxNQUFNLENBQUMsWUFBWTtZQUNmLE9BQU8sS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUMzQixDQUFDO1FBRUQsUUFBUTtZQUNKLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQTtRQUNyQixDQUFDO1FBRU8sWUFBWTtZQUNoQixPQUFPO2dCQUNILEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztnQkFDakIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2dCQUNqQixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7YUFDOUIsQ0FBQTtRQUNMLENBQUM7UUFFRCxVQUFVO1lBQ04sSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDckMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUMxQixDQUFDO1FBRUQsZUFBZTtZQUNYLE9BQU8sSUFBSSxDQUFDLFlBQStCLENBQUM7UUFDaEQsQ0FBQztRQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQW9CRztRQUNILFdBQVc7WUFDUCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNyQixDQUFDO1FBRUQ7OztXQUdHO1FBQ0gsS0FBSyxDQUFDLGNBQWMsQ0FBQyxXQUF3QjtZQUN6QyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBRWhCLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1lBRWxCLElBQUksV0FBVyxFQUFFO2dCQUNiLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUNsQztZQUVELEtBQUssSUFBSSxZQUFZLElBQUksS0FBSyxFQUFFO2dCQUM1QixnRUFBZ0U7Z0JBQ2hFLG1EQUFtRDtnQkFDbkQsOEVBQThFO2dCQUM5RSxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDbkM7UUFDTCxDQUFDO1FBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFtQixFQUFFLElBQVM7WUFDdkMsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNYLE9BQU8sSUFBSSxPQUFPLENBQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7b0JBQ3pDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTt3QkFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNyRCxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDLENBQUMsQ0FBQTthQUNMO1lBRUQsTUFBTSxhQUFhLEdBQUcsSUFBQSxlQUFPLEVBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFjLENBQUMsQ0FBQztZQUUxRCxJQUFJLGFBQWEsWUFBWSxPQUFPLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUNyQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztnQkFDdkIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQ3pCO1lBRUQsTUFBTSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxNQUFNLElBQUEsd0JBQVMsRUFBQyxhQUFhLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUVyQyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztZQUN4QixJQUFJLEdBQUcsRUFBRTtnQkFDTCxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztnQkFDakIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN0QixNQUFNLEdBQUcsQ0FBQzthQUNiO2lCQUFNO2dCQUNILElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTyxDQUFDO2dCQUNyQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7YUFDekI7UUFDTCxDQUFDO1FBRUQsVUFBVTtZQUNOLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUMxQixDQUFDO1FBRUQsU0FBUyxDQUFDLFlBQTZCO1lBQ25DLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3RDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1lBQ2xELE9BQU8sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNoRCxDQUFDO1FBRUQsY0FBYztZQUNWLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM5RSxDQUFDO1FBRUQsV0FBVyxDQUFDLFlBQTBCO1lBQ2xDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzVELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM3RCxPQUFPLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNoQyxDQUFDOztJQW5KTCxzQkFvSkM7SUFFTSxNQUFNLG1CQUFtQixHQUFHLENBQUMsT0FBZSxFQUFFLEtBQWlCLEVBQUUsRUFBRTtRQUN0RSxPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUFtQixDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUVqRCxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNqQixPQUFPLENBQUMsY0FBYyxDQUFDLFNBQVMsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25DLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUMsQ0FBQTtJQVZZLFFBQUEsbUJBQW1CLHVCQVUvQiJ9