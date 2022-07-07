const $0f99d2a3bc244acf$export$bd89b0cf3447f70 = (useState, useEffect)=>function useGlue(externalState, logId) {
        const initialState = [
            externalState.getState(),
            {
                error: undefined,
                isUpdating: false
            }
        ];
        const [state, setState] = useState(initialState);
        useEffect(()=>{
            if (logId) console.log(`${logId}:`, `State ${externalState.id} is being glued`);
            const subscription = ()=>{
                const selection = externalState.getState();
                const selectorResult = [
                    selection,
                    {
                        error: externalState.error,
                        isUpdating: externalState.isUpdating
                    }
                ];
                if (logId) console.log(`${logId}:`, `State ${externalState.id} is updating the element`);
                setState(selectorResult);
            //TODO: Maybe it's good to do a hacky workaround of changing above declaration to: let [state, setState]
            //      and add here bellow: state = selectorResult
            //      It seems that during the element rendering, setState didn't trigger a new render when this callback ran synchronously
            };
            externalState.subscribe(subscription);
            return ()=>{
                if (logId) console.log(`${logId}:`, `Disconnecting from state ${externalState.id}`);
                externalState.unsubscribe(subscription);
            };
        }, []);
        return state;
    };


let $3b7604ddd556a79a$export$97aac956da55dae9;
let $3b7604ddd556a79a$var$currentId = 0;
function $3b7604ddd556a79a$export$5f80f094fd31fffd(state) {
    $3b7604ddd556a79a$export$97aac956da55dae9 = state;
}
function $3b7604ddd556a79a$export$42ffd38884aecdac() {
    $3b7604ddd556a79a$export$97aac956da55dae9 = null;
    $3b7604ddd556a79a$var$currentId = 0;
}
function $3b7604ddd556a79a$export$5e14cdade93d6f7b() {
    return $3b7604ddd556a79a$var$currentId++;
}


const $1e64966b90d2a6b4$export$225ab0e0febd92b1 = Symbol("haunted.phase");
const $1e64966b90d2a6b4$export$819a7f3d5f1d869d = Symbol("haunted.hook");
const $1e64966b90d2a6b4$export$e3a0ce117547085d = Symbol("haunted.update");
const $1e64966b90d2a6b4$export$c3840c26fe093fdb = Symbol("haunted.commit");
const $1e64966b90d2a6b4$export$8e8d58c9b17fea3e = Symbol("haunted.effects");
const $1e64966b90d2a6b4$export$db08efd2f456c5bf = Symbol("haunted.layoutEffects");
const $1e64966b90d2a6b4$export$c1645e5fb9a50701 = "haunted.context";


class $0f8e12b50e76a011$export$7254cc27399e90bd {
    update;
    host;
    virtual;
    [(0, $1e64966b90d2a6b4$export$819a7f3d5f1d869d)];
    [(0, $1e64966b90d2a6b4$export$8e8d58c9b17fea3e)];
    [(0, $1e64966b90d2a6b4$export$db08efd2f456c5bf)];
    constructor(update, host){
        this.update = update;
        this.host = host;
        this[0, $1e64966b90d2a6b4$export$819a7f3d5f1d869d] = new Map();
        this[0, $1e64966b90d2a6b4$export$8e8d58c9b17fea3e] = [];
        this[0, $1e64966b90d2a6b4$export$db08efd2f456c5bf] = [];
    }
    run(cb) {
        (0, $3b7604ddd556a79a$export$5f80f094fd31fffd)(this);
        let res = cb();
        (0, $3b7604ddd556a79a$export$42ffd38884aecdac)();
        return res;
    }
    _runEffects(phase) {
        let effects = this[phase];
        (0, $3b7604ddd556a79a$export$5f80f094fd31fffd)(this);
        for (let effect of effects)effect.call(this);
        (0, $3b7604ddd556a79a$export$42ffd38884aecdac)();
    }
    runEffects() {
        this._runEffects((0, $1e64966b90d2a6b4$export$8e8d58c9b17fea3e));
    }
    runLayoutEffects() {
        this._runEffects((0, $1e64966b90d2a6b4$export$db08efd2f456c5bf));
    }
    teardown() {
        let hooks = this[0, $1e64966b90d2a6b4$export$819a7f3d5f1d869d];
        hooks.forEach((hook)=>{
            if (typeof hook.teardown === "function") hook.teardown();
        });
    }
}



