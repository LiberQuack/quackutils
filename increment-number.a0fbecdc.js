function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var parcelRequire = $parcel$global["parcelRequire9622"];
parcelRequire.register("8QIvq", function(module, exports) {
parcelRequire("9PUIi");
parcelRequire("bOlJ4");
parcelRequire("kkdSm");
parcelRequire("blzaT");
parcelRequire("kw66b");

});
parcelRequire.register("9PUIi", function(module, exports) {
parcelRequire("7WcZB");
var $40NS7 = parcelRequire("40NS7");
parcelRequire("eC0rA");
var $04dGP = parcelRequire("04dGP");
var $cTUZO = parcelRequire("cTUZO");

var $2eXFe = parcelRequire("2eXFe");
const $846f300f582f0660$var$attributes = [
    "from",
    "to",
    "bezier",
    "seconds-duration",
    "max-decimals",
    "min-decimals",
    "once"
];
const $846f300f582f0660$export$b2b8b837786478cd = function({ from: from , to: to , bezier: bezier , secondsDuration: secondsDuration , maxDecimals: maxDecimals , minDecimals: minDecimals , once: once  }) {
    const attr = {
        bezier: bezier ?? "1, 0, 1, 1",
        secondsDuration: secondsDuration ?? "2",
        maxDecimals: maxDecimals ?? "0",
        minDecimals: minDecimals ?? "0",
        from: from ?? "0",
        to: to
    };
    if (!attr.to) console.warn(this, "Expected input 'to'");
    const fromTimeRef = (0, $04dGP.useRef)(null);
    const bezierRef = (0, $04dGP.useRef)(null);
    const updateCurrentRef = (0, $04dGP.useRef)(null);
    (0, $cTUZO.useEffect)(()=>{
        const updateCurrent = ()=>{
            bezierRef.current = (0, (/*@__PURE__*/$parcel$interopDefault($2eXFe)))(...attr.bezier.split(","));
            fromTimeRef.current = Date.now();
            const fmt = new Intl.NumberFormat(undefined, {
                maximumFractionDigits: +attr.maxDecimals,
                minimumFractionDigits: +attr.minDecimals
            });
            const potato = ()=>{
                const duration = +attr.secondsDuration * 1000;
                const toTime = fromTimeRef.current + duration;
                const pointInLinearCurve = (duration - (toTime - Date.now())) / duration;
                const pointInBezier = bezierRef.current(pointInLinearCurve > 1 ? 1 : pointInLinearCurve < 0 ? 0 : pointInLinearCurve);
                const numberFrom = +attr.from;
                const numberTo = +attr.to;
                const diff = numberTo - numberFrom;
                const current = pointInBezier * diff + numberFrom;
                this.textContent = fmt.format(current);
                if (pointInBezier < 1) requestAnimationFrame(potato);
            };
            potato();
        };
        updateCurrentRef.current = updateCurrent;
    }, [
        from,
        to
    ]);
    (0, $cTUZO.useEffect)(()=>{
        const observerEnter = new IntersectionObserver((elms)=>{
            if (elms[0]?.isIntersecting) updateCurrentRef.current?.();
            if (elms[0]?.isIntersecting && once) observerEnter.disconnect();
        }, {
            threshold: 1
        });
        observerEnter.observe(this);
        if (once) return;
        const observerExit = new IntersectionObserver((elms)=>{
            if (!elms[0]?.isIntersecting) this.textContent = attr.from;
        });
        observerExit.observe(this);
    }, []);
};
customElements.define("increment-number", (0, $40NS7.component)($846f300f582f0660$export$b2b8b837786478cd, {
    useShadowDOM: false,
    observedAttributes: $846f300f582f0660$var$attributes
}));

});
parcelRequire.register("7WcZB", function(module, exports) {

$parcel$export(module.exports, "component", () => (parcelRequire("40NS7")).component);
$parcel$export(module.exports, "createContext", () => (parcelRequire("40NS7")).createContext);
$parcel$export(module.exports, "useMemo", () => (parcelRequire("8LSTU")).useMemo);
parcelRequire("40NS7");
var $k6j4s = parcelRequire("k6j4s");
var $40NS7 = parcelRequire("40NS7");

var $eC0rA = parcelRequire("eC0rA");

var $eC0rA = parcelRequire("eC0rA");

});
parcelRequire.register("40NS7", function(module, exports) {

$parcel$export(module.exports, "component", () => $2ebdd90b8440b5f2$export$d8556a2a8f973135);
$parcel$export(module.exports, "createContext", () => $2ebdd90b8440b5f2$export$fd42f52fd3ae1109);

var $k6j4s = parcelRequire("k6j4s");

var $eC0rA = parcelRequire("eC0rA");

var $gwrSi = parcelRequire("gwrSi");
const { component: $2ebdd90b8440b5f2$export$d8556a2a8f973135 , createContext: $2ebdd90b8440b5f2$export$fd42f52fd3ae1109  } = (0, $eC0rA.default)({
    render: $k6j4s.render
});
const $2ebdd90b8440b5f2$export$e193c227f15db60d = (0, $gwrSi.makeVirtual)();

});
parcelRequire.register("eC0rA", function(module, exports) {

$parcel$export(module.exports, "default", () => $aa34f5756b3f6c3c$export$2e2bcd8739ae039);
$parcel$export(module.exports, "useEffect", () => (parcelRequire("cTUZO")).useEffect);
$parcel$export(module.exports, "useState", () => (parcelRequire("2lQDC")).useState);
$parcel$export(module.exports, "useMemo", () => (parcelRequire("8LSTU")).useMemo);
$parcel$export(module.exports, "useContext", () => (parcelRequire("chcG5")).useContext);
$parcel$export(module.exports, "useRef", () => (parcelRequire("04dGP")).useRef);

var $7zVj6 = parcelRequire("7zVj6");

var $bFGXJ = parcelRequire("bFGXJ");

var $feH7T = parcelRequire("feH7T");

var $crfXT = parcelRequire("crfXT");

var $cTUZO = parcelRequire("cTUZO");

var $jsbeZ = parcelRequire("jsbeZ");

var $2lQDC = parcelRequire("2lQDC");

var $jb5iR = parcelRequire("jb5iR");

var $8LSTU = parcelRequire("8LSTU");

var $chcG5 = parcelRequire("chcG5");

var $04dGP = parcelRequire("04dGP");

var $2hScI = parcelRequire("2hScI");

var $fsRXv = parcelRequire("fsRXv");

var $1kNwp = parcelRequire("1kNwp");
function $aa34f5756b3f6c3c$export$2e2bcd8739ae039({ render: render  }) {
    const component = (0, $7zVj6.makeComponent)(render);
    const createContext = (0, $bFGXJ.makeContext)(component);
    return {
        component: component,
        createContext: createContext
    };
}

});
parcelRequire.register("7zVj6", function(module, exports) {

$parcel$export(module.exports, "makeComponent", () => $58484142ef1f39b3$export$3bc26eec1cc2439f);

var $fsRXv = parcelRequire("fsRXv");
const $58484142ef1f39b3$var$toCamelCase = (val = "")=>val.replace(/-+([a-z])?/g, (_, char)=>char ? char.toUpperCase() : "");
function $58484142ef1f39b3$export$3bc26eec1cc2439f(render) {
    class Scheduler extends (0, $fsRXv.BaseScheduler) {
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

});
parcelRequire.register("fsRXv", function(module, exports) {

$parcel$export(module.exports, "BaseScheduler", () => $b42353a0b89f35a7$export$61cd7faa6f3316a3);

var $1kNwp = parcelRequire("1kNwp");

var $2BMpo = parcelRequire("2BMpo");
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
    [(0, $2BMpo.phaseSymbol)];
    _updateQueued;
    constructor(renderer, host){
        this.renderer = renderer;
        this.host = host;
        this.state = new (0, $1kNwp.State)(this.update.bind(this), host);
        this[0, $2BMpo.phaseSymbol] = null;
        this._updateQueued = false;
    }
    update() {
        if (this._updateQueued) return;
        $b42353a0b89f35a7$var$read(()=>{
            let result = this.handlePhase((0, $2BMpo.updateSymbol));
            $b42353a0b89f35a7$var$write(()=>{
                this.handlePhase((0, $2BMpo.commitSymbol), result);
                $b42353a0b89f35a7$var$write(()=>{
                    this.handlePhase((0, $2BMpo.effectsSymbol));
                });
            });
            this._updateQueued = false;
        });
        this._updateQueued = true;
    }
    handlePhase(phase, arg) {
        this[0, $2BMpo.phaseSymbol] = phase;
        switch(phase){
            case 0, $2BMpo.commitSymbol:
                this.commit(arg);
                this.runEffects((0, $2BMpo.layoutEffectsSymbol));
                return;
            case 0, $2BMpo.updateSymbol:
                return this.render();
            case 0, $2BMpo.effectsSymbol:
                return this.runEffects((0, $2BMpo.effectsSymbol));
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

});
parcelRequire.register("1kNwp", function(module, exports) {

$parcel$export(module.exports, "State", () => $0f8e12b50e76a011$export$7254cc27399e90bd);

var $56vAM = parcelRequire("56vAM");

var $2BMpo = parcelRequire("2BMpo");
class $0f8e12b50e76a011$export$7254cc27399e90bd {
    update;
    host;
    virtual;
    [(0, $2BMpo.hookSymbol)];
    [(0, $2BMpo.effectsSymbol)];
    [(0, $2BMpo.layoutEffectsSymbol)];
    constructor(update, host){
        this.update = update;
        this.host = host;
        this[0, $2BMpo.hookSymbol] = new Map();
        this[0, $2BMpo.effectsSymbol] = [];
        this[0, $2BMpo.layoutEffectsSymbol] = [];
    }
    run(cb) {
        (0, $56vAM.setCurrent)(this);
        let res = cb();
        (0, $56vAM.clear)();
        return res;
    }
    _runEffects(phase) {
        let effects = this[phase];
        (0, $56vAM.setCurrent)(this);
        for (let effect of effects)effect.call(this);
        (0, $56vAM.clear)();
    }
    runEffects() {
        this._runEffects((0, $2BMpo.effectsSymbol));
    }
    runLayoutEffects() {
        this._runEffects((0, $2BMpo.layoutEffectsSymbol));
    }
    teardown() {
        let hooks = this[0, $2BMpo.hookSymbol];
        hooks.forEach((hook)=>{
            if (typeof hook.teardown === "function") hook.teardown();
        });
    }
}

});
parcelRequire.register("56vAM", function(module, exports) {

$parcel$export(module.exports, "current", () => $3b7604ddd556a79a$export$97aac956da55dae9);
$parcel$export(module.exports, "setCurrent", () => $3b7604ddd556a79a$export$5f80f094fd31fffd);
$parcel$export(module.exports, "clear", () => $3b7604ddd556a79a$export$42ffd38884aecdac);
$parcel$export(module.exports, "notify", () => $3b7604ddd556a79a$export$5e14cdade93d6f7b);
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

});

parcelRequire.register("2BMpo", function(module, exports) {

$parcel$export(module.exports, "phaseSymbol", () => $1e64966b90d2a6b4$export$225ab0e0febd92b1);
$parcel$export(module.exports, "hookSymbol", () => $1e64966b90d2a6b4$export$819a7f3d5f1d869d);
$parcel$export(module.exports, "updateSymbol", () => $1e64966b90d2a6b4$export$e3a0ce117547085d);
$parcel$export(module.exports, "commitSymbol", () => $1e64966b90d2a6b4$export$c3840c26fe093fdb);
$parcel$export(module.exports, "effectsSymbol", () => $1e64966b90d2a6b4$export$8e8d58c9b17fea3e);
$parcel$export(module.exports, "layoutEffectsSymbol", () => $1e64966b90d2a6b4$export$db08efd2f456c5bf);
$parcel$export(module.exports, "contextEvent", () => $1e64966b90d2a6b4$export$c1645e5fb9a50701);
const $1e64966b90d2a6b4$export$225ab0e0febd92b1 = Symbol("haunted.phase");
const $1e64966b90d2a6b4$export$819a7f3d5f1d869d = Symbol("haunted.hook");
const $1e64966b90d2a6b4$export$e3a0ce117547085d = Symbol("haunted.update");
const $1e64966b90d2a6b4$export$c3840c26fe093fdb = Symbol("haunted.commit");
const $1e64966b90d2a6b4$export$8e8d58c9b17fea3e = Symbol("haunted.effects");
const $1e64966b90d2a6b4$export$db08efd2f456c5bf = Symbol("haunted.layoutEffects");
const $1e64966b90d2a6b4$export$c1645e5fb9a50701 = "haunted.context";

});




parcelRequire.register("bFGXJ", function(module, exports) {

$parcel$export(module.exports, "makeContext", () => $87f4d97a66304bd6$export$2d2e2a019c76af3);

var $2BMpo = parcelRequire("2BMpo");

var $chcG5 = parcelRequire("chcG5");
function $87f4d97a66304bd6$export$2d2e2a019c76af3(component) {
    return (defaultValue)=>{
        const Context = {
            Provider: class extends HTMLElement {
                listeners;
                _value;
                constructor(){
                    super();
                    this.listeners = new Set();
                    this.addEventListener((0, $2BMpo.contextEvent), this);
                }
                disconnectedCallback() {
                    this.removeEventListener((0, $2BMpo.contextEvent), this);
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
                const context = (0, $chcG5.useContext)(Context);
                return render(context);
            }),
            defaultValue: defaultValue
        };
        return Context;
    };
}

});
parcelRequire.register("chcG5", function(module, exports) {

$parcel$export(module.exports, "useContext", () => $8f00e81d889bb7ca$export$fae74005e78b1a27);

var $2hScI = parcelRequire("2hScI");

var $2BMpo = parcelRequire("2BMpo");

var $cTUZO = parcelRequire("cTUZO");
/**
 * @function
 * @template T
 * @param    {Context<T>} context
 * @return   {T}
 */ const $8f00e81d889bb7ca$export$fae74005e78b1a27 = (0, $2hScI.hook)(class extends (0, $2hScI.Hook) {
    Context;
    value;
    _ranEffect;
    _unsubscribe;
    constructor(id, state, _){
        super(id, state);
        this._updater = this._updater.bind(this);
        this._ranEffect = false;
        this._unsubscribe = null;
        (0, $cTUZO.setEffects)(state, this);
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
        this.state.host.dispatchEvent(new CustomEvent((0, $2BMpo.contextEvent), {
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

});
parcelRequire.register("2hScI", function(module, exports) {

$parcel$export(module.exports, "Hook", () => $1aa7371e30cbacd9$export$e594a57fbda5c090);
$parcel$export(module.exports, "hook", () => $1aa7371e30cbacd9$export$1062a250c78723ea);

var $56vAM = parcelRequire("56vAM");

var $2BMpo = parcelRequire("2BMpo");
class $1aa7371e30cbacd9$export$e594a57fbda5c090 {
    id;
    state;
    constructor(id, state){
        this.id = id;
        this.state = state;
    }
}
function $1aa7371e30cbacd9$var$use(Hook1, ...args) {
    let id = (0, $56vAM.notify)();
    let hooks = (0, $56vAM.current)[0, $2BMpo.hookSymbol];
    let hook1 = hooks.get(id);
    if (!hook1) {
        hook1 = new Hook1(id, (0, $56vAM.current), ...args);
        hooks.set(id, hook1);
    }
    return hook1.update(...args);
}
function $1aa7371e30cbacd9$export$1062a250c78723ea(Hook2) {
    return $1aa7371e30cbacd9$var$use.bind(null, Hook2);
}

});

parcelRequire.register("cTUZO", function(module, exports) {

$parcel$export(module.exports, "setEffects", () => $9646d553a21536fa$export$2ff5f1970029d8ea);
$parcel$export(module.exports, "useEffect", () => $9646d553a21536fa$export$6d9c69b0de29b591);

var $2BMpo = parcelRequire("2BMpo");

var $50Hyd = parcelRequire("50Hyd");
function $9646d553a21536fa$export$2ff5f1970029d8ea(state, cb) {
    state[0, $2BMpo.effectsSymbol].push(cb);
}
/**
 * @function
 * @param {() => void} effect - callback function that runs each time dependencies change
 * @param {unknown[]} [dependencies] - list of dependencies to the effect
 * @return {void}
 */ const $9646d553a21536fa$export$6d9c69b0de29b591 = (0, $50Hyd.createEffect)($9646d553a21536fa$export$2ff5f1970029d8ea);

});
parcelRequire.register("50Hyd", function(module, exports) {

$parcel$export(module.exports, "createEffect", () => $3a5ebc238444ffbd$export$7ea7134f704deda4);

var $2hScI = parcelRequire("2hScI");
function $3a5ebc238444ffbd$export$7ea7134f704deda4(setEffects) {
    return (0, $2hScI.hook)(class extends (0, $2hScI.Hook) {
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

});




parcelRequire.register("feH7T", function(module, exports) {

var $8LSTU = parcelRequire("8LSTU");
/**
 * @function
 * @template {Function} T
 * @param    {T} fn - callback to memoize
 * @param    {unknown[]} inputs - dependencies to callback memoization
 * @return   {T}
 */ const $b1799dd458d59aec$export$35808ee640e87ca7 = (fn, inputs)=>(0, $8LSTU.useMemo)(()=>fn, inputs);

});
parcelRequire.register("8LSTU", function(module, exports) {

$parcel$export(module.exports, "useMemo", () => $662d4ca61df79cbb$export$1538c33de8887b59);

var $2hScI = parcelRequire("2hScI");
/**
 * @function
 * @template T
 * @param  {() => T} fn function to memoize
 * @param  {unknown[]} values dependencies to the memoized computation
 * @return {T} The next computed value
 */ const $662d4ca61df79cbb$export$1538c33de8887b59 = (0, $2hScI.hook)(class extends (0, $2hScI.Hook) {
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

});


parcelRequire.register("crfXT", function(module, exports) {

var $jsbeZ = parcelRequire("jsbeZ");

var $2lQDC = parcelRequire("2lQDC");
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
    const [count, kick] = (0, $2lQDC.useState)(0);
    const [host1] = (0, $2lQDC.useState)(()=>{
        const host = new $90e463f97fa51720$var$HauntedControllerHost(count, kick);
        const controller = createController(host);
        host.primaryController = controller;
        host.connected();
        return host;
    });
    // We use useLayoutEffect because we need updated() called synchronously
    // after rendering.
    (0, $jsbeZ.useLayoutEffect)(()=>host1.updated());
    // Returning a cleanup function simulates hostDisconnected timing. An empty
    // deps array tells Haunted to only call this once: on mount with the cleanup
    // called on unmount.
    (0, $jsbeZ.useLayoutEffect)(()=>()=>host1.disconnected(), []);
    host1.update();
    return host1.primaryController;
}

});
parcelRequire.register("jsbeZ", function(module, exports) {

$parcel$export(module.exports, "useLayoutEffect", () => $e2995a0999640589$export$e5c5a5f917a5871c);

var $2BMpo = parcelRequire("2BMpo");

var $50Hyd = parcelRequire("50Hyd");
function $e2995a0999640589$var$setLayoutEffects(state, cb) {
    state[0, $2BMpo.layoutEffectsSymbol].push(cb);
}
/**
 * @function
 * @param  {Effect} callback effecting callback
 * @param  {unknown[]} [values] dependencies to the effect
 * @return {void}
 */ const $e2995a0999640589$export$e5c5a5f917a5871c = (0, $50Hyd.createEffect)($e2995a0999640589$var$setLayoutEffects);

});

parcelRequire.register("2lQDC", function(module, exports) {

$parcel$export(module.exports, "useState", () => $1b665fc3e0e27e96$export$60241385465d0a34);

var $2hScI = parcelRequire("2hScI");
/**
 * @function
 * @template {*} T
 * @param {T} [initialState] - Optional initial state
 * @return {readonly [state: T, updaterFn: StateUpdater<T>]} stateTuple - Tuple of current state and state updater function
 */ const $1b665fc3e0e27e96$export$60241385465d0a34 = (0, $2hScI.hook)(class extends (0, $2hScI.Hook) {
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

});


parcelRequire.register("jb5iR", function(module, exports) {

var $2hScI = parcelRequire("2hScI");
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
 */ const $df63287c8f4c355f$export$13e3392192263954 = (0, $2hScI.hook)(class extends (0, $2hScI.Hook) {
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

});

parcelRequire.register("04dGP", function(module, exports) {

$parcel$export(module.exports, "useRef", () => $00cafe5601451cd6$export$b8f5890fc79d6aca);

var $8LSTU = parcelRequire("8LSTU");
/**
 * @function
 * @template T
 * @param   {T} initialValue
 * @return  {{ current: T }} Ref
 */ const $00cafe5601451cd6$export$b8f5890fc79d6aca = (initialValue)=>(0, $8LSTU.useMemo)(()=>({
            current: initialValue
        }), []);

});


parcelRequire.register("gwrSi", function(module, exports) {

$parcel$export(module.exports, "makeVirtual", () => $c07541dd0b82abf8$export$3b9595dc33c67676);
parcelRequire("eKhg5");
var $lDFsq = parcelRequire("lDFsq");

var $k6j4s = parcelRequire("k6j4s");
parcelRequire("2sTdO");
var $uHiQY = parcelRequire("uHiQY");

var $fsRXv = parcelRequire("fsRXv");
const $c07541dd0b82abf8$var$includes = Array.prototype.includes;
const $c07541dd0b82abf8$var$partToScheduler = new WeakMap();
const $c07541dd0b82abf8$var$schedulerToPart = new WeakMap();
class $c07541dd0b82abf8$var$Scheduler extends (0, $fsRXv.BaseScheduler) {
    args;
    setValue;
    constructor(renderer, part, setValue){
        super(renderer, part);
        this.state.virtual = true;
        this.setValue = setValue;
    }
    render() {
        return this.state.run(()=>this.renderer.apply(this.host, this.args));
    }
    commit(result) {
        this.setValue(result);
    }
    teardown() {
        super.teardown();
        let part = $c07541dd0b82abf8$var$schedulerToPart.get(this);
        $c07541dd0b82abf8$var$partToScheduler.delete(part);
    }
}
function $c07541dd0b82abf8$export$3b9595dc33c67676() {
    function virtual(renderer) {
        class VirtualDirective extends (0, $uHiQY.AsyncDirective) {
            cont;
            constructor(partInfo){
                super(partInfo);
                this.cont = undefined;
            }
            update(part, args) {
                this.cont = $c07541dd0b82abf8$var$partToScheduler.get(part);
                if (!this.cont || this.cont.renderer !== renderer) {
                    this.cont = new $c07541dd0b82abf8$var$Scheduler(renderer, part, (r)=>{
                        this.setValue(r);
                    });
                    $c07541dd0b82abf8$var$partToScheduler.set(part, this.cont);
                    $c07541dd0b82abf8$var$schedulerToPart.set(this.cont, part);
                    $c07541dd0b82abf8$var$teardownOnRemove(this.cont, part);
                }
                this.cont.args = args;
                this.cont.update();
                return this.render(args);
            }
            render(args) {
                return 0, $k6j4s.noChange;
            }
        }
        return (0, $lDFsq.directive)(VirtualDirective);
    }
    return virtual;
}
function $c07541dd0b82abf8$var$teardownOnRemove(cont, part, node = part.startNode) {
    let frag = node.parentNode;
    let mo = new MutationObserver((mutations)=>{
        for (let mutation of mutations){
            if ($c07541dd0b82abf8$var$includes.call(mutation.removedNodes, node)) {
                mo.disconnect();
                if (node.parentNode instanceof ShadowRoot) $c07541dd0b82abf8$var$teardownOnRemove(cont, part);
                else cont.teardown();
                break;
            } else if ($c07541dd0b82abf8$var$includes.call(mutation.addedNodes, node.nextSibling)) {
                mo.disconnect();
                $c07541dd0b82abf8$var$teardownOnRemove(cont, part, node.nextSibling || undefined);
                break;
            }
        }
    });
    mo.observe(frag, {
        childList: true
    });
}

});
parcelRequire.register("eKhg5", function(module, exports) {
$parcel$export(module.exports, "directive", () => (parcelRequire("lDFsq")).directive);
parcelRequire("lDFsq");

});
parcelRequire.register("lDFsq", function(module, exports) {

$parcel$export(module.exports, "PartType", () => $fc0d6613a4258156$export$9ba3b3f20a85bfa);
$parcel$export(module.exports, "directive", () => $fc0d6613a4258156$export$99b43ad1ed32e735);
$parcel$export(module.exports, "Directive", () => $fc0d6613a4258156$export$befdefbdce210f91);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const $fc0d6613a4258156$export$9ba3b3f20a85bfa = {
    ATTRIBUTE: 1,
    CHILD: 2,
    PROPERTY: 3,
    BOOLEAN_ATTRIBUTE: 4,
    EVENT: 5,
    ELEMENT: 6
}, $fc0d6613a4258156$export$99b43ad1ed32e735 = (t1)=>(...e1)=>({
            _$litDirective$: t1,
            values: e1
        });
class $fc0d6613a4258156$export$befdefbdce210f91 {
    constructor(t){}
    get _$AU() {
        return this._$AM._$AU;
    }
    _$AT(t2, e2, i1) {
        this._$Ct = t2, this._$AM = e2, this._$Ci = i1;
    }
    _$AS(t3, e3) {
        return this.update(t3, e3);
    }
    update(t, e4) {
        return this.render(...e4);
    }
}

});


parcelRequire.register("2sTdO", function(module, exports) {
$parcel$export(module.exports, "AsyncDirective", () => (parcelRequire("uHiQY")).AsyncDirective);
parcelRequire("uHiQY");

});
parcelRequire.register("uHiQY", function(module, exports) {

$parcel$export(module.exports, "AsyncDirective", () => $05c4648c2ce730ec$export$7d025501802325e);

var $9RPTx = parcelRequire("9RPTx");

var $lDFsq = parcelRequire("lDFsq");

var $lDFsq = parcelRequire("lDFsq");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const $05c4648c2ce730ec$var$e = (i2, t1)=>{
    var s1, o1;
    const n1 = i2._$AN;
    if (void 0 === n1) return !1;
    for (const i1 of n1)null === (o1 = (s1 = i1)._$AO) || void 0 === o1 || o1.call(s1, t1, !1), $05c4648c2ce730ec$var$e(i1, t1);
    return !0;
}, $05c4648c2ce730ec$var$o = (i3)=>{
    let t2, s2;
    do {
        if (void 0 === (t2 = i3._$AM)) break;
        s2 = t2._$AN, s2.delete(i3), i3 = t2;
    }while (0 === (null == s2 ? void 0 : s2.size));
}, $05c4648c2ce730ec$var$n = (i4)=>{
    for(let t3; t3 = i4._$AM; i4 = t3){
        let s3 = t3._$AN;
        if (void 0 === s3) t3._$AN = s3 = new Set;
        else if (s3.has(i4)) break;
        s3.add(i4), $05c4648c2ce730ec$var$l(t3);
    }
};
function $05c4648c2ce730ec$var$r(i5) {
    void 0 !== this._$AN ? ($05c4648c2ce730ec$var$o(this), this._$AM = i5, $05c4648c2ce730ec$var$n(this)) : this._$AM = i5;
}
function $05c4648c2ce730ec$var$h(i7, t4 = !1, s4 = 0) {
    const n2 = this._$AH, r1 = this._$AN;
    if (void 0 !== r1 && 0 !== r1.size) {
        if (t4) {
            if (Array.isArray(n2)) for(let i6 = s4; i6 < n2.length; i6++)$05c4648c2ce730ec$var$e(n2[i6], !1), $05c4648c2ce730ec$var$o(n2[i6]);
            else null != n2 && ($05c4648c2ce730ec$var$e(n2, !1), $05c4648c2ce730ec$var$o(n2));
        } else $05c4648c2ce730ec$var$e(this, i7);
    }
}
const $05c4648c2ce730ec$var$l = (i8)=>{
    var t5, e1, o2, n3;
    i8.type == (0, $lDFsq.PartType).CHILD && (null !== (t5 = (o2 = i8)._$AP) && void 0 !== t5 || (o2._$AP = $05c4648c2ce730ec$var$h), null !== (e1 = (n3 = i8)._$AQ) && void 0 !== e1 || (n3._$AQ = $05c4648c2ce730ec$var$r));
};
class $05c4648c2ce730ec$export$7d025501802325e extends (0, $lDFsq.Directive) {
    constructor(){
        super(...arguments), this._$AN = void 0;
    }
    _$AT(i9, t6, s5) {
        super._$AT(i9, t6, s5), $05c4648c2ce730ec$var$n(this), this.isConnected = i9._$AU;
    }
    _$AO(i10, t7 = !0) {
        var s6, n4;
        i10 !== this.isConnected && (this.isConnected = i10, i10 ? null === (s6 = this.reconnected) || void 0 === s6 || s6.call(this) : null === (n4 = this.disconnected) || void 0 === n4 || n4.call(this)), t7 && ($05c4648c2ce730ec$var$e(this, i10), $05c4648c2ce730ec$var$o(this));
    }
    setValue(t8) {
        if ((0, $9RPTx.isSingleExpression)(this._$Ct)) this._$Ct._$AI(t8, this);
        else {
            const i11 = [
                ...this._$Ct._$AH
            ];
            i11[this._$Ci] = t8, this._$Ct._$AI(i11, this, 0);
        }
    }
    disconnected() {}
    reconnected() {}
}

});
parcelRequire.register("9RPTx", function(module, exports) {

$parcel$export(module.exports, "isSingleExpression", () => $72f1517dd10a4292$export$7f431ad0fff82fd9);

var $b87GI = parcelRequire("b87GI");
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const { H: $72f1517dd10a4292$var$i  } = (0, $b87GI._$LH), $72f1517dd10a4292$export$c3825b437cbdea5c = (o1)=>null === o1 || "object" != typeof o1 && "function" != typeof o1, $72f1517dd10a4292$export$80c36ae3cab9881d = {
    HTML: 1,
    SVG: 2
}, $72f1517dd10a4292$export$6b6d145ec2a44ca9 = (o2, i1)=>{
    var t1, n1;
    return void 0 === i1 ? void 0 !== (null === (t1 = o2) || void 0 === t1 ? void 0 : t1._$litType$) : (null === (n1 = o2) || void 0 === n1 ? void 0 : n1._$litType$) === i1;
}, $72f1517dd10a4292$export$2f448fec17d50a3e = (o3)=>{
    var i2;
    return void 0 !== (null === (i2 = o3) || void 0 === i2 ? void 0 : i2._$litDirective$);
}, $72f1517dd10a4292$export$f28e31de6a6eaf32 = (o4)=>{
    var i3;
    return null === (i3 = o4) || void 0 === i3 ? void 0 : i3._$litDirective$;
}, $72f1517dd10a4292$export$7f431ad0fff82fd9 = (o5)=>void 0 === o5.strings, $72f1517dd10a4292$var$e = ()=>document.createComment(""), $72f1517dd10a4292$export$291b2338ad9b0b30 = (o6, t2, n2)=>{
    var v2;
    const l1 = o6._$AA.parentNode, d1 = void 0 === t2 ? o6._$AB : t2._$AA;
    if (void 0 === n2) {
        const t3 = l1.insertBefore($72f1517dd10a4292$var$e(), d1), v1 = l1.insertBefore($72f1517dd10a4292$var$e(), d1);
        n2 = new $72f1517dd10a4292$var$i(t3, v1, o6, o6.options);
    } else {
        const i5 = n2._$AB.nextSibling, t4 = n2._$AM, r1 = t4 !== o6;
        if (r1) {
            let i4;
            null === (v2 = n2._$AQ) || void 0 === v2 || v2.call(n2, o6), n2._$AM = o6, void 0 !== n2._$AP && (i4 = o6._$AU) !== t4._$AU && n2._$AP(i4);
        }
        if (i5 !== d1 || r1) {
            let o7 = n2._$AA;
            for(; o7 !== i5;){
                const i6 = o7.nextSibling;
                l1.insertBefore(o7, d1), o7 = i6;
            }
        }
    }
    return n2;
}, $72f1517dd10a4292$export$cb8bf9562088e9f4 = (o8, i7, t5 = o8)=>(o8._$AI(i7, t5), o8), $72f1517dd10a4292$var$f = {}, $72f1517dd10a4292$export$ea70d9dd5965b1c8 = (o9, i8 = $72f1517dd10a4292$var$f)=>o9._$AH = i8, $72f1517dd10a4292$export$59e9bce518cde500 = (o10)=>o10._$AH, $72f1517dd10a4292$export$3133b3144bbba267 = (o11)=>{
    var i9;
    null === (i9 = o11._$AP) || void 0 === i9 || i9.call(o11, !1, !0);
    let t6 = o11._$AA;
    const n3 = o11._$AB.nextSibling;
    for(; t6 !== n3;){
        const o12 = t6.nextSibling;
        t6.remove(), t6 = o12;
    }
}, $72f1517dd10a4292$export$7f600b8138c094dc = (o13)=>{
    o13._$AR();
};

});






parcelRequire.register("2eXFe", function(module, exports) {
/**
 * https://github.com/gre/bezier-easing
 * BezierEasing - use bezier curve for transition easing function
 * by Gaëtan Renaudeau 2014 - 2015 – MIT License
 */ // These values are established by empiricism with tests (tradeoff: performance VS precision)
var $1a1b2ba13679b156$var$NEWTON_ITERATIONS = 4;
var $1a1b2ba13679b156$var$NEWTON_MIN_SLOPE = 0.001;
var $1a1b2ba13679b156$var$SUBDIVISION_PRECISION = 0.0000001;
var $1a1b2ba13679b156$var$SUBDIVISION_MAX_ITERATIONS = 10;
var $1a1b2ba13679b156$var$kSplineTableSize = 11;
var $1a1b2ba13679b156$var$kSampleStepSize = 1.0 / ($1a1b2ba13679b156$var$kSplineTableSize - 1.0);
var $1a1b2ba13679b156$var$float32ArraySupported = typeof Float32Array === "function";
function $1a1b2ba13679b156$var$A(aA1, aA2) {
    return 1.0 - 3.0 * aA2 + 3.0 * aA1;
}
function $1a1b2ba13679b156$var$B(aA1, aA2) {
    return 3.0 * aA2 - 6.0 * aA1;
}
function $1a1b2ba13679b156$var$C(aA1) {
    return 3.0 * aA1;
}
// Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
function $1a1b2ba13679b156$var$calcBezier(aT, aA1, aA2) {
    return (($1a1b2ba13679b156$var$A(aA1, aA2) * aT + $1a1b2ba13679b156$var$B(aA1, aA2)) * aT + $1a1b2ba13679b156$var$C(aA1)) * aT;
}
// Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
function $1a1b2ba13679b156$var$getSlope(aT, aA1, aA2) {
    return 3.0 * $1a1b2ba13679b156$var$A(aA1, aA2) * aT * aT + 2.0 * $1a1b2ba13679b156$var$B(aA1, aA2) * aT + $1a1b2ba13679b156$var$C(aA1);
}
function $1a1b2ba13679b156$var$binarySubdivide(aX, aA, aB, mX1, mX2) {
    var currentX, currentT, i = 0;
    do {
        currentT = aA + (aB - aA) / 2.0;
        currentX = $1a1b2ba13679b156$var$calcBezier(currentT, mX1, mX2) - aX;
        if (currentX > 0.0) aB = currentT;
        else aA = currentT;
    }while (Math.abs(currentX) > $1a1b2ba13679b156$var$SUBDIVISION_PRECISION && ++i < $1a1b2ba13679b156$var$SUBDIVISION_MAX_ITERATIONS);
    return currentT;
}
function $1a1b2ba13679b156$var$newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
    for(var i = 0; i < $1a1b2ba13679b156$var$NEWTON_ITERATIONS; ++i){
        var currentSlope = $1a1b2ba13679b156$var$getSlope(aGuessT, mX1, mX2);
        if (currentSlope === 0.0) return aGuessT;
        var currentX = $1a1b2ba13679b156$var$calcBezier(aGuessT, mX1, mX2) - aX;
        aGuessT -= currentX / currentSlope;
    }
    return aGuessT;
}
function $1a1b2ba13679b156$var$LinearEasing(x) {
    return x;
}
module.exports = function bezier(mX1, mY1, mX2, mY2) {
    if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) throw new Error("bezier x values must be in [0, 1] range");
    if (mX1 === mY1 && mX2 === mY2) return $1a1b2ba13679b156$var$LinearEasing;
    // Precompute samples table
    var sampleValues = $1a1b2ba13679b156$var$float32ArraySupported ? new Float32Array($1a1b2ba13679b156$var$kSplineTableSize) : new Array($1a1b2ba13679b156$var$kSplineTableSize);
    for(var i = 0; i < $1a1b2ba13679b156$var$kSplineTableSize; ++i)sampleValues[i] = $1a1b2ba13679b156$var$calcBezier(i * $1a1b2ba13679b156$var$kSampleStepSize, mX1, mX2);
    function getTForX(aX) {
        var intervalStart = 0.0;
        var currentSample = 1;
        var lastSample = $1a1b2ba13679b156$var$kSplineTableSize - 1;
        for(; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample)intervalStart += $1a1b2ba13679b156$var$kSampleStepSize;
        --currentSample;
        // Interpolate to provide an initial guess for t
        var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
        var guessForT = intervalStart + dist * $1a1b2ba13679b156$var$kSampleStepSize;
        var initialSlope = $1a1b2ba13679b156$var$getSlope(guessForT, mX1, mX2);
        if (initialSlope >= $1a1b2ba13679b156$var$NEWTON_MIN_SLOPE) return $1a1b2ba13679b156$var$newtonRaphsonIterate(aX, guessForT, mX1, mX2);
        else if (initialSlope === 0.0) return guessForT;
        else return $1a1b2ba13679b156$var$binarySubdivide(aX, intervalStart, intervalStart + $1a1b2ba13679b156$var$kSampleStepSize, mX1, mX2);
    }
    return function BezierEasing(x) {
        // Because JavaScript number are imprecise, we should guarantee the extremes are right.
        if (x === 0) return 0;
        if (x === 1) return 1;
        return $1a1b2ba13679b156$var$calcBezier(getTForX(x), mY1, mY2);
    };
};

});


parcelRequire.register("bOlJ4", function(module, exports) {
parcelRequire("7WcZB");
var $8LSTU = parcelRequire("8LSTU");
var $40NS7 = parcelRequire("40NS7");

var $k6j4s = parcelRequire("k6j4s");
parcelRequire("eC0rA");
var $2lQDC = parcelRequire("2lQDC");
var $cTUZO = parcelRequire("cTUZO");
const $c5e61645c02f04e0$var$second = 1000;
const $c5e61645c02f04e0$var$minute = $c5e61645c02f04e0$var$second * 60;
const $c5e61645c02f04e0$var$hour = $c5e61645c02f04e0$var$minute * 60;
const $c5e61645c02f04e0$var$day = $c5e61645c02f04e0$var$hour * 24;
const $c5e61645c02f04e0$export$94bb59f6876a36f = ({ targetDate: targetDate  })=>{
    const initialDiff = (0, $8LSTU.useMemo)(()=>targetDate && $c5e61645c02f04e0$var$fmtTime($c5e61645c02f04e0$var$calcTimeDiff(targetDate)), []);
    const [time, setTime] = (0, $2lQDC.useState)(initialDiff || "00:00:00");
    const [lastInterval, setLastInterval] = (0, $2lQDC.useState)(0);
    const [hours, minutes, seconds] = time.split(":");
    (0, $cTUZO.useEffect)(()=>{
        window.clearInterval(lastInterval);
        setInterval(()=>{
            if (targetDate) setTime($c5e61645c02f04e0$var$fmtTime($c5e61645c02f04e0$var$calcTimeDiff(targetDate)));
        }, 1000);
    }, [
        targetDate
    ]);
    return (0, $k6j4s.html)`<span>${hours}</span>:<span>${minutes}</span>:<span>${seconds}</span>`;
};
function $c5e61645c02f04e0$var$calcTimeDiff(targetDate) {
    const timeNow = Date.now();
    const targetDatee = new Date(targetDate);
    const target = targetDatee.getTime() + targetDatee.getTimezoneOffset() * $c5e61645c02f04e0$var$minute;
    const diff = target - timeNow;
    return diff;
}
function $c5e61645c02f04e0$var$fmtTime(time) {
    const hours = Math.floor(time / $c5e61645c02f04e0$var$hour).toString();
    const minutes = Math.floor(time % $c5e61645c02f04e0$var$hour / $c5e61645c02f04e0$var$minute).toString();
    const seconds = Math.floor(time % $c5e61645c02f04e0$var$minute / $c5e61645c02f04e0$var$second).toString();
    return `${hours}:${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
}
customElements.define("timer-element", (0, $40NS7.component)($c5e61645c02f04e0$export$94bb59f6876a36f, {
    useShadowDOM: false,
    observedAttributes: [
        "target-date"
    ]
}));

});

parcelRequire.register("kkdSm", function(module, exports) {

$parcel$export(module.exports, "StripeContext", () => $4bec3c47ad22fb1c$export$bdc250ccffdc5290);
parcelRequire("7WcZB");
var $40NS7 = parcelRequire("40NS7");
const $4bec3c47ad22fb1c$export$bdc250ccffdc5290 = (0, $40NS7.createContext)(null);
customElements.define("stripe-provider", $4bec3c47ad22fb1c$export$bdc250ccffdc5290.Provider);

});

parcelRequire.register("blzaT", function(module, exports) {

$parcel$export(module.exports, "fmt", () => $db176343dcbe1cbd$export$bc71a178fd8db0f);

var $kkdSm = parcelRequire("kkdSm");
parcelRequire("eC0rA");
var $04dGP = parcelRequire("04dGP");
var $cTUZO = parcelRequire("cTUZO");

var $bzCQD = parcelRequire("bzCQD");
parcelRequire("7WcZB");
var $40NS7 = parcelRequire("40NS7");

var $kkdSm = parcelRequire("kkdSm");

var $ha9rr = parcelRequire("ha9rr");
const $db176343dcbe1cbd$export$bc71a178fd8db0f = {
    err: (...args)=>args
};
(0, $ha9rr.css)`stripe-form { display: block }`;

const $db176343dcbe1cbd$export$f8b5c74ea1ce3dc4 = function(props) {
    const stripeRef = (0, $04dGP.useRef)(null);
    const useSubmit = (0, $bzCQD.useAwait)(async ()=>{
        if (stripeRef.current) {
            const { stripeClient: stripeClient , stripeElements: stripeElements  } = stripeRef.current;
            const stripeTokenizableElm = stripeElements.getElement("cardNumber") || stripeElements.getElement("card");
            if (!stripeTokenizableElm) throw "Input not found";
            const tokenResult = await stripeClient.createToken(stripeTokenizableElm);
            if (tokenResult.token) {
                const sendTokenEvent = new CustomEvent("sendcardtoken", {
                    detail: {
                        token: tokenResult.token
                    },
                    bubbles: true
                });
                this.dispatchEvent(sendTokenEvent);
            }
            if (tokenResult.error) {
                console.warn(tokenResult.error);
                throw tokenResult.error;
            }
        }
    }, (data)=>{
        if (this.value) this.value = {
            ...this.value,
            useSubmit: {
                ...data
            }
        };
    });
    const stripeCb = (0, $bzCQD.useAwait)(async ()=>{
        const stripeImport = await (parcelRequire("9MWL6"));
        const stripe = await stripeImport.loadStripe(props.stripePublicKey);
        if (!stripe) throw "Could not load stripe";
        const stripeElements = stripe.elements();
        stripeRef.current = {
            stripeClient: stripe,
            stripeElements: stripeElements,
            useSubmit: useSubmit
        };
        this.value = stripeRef.current;
    });
    (0, $cTUZO.useEffect)(()=>{
        if (!stripeRef.current) stripeCb.run();
    }, []);
};
customElements.define("stripe-form", (0, $40NS7.component)($db176343dcbe1cbd$export$f8b5c74ea1ce3dc4, {
    useShadowDOM: false,
    baseElement: (0, $kkdSm.StripeContext).Provider,
    observedAttributes: [
        "stripe-public-key"
    ]
}));

});
parcelRequire.register("bzCQD", function(module, exports) {

$parcel$export(module.exports, "useAwait", () => $615caa12ba9db9a9$export$6de935e3b3681947);
parcelRequire("eC0rA");
var $2lQDC = parcelRequire("2lQDC");

var $j2WWI = parcelRequire("j2WWI");
function $615caa12ba9db9a9$export$6de935e3b3681947(job, cb) {
    const [loading, setLoading] = (0, $2lQDC.useState)(false);
    const [err1, setErr] = (0, $2lQDC.useState)(undefined);
    const [result1, setResult] = (0, $2lQDC.useState)(undefined);
    const run = async (...args)=>{
        if (!loading) {
            setLoading(true);
            setErr(undefined);
            const [result, err] = await (0, $j2WWI.inlineErr)(job(...args));
            setErr(err);
            setResult(result);
            setLoading(false);
            return result;
        }
    };
    const awaitStats = {
        run: run,
        loading: loading,
        result: result1,
        err: err1
    };
    if (cb) cb(awaitStats);
    return awaitStats;
}

});
parcelRequire.register("j2WWI", function(module, exports) {

$parcel$export(module.exports, "inlineErr", () => $28108c5be9591f14$export$19af69b8fa933a33);
async function $28108c5be9591f14$export$19af69b8fa933a33(arg, preventLog) {
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

});


parcelRequire.register("ha9rr", function(module, exports) {

$parcel$export(module.exports, "css", () => $eefccfe9feb20347$export$dbf350e5966cf602);
let $eefccfe9feb20347$var$memory = [];
const $eefccfe9feb20347$export$dbf350e5966cf602 = (template, ...values)=>{
    let text = "";
    if (Array.isArray(template)) for(let i = 0; i < template.length; i++){
        text += template[i];
        text += i === template.length - 1 ? "" : values[i];
    }
    else text = template;
    if ($eefccfe9feb20347$var$memory.indexOf(text) > -1) return;
    let styleElement = document.createElement("style");
    styleElement.innerHTML = text;
    document.head.appendChild(styleElement);
    $eefccfe9feb20347$var$memory.push(text);
};

});

parcelRequire.register("9MWL6", function(module, exports) {
module.exports = import("./stripe.esm.4469c15d.js").then(()=>parcelRequire("KgACT"));

});


parcelRequire.register("kw66b", function(module, exports) {
parcelRequire("eC0rA");
var $chcG5 = parcelRequire("chcG5");
var $2lQDC = parcelRequire("2lQDC");
var $cTUZO = parcelRequire("cTUZO");

var $kkdSm = parcelRequire("kkdSm");
parcelRequire("7WcZB");
var $40NS7 = parcelRequire("40NS7");

var $ha9rr = parcelRequire("ha9rr");

var $blzaT = parcelRequire("blzaT");

var $k6j4s = parcelRequire("k6j4s");
function $7c5a92e14ce0812f$var$defineComponent(tagName, func) {
    (0, $ha9rr.css)`${tagName} {display: block}`;
    customElements.define(tagName, (0, $40NS7.component)(func, {
        useShadowDOM: false
    }));
    return func;
}
function $7c5a92e14ce0812f$var$defineStripeInputElm(tagName, type, opts) {
    const StripeInputElm = function() {
        const stripeContext = (0, $chcG5.useContext)((0, $kkdSm.StripeContext));
        const [stripeElm, setStripeElm] = (0, $2lQDC.useState)(null);
        (0, $cTUZO.useEffect)(()=>{
            if (stripeContext && !stripeElm) setStripeElm($7c5a92e14ce0812f$var$buildStripeElement(this, stripeContext, type, opts));
        }, [
            stripeContext
        ]);
        return stripeElm;
    };
    return $7c5a92e14ce0812f$var$defineComponent(tagName, StripeInputElm);
}
function $7c5a92e14ce0812f$var$buildStripeElement(host, stripeRef, type, opts) {
    const stripeElm = stripeRef.stripeElements.create(type, opts);
    const container = document.createElement("div");
    stripeElm.mount(container);
    stripeElm.on("ready", (e)=>{
        let onElementReadyEvent = new CustomEvent("elementready", {
            detail: e,
            bubbles: true
        });
        host.dispatchEvent(onElementReadyEvent);
    });
    return container;
}
const $7c5a92e14ce0812f$export$c9ccdcc3c06ee491 = $7c5a92e14ce0812f$var$defineStripeInputElm("stripe-card", "card");
const $7c5a92e14ce0812f$export$4cbe3669114e83d0 = $7c5a92e14ce0812f$var$defineStripeInputElm("stripe-card-number", "cardNumber");
const $7c5a92e14ce0812f$export$d76ae8643aaee751 = $7c5a92e14ce0812f$var$defineStripeInputElm("stripe-card-cvc", "cardCvc");
const $7c5a92e14ce0812f$export$330e456fa1cfd3c8 = $7c5a92e14ce0812f$var$defineStripeInputElm("stripe-card-expiry", "cardExpiry");
const $7c5a92e14ce0812f$export$917b75aabdb1c4fa = $7c5a92e14ce0812f$var$defineComponent("stripe-submit-error", function() {
    const stripeContext = (0, $chcG5.useContext)((0, $kkdSm.StripeContext));
    const err = stripeContext?.useSubmit?.err;
    if (!err) return undefined;
    return (0, $k6j4s.html)`${(0, $blzaT.fmt).err(err)}`;
});
const $7c5a92e14ce0812f$export$60a93091db2e6623 = $7c5a92e14ce0812f$var$defineComponent("stripe-submit", function() {
    const stripeContext = (0, $chcG5.useContext)((0, $kkdSm.StripeContext));
    const submitCb = stripeContext?.useSubmit?.run;
    (0, $cTUZO.useEffect)(()=>{
        if (submitCb) {
            this.addEventListener("click", submitCb);
            return ()=>this.removeEventListener("click", submitCb);
        }
    }, [
        submitCb
    ]);
});

});



//# sourceMappingURL=increment-number.a0fbecdc.js.map