const $b42353a0b89f35a7$var$defer = Promise.resolve().then.bind(Promise.resolve());
function $b42353a0b89f35a7$var$runner() {
    let tasks = [];
    let id;
    function runTasks() {
        id = null;
        let t = tasks;
        tasks = [];
        for(var i = 0, len = t.length; i < len; i++)t[i]();
    }
    return function(task) {
        tasks.push(task);
        if (id == null) id = $b42353a0b89f35a7$var$defer(runTasks);
    };
}
const $b42353a0b89f35a7$var$read = $b42353a0b89f35a7$var$runner();
const $b42353a0b89f35a7$var$write = $b42353a0b89f35a7$var$runner();
class $b42353a0b89f35a7$export$61cd7faa6f3316a3 {
    renderer;
    host;
    state;
    [(0, $1e64966b90d2a6b4$export$225ab0e0febd92b1)];
    _updateQueued;
    constructor(renderer, host){
        this.renderer = renderer;
        this.host = host;
        this.state = new (0, $0f8e12b50e76a011$export$7254cc27399e90bd)(this.update.bind(this), host);
        this[0, $1e64966b90d2a6b4$export$225ab0e0febd92b1] = null;
        this._updateQueued = false;
    }
    update() {
        if (this._updateQueued) return;
        $b42353a0b89f35a7$var$read(()=>{
            let result = this.handlePhase((0, $1e64966b90d2a6b4$export$e3a0ce117547085d));
            $b42353a0b89f35a7$var$write(()=>{
                this.handlePhase((0, $1e64966b90d2a6b4$export$c3840c26fe093fdb), result);
                $b42353a0b89f35a7$var$write(()=>{
                    this.handlePhase((0, $1e64966b90d2a6b4$export$8e8d58c9b17fea3e));
                });
            });
            this._updateQueued = false;
        });
        this._updateQueued = true;
    }
    handlePhase(phase, arg) {
        this[0, $1e64966b90d2a6b4$export$225ab0e0febd92b1] = phase;
        switch(phase){
            case 0, $1e64966b90d2a6b4$export$c3840c26fe093fdb:
                this.commit(arg);
                this.runEffects((0, $1e64966b90d2a6b4$export$db08efd2f456c5bf));
                return;
            case 0, $1e64966b90d2a6b4$export$e3a0ce117547085d:
                return this.render();
            case 0, $1e64966b90d2a6b4$export$8e8d58c9b17fea3e:
                return this.runEffects((0, $1e64966b90d2a6b4$export$8e8d58c9b17fea3e));
        }
    }
    render() {
        return this.state.run(()=>this.renderer.call(this.host, this.host));
    }
    runEffects(phase) {
        this.state._runEffects(phase);
    }
    teardown() {
        this.state.teardown();
    }
}


const $58484142ef1f39b3$var$toCamelCase = (val = "")=>val.replace(/-+([a-z])?/g, (_, char)=>char ? char.toUpperCase() : "");
function $58484142ef1f39b3$export$3bc26eec1cc2439f(render) {
    class Scheduler extends (0, $b42353a0b89f35a7$export$61cd7faa6f3316a3) {
        frag;
        constructor(renderer, frag, host){
            super(renderer, host || frag);
            this.frag = frag;
        }
        commit(result) {
            render(result, this.frag);
        }
    }
    function component(renderer, baseElementOrOptions, options) {
        const BaseElement = (options || baseElementOrOptions || {}).baseElement || HTMLElement;
        const { observedAttributes: observedAttributes = [] , useShadowDOM: useShadowDOM = true , shadowRootInit: shadowRootInit = {}  } = options || baseElementOrOptions || {};
        class Element extends BaseElement {
            _scheduler;
            static get observedAttributes() {
                return renderer.observedAttributes || observedAttributes || [];
            }
            constructor(){
                super();
                if (useShadowDOM === false) this._scheduler = new Scheduler(renderer, this);
                else {
                    this.attachShadow({
                        mode: "open",
                        ...shadowRootInit
                    });
                    this._scheduler = new Scheduler(renderer, this.shadowRoot, this);
                }
            }
            connectedCallback() {
                this._scheduler.update();
            }
            disconnectedCallback() {
                this._scheduler.teardown();
            }
            attributeChangedCallback(name, oldValue, newValue) {
                if (oldValue === newValue) return;
                let val = newValue === "" ? true : newValue;
                Reflect.set(this, $58484142ef1f39b3$var$toCamelCase(name), val);
            }
        }
        function reflectiveProp(initialValue) {
            let value = initialValue;
            let isSetup = false;
            return Object.freeze({
                enumerable: true,
                configurable: true,
                get () {
                    return value;
                },
                set (newValue) {
                    // Avoid scheduling update when prop value hasn't changed
                    if (isSetup && value === newValue) return;
                    isSetup = true;
                    value = newValue;
                    if (this._scheduler) this._scheduler.update();
                }
            });
        }
        const proto = new Proxy(BaseElement.prototype, {
            getPrototypeOf (target) {
                return target;
            },
            set (target, key, value, receiver) {
                let desc;
                if (key in target) {
                    desc = Object.getOwnPropertyDescriptor(target, key);
                    if (desc && desc.set) {
                        desc.set.call(receiver, value);
                        return true;
                    }
                    Reflect.set(target, key, value, receiver);
                    return true;
                }
                if (typeof key === "symbol" || key[0] === "_") desc = {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: value
                };
                else desc = reflectiveProp(value);
                Object.defineProperty(receiver, key, desc);
                if (desc.set) desc.set.call(receiver, value);
                return true;
            }
        });
        Object.setPrototypeOf(Element.prototype, proto);
        return Element;
    }
    return component;
}





class $1aa7371e30cbacd9$export$e594a57fbda5c090 {
    id;
    state;
    constructor(id, state){
        this.id = id;
        this.state = state;
    }
}
function $1aa7371e30cbacd9$var$use(Hook1, ...args) {
    let id = (0, $3b7604ddd556a79a$export$5e14cdade93d6f7b)();
    let hooks = (0, $3b7604ddd556a79a$export$97aac956da55dae9)[0, $1e64966b90d2a6b4$export$819a7f3d5f1d869d];
    let hook1 = hooks.get(id);
    if (!hook1) {
        hook1 = new Hook1(id, (0, $3b7604ddd556a79a$export$97aac956da55dae9), ...args);
        hooks.set(id, hook1);
    }
    return hook1.update(...args);
}
function $1aa7371e30cbacd9$export$1062a250c78723ea(Hook2) {
    return $1aa7371e30cbacd9$var$use.bind(null, Hook2);
}





function $3a5ebc238444ffbd$export$7ea7134f704deda4(setEffects) {
    return (0, $1aa7371e30cbacd9$export$1062a250c78723ea)(class extends (0, $1aa7371e30cbacd9$export$e594a57fbda5c090) {
        callback;
        lastValues;
        values;
        _teardown;
        constructor(id, state, ignored1, ignored2){
            super(id, state);
            setEffects(state, this);
        }
        update(callback, values) {
            this.callback = callback;
            this.values = values;
        }
        call() {
            if (!this.values || this.hasChanged()) this.run();
            this.lastValues = this.values;
        }
        run() {
            this.teardown();
            this._teardown = this.callback.call(this.state);
        }
        teardown() {
            if (typeof this._teardown === "function") this._teardown();
        }
        hasChanged() {
            return !this.lastValues || this.values.some((value, i)=>this.lastValues[i] !== value);
        }
    });
}


function $9646d553a21536fa$export$2ff5f1970029d8ea(state, cb) {
    state[0, $1e64966b90d2a6b4$export$8e8d58c9b17fea3e].push(cb);
}
/**
 * @function
 * @param {() => void} effect - callback function that runs each time dependencies change
 * @param {unknown[]} [dependencies] - list of dependencies to the effect
 * @return {void}
 */ const $9646d553a21536fa$export$6d9c69b0de29b591 = (0, $3a5ebc238444ffbd$export$7ea7134f704deda4)($9646d553a21536fa$export$2ff5f1970029d8ea);


/**
 * @function
 * @template T
 * @param    {Context<T>} context
 * @return   {T}
 */ const $8f00e81d889bb7ca$export$fae74005e78b1a27 = (0, $1aa7371e30cbacd9$export$1062a250c78723ea)(class extends (0, $1aa7371e30cbacd9$export$e594a57fbda5c090) {
    Context;
    value;
    _ranEffect;
    _unsubscribe;
    constructor(id, state, _){
        super(id, state);
        this._updater = this._updater.bind(this);
        this._ranEffect = false;
        this._unsubscribe = null;
        (0, $9646d553a21536fa$export$2ff5f1970029d8ea)(state, this);
    }
    update(Context) {
        if (this.state.virtual) throw new Error("can't be used with virtual components");
        if (this.Context !== Context) {
            this._subscribe(Context);
            this.Context = Context;
        }
        return this.value;
    }
    call() {
        if (!this._ranEffect) {
            this._ranEffect = true;
            if (this._unsubscribe) this._unsubscribe();
            this._subscribe(this.Context);
            this.state.update();
        }
    }
    _updater(value) {
        this.value = value;
        this.state.update();
    }
    _subscribe(Context) {
        const detail = {
            Context: Context,
            callback: this._updater
        };
        this.state.host.dispatchEvent(new CustomEvent((0, $1e64966b90d2a6b4$export$c1645e5fb9a50701), {
            detail: detail,
            bubbles: true,
            cancelable: true,
            composed: true
        }));
        const { unsubscribe: unsubscribe = null , value: value  } = detail;
        this.value = unsubscribe ? value : Context.defaultValue;
        this._unsubscribe = unsubscribe;
    }
    teardown() {
        if (this._unsubscribe) this._unsubscribe();
    }
});


function $87f4d97a66304bd6$export$2d2e2a019c76af3(component) {
    return (defaultValue)=>{
        const Context = {
            Provider: class extends HTMLElement {
                listeners;
                _value;
                constructor(){
                    super();
                    this.listeners = new Set();
                    this.addEventListener((0, $1e64966b90d2a6b4$export$c1645e5fb9a50701), this);
                }
                disconnectedCallback() {
                    this.removeEventListener((0, $1e64966b90d2a6b4$export$c1645e5fb9a50701), this);
                }
                handleEvent(event) {
                    const { detail: detail  } = event;
                    if (detail.Context === Context) {
                        detail.value = this.value;
                        detail.unsubscribe = this.unsubscribe.bind(this, detail.callback);
                        this.listeners.add(detail.callback);
                        event.stopPropagation();
                    }
                }
                unsubscribe(callback) {
                    this.listeners.delete(callback);
                }
                set value(value) {
                    this._value = value;
                    for (let callback of this.listeners)callback(value);
                }
                get value() {
                    return this._value;
                }
            },
            Consumer: component(function({ render: render  }) {
                const context = (0, $8f00e81d889bb7ca$export$fae74005e78b1a27)(Context);
                return render(context);
            }),
            defaultValue: defaultValue
        };
        return Context;
    };
}



/**
 * @function
 * @template T
 * @param  {() => T} fn function to memoize
 * @param  {unknown[]} values dependencies to the memoized computation
 * @return {T} The next computed value
 */ const $662d4ca61df79cbb$export$1538c33de8887b59 = (0, $1aa7371e30cbacd9$export$1062a250c78723ea)(class extends (0, $1aa7371e30cbacd9$export$e594a57fbda5c090) {
    value;
    values;
    constructor(id, state, fn, values){
        super(id, state);
        this.value = fn();
        this.values = values;
    }
    update(fn, values) {
        if (this.hasChanged(values)) {
            this.values = values;
            this.value = fn();
        }
        return this.value;
    }
    hasChanged(values = []) {
        return values.some((value, i)=>this.values[i] !== value);
    }
});


/**
 * @function
 * @template {Function} T
 * @param    {T} fn - callback to memoize
 * @param    {unknown[]} inputs - dependencies to callback memoization
 * @return   {T}
 */ const $b1799dd458d59aec$export$35808ee640e87ca7 = (fn, inputs)=>(0, $662d4ca61df79cbb$export$1538c33de8887b59)(()=>fn, inputs);




function $e2995a0999640589$var$setLayoutEffects(state, cb) {
    state[0, $1e64966b90d2a6b4$export$db08efd2f456c5bf].push(cb);
}
/**
 * @function
 * @param  {Effect} callback effecting callback
 * @param  {unknown[]} [values] dependencies to the effect
 * @return {void}
 */ const $e2995a0999640589$export$e5c5a5f917a5871c = (0, $3a5ebc238444ffbd$export$7ea7134f704deda4)($e2995a0999640589$var$setLayoutEffects);



/**
 * @function
 * @template {*} T
 * @param {T} [initialState] - Optional initial state
 * @return {readonly [state: T, updaterFn: StateUpdater<T>]} stateTuple - Tuple of current state and state updater function
 */ const $1b665fc3e0e27e96$export$60241385465d0a34 = (0, $1aa7371e30cbacd9$export$1062a250c78723ea)(class extends (0, $1aa7371e30cbacd9$export$e594a57fbda5c090) {
    args;
    constructor(id, state, initialValue){
        super(id, state);
        this.updater = this.updater.bind(this);
        if (typeof initialValue === "function") initialValue = initialValue();
        this.makeArgs(initialValue);
    }
    update() {
        return this.args;
    }
    updater(value) {
        if (typeof value === "function") {
            const updaterFn = value;
            const [previousValue] = this.args;
            value = updaterFn(previousValue);
        }
        this.makeArgs(value);
        this.state.update();
    }
    makeArgs(value) {
        this.args = Object.freeze([
            value,
            this.updater
        ]);
    }
});


const $90e463f97fa51720$var$microtask = Promise.resolve();
/**
 * An implementation of ReactiveControllerHost that is driven by Haunted hooks
 * and `useController()`.
 */ class $90e463f97fa51720$var$HauntedControllerHost {
    count;
    kick;
    _controllers = [];
    _updatePending = true;
    _updateCompletePromise;
    _resolveUpdate;
    constructor(count, kick){
        this.count = count;
        this.kick = kick;
        this._updateCompletePromise = new Promise((res)=>{
            this._resolveUpdate = res;
        });
    }
    addController(controller) {
        this._controllers.push(controller);
    }
    removeController(controller) {
        // Note, if the indexOf is -1, the >>> will flip the sign which makes the
        // splice do nothing.
        this._controllers && this._controllers.splice(this._controllers.indexOf(controller) >>> 0, 1);
    }
    requestUpdate() {
        if (!this._updatePending) {
            this._updatePending = true;
            $90e463f97fa51720$var$microtask.then(()=>this.kick(this.count + 1));
        }
    }
    get updateComplete() {
        return this._updateCompletePromise;
    }
    connected() {
        this._controllers.forEach((c)=>c.hostConnected && c.hostConnected());
    }
    disconnected() {
        this._controllers.forEach((c)=>c.hostDisconnected && c.hostDisconnected());
    }
    update() {
        this._controllers.forEach((c)=>c.hostUpdate && c.hostUpdate());
    }
    updated() {
        this._updatePending = false;
        const resolve = this._resolveUpdate;
        // Create a new updateComplete Promise for the next update,
        // before resolving the current one.
        this._updateCompletePromise = new Promise((res)=>{
            this._resolveUpdate = res;
        });
        this._controllers.forEach((c)=>c.hostUpdated && c.hostUpdated());
        resolve(this._updatePending);
    }
}
function $90e463f97fa51720$export$e8c786024a2b0a79(createController) {
    const [count, kick] = (0, $1b665fc3e0e27e96$export$60241385465d0a34)(0);
    const [host1] = (0, $1b665fc3e0e27e96$export$60241385465d0a34)(()=>{
        const host = new $90e463f97fa51720$var$HauntedControllerHost(count, kick);
        const controller = createController(host);
        host.primaryController = controller;
        host.connected();
        return host;
    });
    // We use useLayoutEffect because we need updated() called synchronously
    // after rendering.
    (0, $e2995a0999640589$export$e5c5a5f917a5871c)(()=>host1.updated());
    // Returning a cleanup function simulates hostDisconnected timing. An empty
    // deps array tells Haunted to only call this once: on mount with the cleanup
    // called on unmount.
    (0, $e2995a0999640589$export$e5c5a5f917a5871c)(()=>()=>host1.disconnected(), []);
    host1.update();
    return host1.primaryController;
}






/**
 * Given a reducer function, initial state, and optional state initializer function, returns a tuple of state and dispatch function.
 * @function
 * @template S State
 * @template I Initial State
 * @template A Action
 * @param {Reducer<S, A>} reducer - reducer function to compute the next state given the previous state and the action
 * @param {I} initialState - the initial state of the reducer
 * @param {(init: I) => S} [init=undefined] - Optional initializer function, called on initialState if provided
 * @return {readonly [S, (action: A) => void]}
 */ const $df63287c8f4c355f$export$13e3392192263954 = (0, $1aa7371e30cbacd9$export$1062a250c78723ea)(class extends (0, $1aa7371e30cbacd9$export$e594a57fbda5c090) {
    reducer;
    currentState;
    constructor(id, state, _, initialState, init){
        super(id, state);
        this.dispatch = this.dispatch.bind(this);
        this.currentState = init !== undefined ? init(initialState) : initialState;
    }
    update(reducer) {
        this.reducer = reducer;
        return [
            this.currentState,
            this.dispatch
        ];
    }
    dispatch(action) {
        this.currentState = this.reducer(this.currentState, action);
        this.state.update();
    }
});





/**
 * @function
 * @template T
 * @param   {T} initialValue
 * @return  {{ current: T }} Ref
 */ const $00cafe5601451cd6$export$b8f5890fc79d6aca = (initialValue)=>(0, $662d4ca61df79cbb$export$1538c33de8887b59)(()=>({
            current: initialValue
        }), []);





function $aa34f5756b3f6c3c$export$2e2bcd8739ae039({ render: render  }) {
    const component = (0, $58484142ef1f39b3$export$3bc26eec1cc2439f)(render);
    const createContext = (0, $87f4d97a66304bd6$export$2d2e2a019c76af3)(component);
    return {
        component: component,
        createContext: createContext
    };
}


const $51dfcd4759804fa9$export$eed9a2a671845c2c = (0, $0f99d2a3bc244acf$export$bd89b0cf3447f70)((0, $1b665fc3e0e27e96$export$60241385465d0a34), (0, $9646d553a21536fa$export$6d9c69b0de29b591));




export {$51dfcd4759804fa9$export$eed9a2a671845c2c as useGlue};
//# sourceMappingURL=state-glue-haunted.js.map
