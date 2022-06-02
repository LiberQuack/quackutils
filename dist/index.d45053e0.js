// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"jkloN":[function(require,module,exports) {
"use strict";
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "3c6ece02d45053e0";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, importScripts */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else if ("reload" in location) location.reload();
            else {
                // Web extension context
                var ext = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome;
                if (ext && ext.runtime && ext.runtime.reload) ext.runtime.reload();
            }
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                if (asset.type === "js") {
                    if (typeof document !== "undefined") {
                        let script = document.createElement("script");
                        script.src = asset.url;
                        return new Promise((resolve, reject)=>{
                            var _document$head;
                            script.onload = ()=>resolve(script);
                            script.onerror = reject;
                            (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
                        });
                    } else if (typeof importScripts === "function") return new Promise((resolve, reject)=>{
                        try {
                            importScripts(asset.url);
                        } catch (err) {
                            reject(err);
                        }
                    });
                }
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id1) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id1]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id1][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id1];
        delete bundle.cache[id1]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id1);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"gGED4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ShareElement", ()=>ShareElement);
var _haunted = require("haunted");
var _core = require("haunted/lib/core");
var _lit = require("lit");
var _unsafeHtml = require("lit/directives/unsafe-html");
var _shareButtons = require("share-buttons");
var _shareButtonsDefault = parcelHelpers.interopDefault(_shareButtons);
var _fbIconSvg = require("bundle-text:./fb_icon.svg");
var _fbIconSvgDefault = parcelHelpers.interopDefault(_fbIconSvg);
var _twIconSvg = require("bundle-text:./tw_icon.svg");
var _twIconSvgDefault = parcelHelpers.interopDefault(_twIconSvg);
var _wpIconSvg = require("bundle-text:./wp_icon.svg");
var _wpIconSvgDefault = parcelHelpers.interopDefault(_wpIconSvg);
var _css = require("../../util/css");
const ShareElement = function() {
    (0, _css.css)`
        share-element a {
            display: inline-block;
        }
        
        share-element svg {
            display: inline-block;
            width: 1em;
            height: 1em;
        }
    `;
    (0, _core.useEffect)(()=>{
        this.classList.add("share-btn");
        (0, _shareButtonsDefault.default).update();
        if (!this.hasAttribute("data-desc")) console.warn(this, "Expected attribute data-desc");
        if (!this.hasAttribute("data-title")) console.warn(this, "Expected attribute data-title");
    }, []);
    return (0, _lit.html)`
        <a data-url="${document.location.href}" data-id="tw">${(0, _unsafeHtml.unsafeHTML)((0, _twIconSvgDefault.default))}</a>
        <a data-url="${document.location.href}" data-id="fb">${(0, _unsafeHtml.unsafeHTML)((0, _fbIconSvgDefault.default))}</a>
        <a data-url="${document.location.href}" data-id="wa">${(0, _unsafeHtml.unsafeHTML)((0, _wpIconSvgDefault.default))}</a>
    `;
};
/**
 * Add in the future
 * <a data-url="${document.location.href}" data-id="in">${unsafeHTML(linkedinSvg)}</a>
 * <a data-url="${document.location.href}" data-id="share">${unsafeHTML(shareSvg)}</a>
 */ customElements.define("share-element", (0, _haunted.component)(ShareElement, {
    useShadowDOM: false
}));

},{"haunted/lib/core":"jm0WR","lit":"4antt","share-buttons":"gAJMK","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","lit/directives/unsafe-html":"5KJj0","bundle-text:./fb_icon.svg":"9POI3","bundle-text:./tw_icon.svg":"4NlG7","bundle-text:./wp_icon.svg":"ipHGN","haunted":"1zPVq","../../util/css":"7Ux3T"}],"jm0WR":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>haunted);
parcelHelpers.export(exports, "useCallback", ()=>(0, _useCallbackJs.useCallback));
parcelHelpers.export(exports, "useController", ()=>(0, _useControllerJs.useController));
parcelHelpers.export(exports, "useEffect", ()=>(0, _useEffectJs.useEffect));
parcelHelpers.export(exports, "useLayoutEffect", ()=>(0, _useLayoutEffectJs.useLayoutEffect));
parcelHelpers.export(exports, "useState", ()=>(0, _useStateJs.useState));
parcelHelpers.export(exports, "useReducer", ()=>(0, _useReducerJs.useReducer));
parcelHelpers.export(exports, "useMemo", ()=>(0, _useMemoJs.useMemo));
parcelHelpers.export(exports, "useContext", ()=>(0, _useContextJs.useContext));
parcelHelpers.export(exports, "useRef", ()=>(0, _useRefJs.useRef));
parcelHelpers.export(exports, "hook", ()=>(0, _hookJs.hook));
parcelHelpers.export(exports, "Hook", ()=>(0, _hookJs.Hook));
parcelHelpers.export(exports, "BaseScheduler", ()=>(0, _schedulerJs.BaseScheduler));
parcelHelpers.export(exports, "State", ()=>(0, _stateJs.State));
var _componentJs = require("./component.js");
var _createContextJs = require("./create-context.js");
var _useCallbackJs = require("./use-callback.js");
var _useControllerJs = require("./use-controller.js");
var _useEffectJs = require("./use-effect.js");
var _useLayoutEffectJs = require("./use-layout-effect.js");
var _useStateJs = require("./use-state.js");
var _useReducerJs = require("./use-reducer.js");
var _useMemoJs = require("./use-memo.js");
var _useContextJs = require("./use-context.js");
var _useRefJs = require("./use-ref.js");
var _hookJs = require("./hook.js");
var _schedulerJs = require("./scheduler.js");
var _stateJs = require("./state.js");
function haunted({ render  }) {
    const component = (0, _componentJs.makeComponent)(render);
    const createContext = (0, _createContextJs.makeContext)(component);
    return {
        component,
        createContext
    };
}

},{"./component.js":"5CdCO","./create-context.js":"dum2Y","./use-callback.js":"fVeXS","./use-controller.js":"18yG6","./use-effect.js":"2ALJJ","./use-layout-effect.js":"gu5qx","./use-state.js":"iOoaP","./use-reducer.js":"3UkW1","./use-memo.js":"c0wwc","./use-context.js":"46jou","./use-ref.js":"7gneP","./hook.js":"2gL5X","./scheduler.js":"gpmTH","./state.js":"2btSy","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5CdCO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "makeComponent", ()=>makeComponent);
var _schedulerJs = require("./scheduler.js");
const toCamelCase = (val = "")=>val.replace(/-+([a-z])?/g, (_, char)=>char ? char.toUpperCase() : "");
function makeComponent(render) {
    class Scheduler extends (0, _schedulerJs.BaseScheduler) {
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
        const { observedAttributes =[] , useShadowDOM =true , shadowRootInit ={}  } = options || baseElementOrOptions || {};
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
                Reflect.set(this, toCamelCase(name), val);
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
                    value
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

},{"./scheduler.js":"gpmTH","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gpmTH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "BaseScheduler", ()=>BaseScheduler);
var _stateJs = require("./state.js");
var _symbolsJs = require("./symbols.js");
const defer = Promise.resolve().then.bind(Promise.resolve());
function runner() {
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
        if (id == null) id = defer(runTasks);
    };
}
const read = runner();
const write = runner();
class BaseScheduler {
    renderer;
    host;
    state;
    [(0, _symbolsJs.phaseSymbol)];
    _updateQueued;
    constructor(renderer, host){
        this.renderer = renderer;
        this.host = host;
        this.state = new (0, _stateJs.State)(this.update.bind(this), host);
        this[0, _symbolsJs.phaseSymbol] = null;
        this._updateQueued = false;
    }
    update() {
        if (this._updateQueued) return;
        read(()=>{
            let result = this.handlePhase((0, _symbolsJs.updateSymbol));
            write(()=>{
                this.handlePhase((0, _symbolsJs.commitSymbol), result);
                write(()=>{
                    this.handlePhase((0, _symbolsJs.effectsSymbol));
                });
            });
            this._updateQueued = false;
        });
        this._updateQueued = true;
    }
    handlePhase(phase, arg) {
        this[0, _symbolsJs.phaseSymbol] = phase;
        switch(phase){
            case 0, _symbolsJs.commitSymbol:
                this.commit(arg);
                this.runEffects((0, _symbolsJs.layoutEffectsSymbol));
                return;
            case 0, _symbolsJs.updateSymbol:
                return this.render();
            case 0, _symbolsJs.effectsSymbol:
                return this.runEffects((0, _symbolsJs.effectsSymbol));
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

},{"./state.js":"2btSy","./symbols.js":"jo2P1","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2btSy":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "State", ()=>State);
var _interfaceJs = require("./interface.js");
var _symbolsJs = require("./symbols.js");
class State {
    update;
    host;
    virtual;
    [(0, _symbolsJs.hookSymbol)];
    [(0, _symbolsJs.effectsSymbol)];
    [(0, _symbolsJs.layoutEffectsSymbol)];
    constructor(update, host){
        this.update = update;
        this.host = host;
        this[0, _symbolsJs.hookSymbol] = new Map();
        this[0, _symbolsJs.effectsSymbol] = [];
        this[0, _symbolsJs.layoutEffectsSymbol] = [];
    }
    run(cb) {
        (0, _interfaceJs.setCurrent)(this);
        let res = cb();
        (0, _interfaceJs.clear)();
        return res;
    }
    _runEffects(phase) {
        let effects = this[phase];
        (0, _interfaceJs.setCurrent)(this);
        for (let effect of effects)effect.call(this);
        (0, _interfaceJs.clear)();
    }
    runEffects() {
        this._runEffects((0, _symbolsJs.effectsSymbol));
    }
    runLayoutEffects() {
        this._runEffects((0, _symbolsJs.layoutEffectsSymbol));
    }
    teardown() {
        let hooks = this[0, _symbolsJs.hookSymbol];
        hooks.forEach((hook)=>{
            if (typeof hook.teardown === "function") hook.teardown();
        });
    }
}

},{"./interface.js":"22XsR","./symbols.js":"jo2P1","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"22XsR":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "clear", ()=>clear);
parcelHelpers.export(exports, "current", ()=>current);
parcelHelpers.export(exports, "setCurrent", ()=>setCurrent);
parcelHelpers.export(exports, "notify", ()=>notify);
let current;
let currentId = 0;
function setCurrent(state) {
    current = state;
}
function clear() {
    current = null;
    currentId = 0;
}
function notify() {
    return currentId++;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"jo2P1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "phaseSymbol", ()=>phaseSymbol);
parcelHelpers.export(exports, "hookSymbol", ()=>hookSymbol);
parcelHelpers.export(exports, "updateSymbol", ()=>updateSymbol);
parcelHelpers.export(exports, "commitSymbol", ()=>commitSymbol);
parcelHelpers.export(exports, "effectsSymbol", ()=>effectsSymbol);
parcelHelpers.export(exports, "layoutEffectsSymbol", ()=>layoutEffectsSymbol);
parcelHelpers.export(exports, "contextEvent", ()=>contextEvent);
const phaseSymbol = Symbol("haunted.phase");
const hookSymbol = Symbol("haunted.hook");
const updateSymbol = Symbol("haunted.update");
const commitSymbol = Symbol("haunted.commit");
const effectsSymbol = Symbol("haunted.effects");
const layoutEffectsSymbol = Symbol("haunted.layoutEffects");
const contextEvent = "haunted.context";

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dum2Y":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "makeContext", ()=>makeContext);
var _symbolsJs = require("./symbols.js");
var _useContextJs = require("./use-context.js");
function makeContext(component) {
    return (defaultValue)=>{
        const Context = {
            Provider: class extends HTMLElement {
                listeners;
                _value;
                constructor(){
                    super();
                    this.listeners = new Set();
                    this.addEventListener((0, _symbolsJs.contextEvent), this);
                }
                disconnectedCallback() {
                    this.removeEventListener((0, _symbolsJs.contextEvent), this);
                }
                handleEvent(event) {
                    const { detail  } = event;
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
            Consumer: component(function({ render  }) {
                const context = (0, _useContextJs.useContext)(Context);
                return render(context);
            }),
            defaultValue
        };
        return Context;
    };
}

},{"./symbols.js":"jo2P1","./use-context.js":"46jou","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"46jou":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "useContext", ()=>useContext);
var _hookJs = require("./hook.js");
var _symbolsJs = require("./symbols.js");
var _useEffectJs = require("./use-effect.js");
/**
 * @function
 * @template T
 * @param    {Context<T>} context
 * @return   {T}
 */ const useContext = (0, _hookJs.hook)(class extends (0, _hookJs.Hook) {
    Context;
    value;
    _ranEffect;
    _unsubscribe;
    constructor(id, state, _){
        super(id, state);
        this._updater = this._updater.bind(this);
        this._ranEffect = false;
        this._unsubscribe = null;
        (0, _useEffectJs.setEffects)(state, this);
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
            Context,
            callback: this._updater
        };
        this.state.host.dispatchEvent(new CustomEvent((0, _symbolsJs.contextEvent), {
            detail,
            bubbles: true,
            cancelable: true,
            composed: true
        }));
        const { unsubscribe =null , value  } = detail;
        this.value = unsubscribe ? value : Context.defaultValue;
        this._unsubscribe = unsubscribe;
    }
    teardown() {
        if (this._unsubscribe) this._unsubscribe();
    }
});

},{"./hook.js":"2gL5X","./symbols.js":"jo2P1","./use-effect.js":"2ALJJ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2gL5X":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "hook", ()=>hook);
parcelHelpers.export(exports, "Hook", ()=>Hook);
var _interfaceJs = require("./interface.js");
var _symbolsJs = require("./symbols.js");
class Hook {
    id;
    state;
    constructor(id, state){
        this.id = id;
        this.state = state;
    }
}
function use(Hook1, ...args) {
    let id = (0, _interfaceJs.notify)();
    let hooks = (0, _interfaceJs.current)[0, _symbolsJs.hookSymbol];
    let hook1 = hooks.get(id);
    if (!hook1) {
        hook1 = new Hook1(id, (0, _interfaceJs.current), ...args);
        hooks.set(id, hook1);
    }
    return hook1.update(...args);
}
function hook(Hook2) {
    return use.bind(null, Hook2);
}

},{"./interface.js":"22XsR","./symbols.js":"jo2P1","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2ALJJ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "setEffects", ()=>setEffects);
parcelHelpers.export(exports, "useEffect", ()=>useEffect);
var _symbolsJs = require("./symbols.js");
var _createEffectJs = require("./create-effect.js");
function setEffects(state, cb) {
    state[0, _symbolsJs.effectsSymbol].push(cb);
}
/**
 * @function
 * @param {() => void} effect - callback function that runs each time dependencies change
 * @param {unknown[]} [dependencies] - list of dependencies to the effect
 * @return {void}
 */ const useEffect = (0, _createEffectJs.createEffect)(setEffects);

},{"./symbols.js":"jo2P1","./create-effect.js":"UWxin","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"UWxin":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "createEffect", ()=>createEffect);
var _hookJs = require("./hook.js");
function createEffect(setEffects) {
    return (0, _hookJs.hook)(class extends (0, _hookJs.Hook) {
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

},{"./hook.js":"2gL5X","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fVeXS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "useCallback", ()=>useCallback);
var _useMemoJs = require("./use-memo.js");
/**
 * @function
 * @template {Function} T
 * @param    {T} fn - callback to memoize
 * @param    {unknown[]} inputs - dependencies to callback memoization
 * @return   {T}
 */ const useCallback = (fn, inputs)=>(0, _useMemoJs.useMemo)(()=>fn, inputs);

},{"./use-memo.js":"c0wwc","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"c0wwc":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "useMemo", ()=>useMemo);
var _hookJs = require("./hook.js");
/**
 * @function
 * @template T
 * @param  {() => T} fn function to memoize
 * @param  {unknown[]} values dependencies to the memoized computation
 * @return {T} The next computed value
 */ const useMemo = (0, _hookJs.hook)(class extends (0, _hookJs.Hook) {
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

},{"./hook.js":"2gL5X","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"18yG6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Creates and stores a stateful ReactiveController instance and provides it
 * with a ReactiveControllerHost that drives the controller lifecycle.
 *
 * Use this hook to convert a ReactiveController into a Haunted hook.
 *
 * @param {<C extends ReactiveController>(host: ReactiveControllerHost) => C} createController A function that creates a controller instance.
 * This function is given a HauntedControllerHost to pass to the controller. The
 * create function is only called once per component.
 * @return {ReactiveController} the controller instance
 */ parcelHelpers.export(exports, "useController", ()=>useController);
/**
 * @license
 * Portions Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var _useLayoutEffectJs = require("./use-layout-effect.js");
var _useStateJs = require("./use-state.js");
const microtask = Promise.resolve();
/**
 * An implementation of ReactiveControllerHost that is driven by Haunted hooks
 * and `useController()`.
 */ class HauntedControllerHost {
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
            microtask.then(()=>this.kick(this.count + 1));
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
function useController(createController) {
    const [count, kick] = (0, _useStateJs.useState)(0);
    const [host1] = (0, _useStateJs.useState)(()=>{
        const host = new HauntedControllerHost(count, kick);
        const controller = createController(host);
        host.primaryController = controller;
        host.connected();
        return host;
    });
    // We use useLayoutEffect because we need updated() called synchronously
    // after rendering.
    (0, _useLayoutEffectJs.useLayoutEffect)(()=>host1.updated());
    // Returning a cleanup function simulates hostDisconnected timing. An empty
    // deps array tells Haunted to only call this once: on mount with the cleanup
    // called on unmount.
    (0, _useLayoutEffectJs.useLayoutEffect)(()=>()=>host1.disconnected(), []);
    host1.update();
    return host1.primaryController;
}

},{"./use-layout-effect.js":"gu5qx","./use-state.js":"iOoaP","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gu5qx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "useLayoutEffect", ()=>useLayoutEffect);
var _symbolsJs = require("./symbols.js");
var _createEffectJs = require("./create-effect.js");
function setLayoutEffects(state, cb) {
    state[0, _symbolsJs.layoutEffectsSymbol].push(cb);
}
/**
 * @function
 * @param  {Effect} callback effecting callback
 * @param  {unknown[]} [values] dependencies to the effect
 * @return {void}
 */ const useLayoutEffect = (0, _createEffectJs.createEffect)(setLayoutEffects);

},{"./symbols.js":"jo2P1","./create-effect.js":"UWxin","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iOoaP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "useState", ()=>useState);
var _hookJs = require("./hook.js");
/**
 * @function
 * @template {*} T
 * @param {T} [initialState] - Optional initial state
 * @return {readonly [state: T, updaterFn: StateUpdater<T>]} stateTuple - Tuple of current state and state updater function
 */ const useState = (0, _hookJs.hook)(class extends (0, _hookJs.Hook) {
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

},{"./hook.js":"2gL5X","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3UkW1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "useReducer", ()=>useReducer);
var _hookJs = require("./hook.js");
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
 */ const useReducer = (0, _hookJs.hook)(class extends (0, _hookJs.Hook) {
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

},{"./hook.js":"2gL5X","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7gneP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "useRef", ()=>useRef);
var _useMemoJs = require("./use-memo.js");
/**
 * @function
 * @template T
 * @param   {T} initialValue
 * @return  {{ current: T }} Ref
 */ const useRef = (initialValue)=>(0, _useMemoJs.useMemo)(()=>({
            current: initialValue
        }), []);

},{"./use-memo.js":"c0wwc","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4antt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _reactiveElement = require("@lit/reactive-element");
var _litHtml = require("lit-html");
var _litElementJs = require("lit-element/lit-element.js");
parcelHelpers.exportAll(_litElementJs, exports);

},{"@lit/reactive-element":"hypet","lit-html":"1cmQt","lit-element/lit-element.js":"9YxkX","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hypet":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CSSResult", ()=>(0, _cssTagJs.CSSResult));
parcelHelpers.export(exports, "adoptStyles", ()=>(0, _cssTagJs.adoptStyles));
parcelHelpers.export(exports, "css", ()=>(0, _cssTagJs.css));
parcelHelpers.export(exports, "getCompatibleStyle", ()=>(0, _cssTagJs.getCompatibleStyle));
parcelHelpers.export(exports, "supportsAdoptingStyleSheets", ()=>(0, _cssTagJs.supportsAdoptingStyleSheets));
parcelHelpers.export(exports, "unsafeCSS", ()=>(0, _cssTagJs.unsafeCSS));
parcelHelpers.export(exports, "ReactiveElement", ()=>a);
parcelHelpers.export(exports, "defaultConverter", ()=>o);
parcelHelpers.export(exports, "notEqual", ()=>n);
var _cssTagJs = require("./css-tag.js");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var s;
const e = window.trustedTypes, r = e ? e.emptyScript : "", h = window.reactiveElementPolyfillSupport, o = {
    toAttribute (t, i) {
        switch(i){
            case Boolean:
                t = t ? r : null;
                break;
            case Object:
            case Array:
                t = null == t ? t : JSON.stringify(t);
        }
        return t;
    },
    fromAttribute (t, i) {
        let s1 = t;
        switch(i){
            case Boolean:
                s1 = null !== t;
                break;
            case Number:
                s1 = null === t ? null : Number(t);
                break;
            case Object:
            case Array:
                try {
                    s1 = JSON.parse(t);
                } catch (t1) {
                    s1 = null;
                }
        }
        return s1;
    }
}, n = (t, i)=>i !== t && (i == i || t == t), l = {
    attribute: !0,
    type: String,
    converter: o,
    reflect: !1,
    hasChanged: n
};
class a extends HTMLElement {
    constructor(){
        super(), this._$Et = new Map, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Ei = null, this.o();
    }
    static addInitializer(t) {
        var i;
        null !== (i = this.l) && void 0 !== i || (this.l = []), this.l.push(t);
    }
    static get observedAttributes() {
        this.finalize();
        const t = [];
        return this.elementProperties.forEach((i, s2)=>{
            const e1 = this._$Eh(s2, i);
            void 0 !== e1 && (this._$Eu.set(e1, s2), t.push(e1));
        }), t;
    }
    static createProperty(t, i = l) {
        if (i.state && (i.attribute = !1), this.finalize(), this.elementProperties.set(t, i), !i.noAccessor && !this.prototype.hasOwnProperty(t)) {
            const s3 = "symbol" == typeof t ? Symbol() : "__" + t, e2 = this.getPropertyDescriptor(t, s3, i);
            void 0 !== e2 && Object.defineProperty(this.prototype, t, e2);
        }
    }
    static getPropertyDescriptor(t, i, s4) {
        return {
            get () {
                return this[i];
            },
            set (e3) {
                const r1 = this[t];
                this[i] = e3, this.requestUpdate(t, r1, s4);
            },
            configurable: !0,
            enumerable: !0
        };
    }
    static getPropertyOptions(t) {
        return this.elementProperties.get(t) || l;
    }
    static finalize() {
        if (this.hasOwnProperty("finalized")) return !1;
        this.finalized = !0;
        const t = Object.getPrototypeOf(this);
        if (t.finalize(), this.elementProperties = new Map(t.elementProperties), this._$Eu = new Map, this.hasOwnProperty("properties")) {
            const t = this.properties, i = [
                ...Object.getOwnPropertyNames(t),
                ...Object.getOwnPropertySymbols(t)
            ];
            for (const s5 of i)this.createProperty(s5, t[s5]);
        }
        return this.elementStyles = this.finalizeStyles(this.styles), !0;
    }
    static finalizeStyles(i) {
        const s6 = [];
        if (Array.isArray(i)) {
            const e4 = new Set(i.flat(1 / 0).reverse());
            for (const i1 of e4)s6.unshift((0, _cssTagJs.getCompatibleStyle)(i1));
        } else void 0 !== i && s6.push((0, _cssTagJs.getCompatibleStyle)(i));
        return s6;
    }
    static _$Eh(t, i) {
        const s7 = i.attribute;
        return !1 === s7 ? void 0 : "string" == typeof s7 ? s7 : "string" == typeof t ? t.toLowerCase() : void 0;
    }
    o() {
        var t2;
        this._$Ep = new Promise((t)=>this.enableUpdating = t), this._$AL = new Map, this._$Em(), this.requestUpdate(), null === (t2 = this.constructor.l) || void 0 === t2 || t2.forEach((t)=>t(this));
    }
    addController(t) {
        var i, s8;
        (null !== (i = this._$Eg) && void 0 !== i ? i : this._$Eg = []).push(t), void 0 !== this.renderRoot && this.isConnected && (null === (s8 = t.hostConnected) || void 0 === s8 || s8.call(t));
    }
    removeController(t) {
        var i;
        null === (i = this._$Eg) || void 0 === i || i.splice(this._$Eg.indexOf(t) >>> 0, 1);
    }
    _$Em() {
        this.constructor.elementProperties.forEach((t, i)=>{
            this.hasOwnProperty(i) && (this._$Et.set(i, this[i]), delete this[i]);
        });
    }
    createRenderRoot() {
        var t;
        const s9 = null !== (t = this.shadowRoot) && void 0 !== t ? t : this.attachShadow(this.constructor.shadowRootOptions);
        return (0, _cssTagJs.adoptStyles)(s9, this.constructor.elementStyles), s9;
    }
    connectedCallback() {
        var t3;
        void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), null === (t3 = this._$Eg) || void 0 === t3 || t3.forEach((t)=>{
            var i;
            return null === (i = t.hostConnected) || void 0 === i ? void 0 : i.call(t);
        });
    }
    enableUpdating(t) {}
    disconnectedCallback() {
        var t4;
        null === (t4 = this._$Eg) || void 0 === t4 || t4.forEach((t)=>{
            var i;
            return null === (i = t.hostDisconnected) || void 0 === i ? void 0 : i.call(t);
        });
    }
    attributeChangedCallback(t, i, s10) {
        this._$AK(t, s10);
    }
    _$ES(t, i, s11 = l) {
        var e5, r2;
        const h1 = this.constructor._$Eh(t, s11);
        if (void 0 !== h1 && !0 === s11.reflect) {
            const n1 = (null !== (r2 = null === (e5 = s11.converter) || void 0 === e5 ? void 0 : e5.toAttribute) && void 0 !== r2 ? r2 : o.toAttribute)(i, s11.type);
            this._$Ei = t, null == n1 ? this.removeAttribute(h1) : this.setAttribute(h1, n1), this._$Ei = null;
        }
    }
    _$AK(t, i) {
        var s12, e6, r3;
        const h2 = this.constructor, n2 = h2._$Eu.get(t);
        if (void 0 !== n2 && this._$Ei !== n2) {
            const t = h2.getPropertyOptions(n2), l1 = t.converter, a1 = null !== (r3 = null !== (e6 = null === (s12 = l1) || void 0 === s12 ? void 0 : s12.fromAttribute) && void 0 !== e6 ? e6 : "function" == typeof l1 ? l1 : null) && void 0 !== r3 ? r3 : o.fromAttribute;
            this._$Ei = n2, this[n2] = a1(i, t.type), this._$Ei = null;
        }
    }
    requestUpdate(t, i, s13) {
        let e7 = !0;
        void 0 !== t && (((s13 = s13 || this.constructor.getPropertyOptions(t)).hasChanged || n)(this[t], i) ? (this._$AL.has(t) || this._$AL.set(t, i), !0 === s13.reflect && this._$Ei !== t && (void 0 === this._$EC && (this._$EC = new Map), this._$EC.set(t, s13))) : e7 = !1), !this.isUpdatePending && e7 && (this._$Ep = this._$E_());
    }
    async _$E_() {
        this.isUpdatePending = !0;
        try {
            await this._$Ep;
        } catch (t5) {
            Promise.reject(t5);
        }
        const t = this.scheduleUpdate();
        return null != t && await t, !this.isUpdatePending;
    }
    scheduleUpdate() {
        return this.performUpdate();
    }
    performUpdate() {
        var t6;
        if (!this.isUpdatePending) return;
        this.hasUpdated, this._$Et && (this._$Et.forEach((t, i)=>this[i] = t), this._$Et = void 0);
        let i2 = !1;
        const s14 = this._$AL;
        try {
            i2 = this.shouldUpdate(s14), i2 ? (this.willUpdate(s14), null === (t6 = this._$Eg) || void 0 === t6 || t6.forEach((t)=>{
                var i;
                return null === (i = t.hostUpdate) || void 0 === i ? void 0 : i.call(t);
            }), this.update(s14)) : this._$EU();
        } catch (t) {
            throw i2 = !1, this._$EU(), t;
        }
        i2 && this._$AE(s14);
    }
    willUpdate(t) {}
    _$AE(t7) {
        var i3;
        null === (i3 = this._$Eg) || void 0 === i3 || i3.forEach((t)=>{
            var i;
            return null === (i = t.hostUpdated) || void 0 === i ? void 0 : i.call(t);
        }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t7)), this.updated(t7);
    }
    _$EU() {
        this._$AL = new Map, this.isUpdatePending = !1;
    }
    get updateComplete() {
        return this.getUpdateComplete();
    }
    getUpdateComplete() {
        return this._$Ep;
    }
    shouldUpdate(t) {
        return !0;
    }
    update(t8) {
        void 0 !== this._$EC && (this._$EC.forEach((t, i)=>this._$ES(i, this[i], t)), this._$EC = void 0), this._$EU();
    }
    updated(t) {}
    firstUpdated(t) {}
}
a.finalized = !0, a.elementProperties = new Map, a.elementStyles = [], a.shadowRootOptions = {
    mode: "open"
}, null == h || h({
    ReactiveElement: a
}), (null !== (s = globalThis.reactiveElementVersions) && void 0 !== s ? s : globalThis.reactiveElementVersions = []).push("1.3.2");

},{"./css-tag.js":"gkZsf","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkZsf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CSSResult", ()=>s);
parcelHelpers.export(exports, "adoptStyles", ()=>i);
parcelHelpers.export(exports, "css", ()=>r);
parcelHelpers.export(exports, "getCompatibleStyle", ()=>S);
parcelHelpers.export(exports, "supportsAdoptingStyleSheets", ()=>t);
parcelHelpers.export(exports, "unsafeCSS", ()=>o);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const t = window.ShadowRoot && (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, e = Symbol(), n = new Map;
class s {
    constructor(t1, n1){
        if (this._$cssResult$ = !0, n1 !== e) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
        this.cssText = t1;
    }
    get styleSheet() {
        let e1 = n.get(this.cssText);
        return t && void 0 === e1 && (n.set(this.cssText, e1 = new CSSStyleSheet), e1.replaceSync(this.cssText)), e1;
    }
    toString() {
        return this.cssText;
    }
}
const o = (t2)=>new s("string" == typeof t2 ? t2 : t2 + "", e), r = (t3, ...n2)=>{
    const o1 = 1 === t3.length ? t3[0] : n2.reduce((e2, n3, s1)=>e2 + ((t4)=>{
            if (!0 === t4._$cssResult$) return t4.cssText;
            if ("number" == typeof t4) return t4;
            throw Error("Value passed to 'css' function must be a 'css' function result: " + t4 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
        })(n3) + t3[s1 + 1], t3[0]);
    return new s(o1, e);
}, i = (e3, n4)=>{
    t ? e3.adoptedStyleSheets = n4.map((t5)=>t5 instanceof CSSStyleSheet ? t5 : t5.styleSheet) : n4.forEach((t6)=>{
        const n5 = document.createElement("style"), s2 = window.litNonce;
        void 0 !== s2 && n5.setAttribute("nonce", s2), n5.textContent = t6.cssText, e3.appendChild(n5);
    });
}, S = t ? (t7)=>t7 : (t8)=>t8 instanceof CSSStyleSheet ? ((t9)=>{
        let e4 = "";
        for (const n6 of t9.cssRules)e4 += n6.cssText;
        return o(e4);
    })(t8) : t8;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1cmQt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "_$LH", ()=>R);
parcelHelpers.export(exports, "html", ()=>$);
parcelHelpers.export(exports, "noChange", ()=>b);
parcelHelpers.export(exports, "nothing", ()=>w);
parcelHelpers.export(exports, "render", ()=>x);
parcelHelpers.export(exports, "svg", ()=>y);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var t;
const i = globalThis.trustedTypes, s = i ? i.createPolicy("lit-html", {
    createHTML: (t1)=>t1
}) : void 0, e = `lit$${(Math.random() + "").slice(9)}$`, o = "?" + e, n = `<${o}>`, l = document, h = (t2 = "")=>l.createComment(t2), r = (t3)=>null === t3 || "object" != typeof t3 && "function" != typeof t3, d = Array.isArray, u = (t4)=>{
    var i1;
    return d(t4) || "function" == typeof (null === (i1 = t4) || void 0 === i1 ? void 0 : i1[Symbol.iterator]);
}, c = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, v = /-->/g, a = />/g, f = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g, _ = /'/g, m = /"/g, g = /^(?:script|style|textarea|title)$/i, p = (t5)=>(i2, ...s1)=>({
            _$litType$: t5,
            strings: i2,
            values: s1
        }), $ = p(1), y = p(2), b = Symbol.for("lit-noChange"), w = Symbol.for("lit-nothing"), T = new WeakMap, x = (t7, i3, s2)=>{
    var e1, o1;
    const n1 = null !== (e1 = null == s2 ? void 0 : s2.renderBefore) && void 0 !== e1 ? e1 : i3;
    let l1 = n1._$litPart$;
    if (void 0 === l1) {
        const t6 = null !== (o1 = null == s2 ? void 0 : s2.renderBefore) && void 0 !== o1 ? o1 : null;
        n1._$litPart$ = l1 = new N(i3.insertBefore(h(), t6), t6, void 0, null != s2 ? s2 : {});
    }
    return l1._$AI(t7), l1;
}, A = l.createTreeWalker(l, 129, null, !1), C = (t8, i5)=>{
    const o2 = t8.length - 1, l2 = [];
    let h1, r1 = 2 === i5 ? "<svg>" : "", d1 = c;
    for(let i4 = 0; i4 < o2; i4++){
        const s3 = t8[i4];
        let o3, u1, p1 = -1, $1 = 0;
        for(; $1 < s3.length && (d1.lastIndex = $1, u1 = d1.exec(s3), null !== u1);)$1 = d1.lastIndex, d1 === c ? "!--" === u1[1] ? d1 = v : void 0 !== u1[1] ? d1 = a : void 0 !== u1[2] ? (g.test(u1[2]) && (h1 = RegExp("</" + u1[2], "g")), d1 = f) : void 0 !== u1[3] && (d1 = f) : d1 === f ? ">" === u1[0] ? (d1 = null != h1 ? h1 : c, p1 = -1) : void 0 === u1[1] ? p1 = -2 : (p1 = d1.lastIndex - u1[2].length, o3 = u1[1], d1 = void 0 === u1[3] ? f : '"' === u1[3] ? m : _) : d1 === m || d1 === _ ? d1 = f : d1 === v || d1 === a ? d1 = c : (d1 = f, h1 = void 0);
        const y1 = d1 === f && t8[i4 + 1].startsWith("/>") ? " " : "";
        r1 += d1 === c ? s3 + n : p1 >= 0 ? (l2.push(o3), s3.slice(0, p1) + "$lit$" + s3.slice(p1) + e + y1) : s3 + e + (-2 === p1 ? (l2.push(void 0), i4) : y1);
    }
    const u2 = r1 + (t8[o2] || "<?>") + (2 === i5 ? "</svg>" : "");
    if (!Array.isArray(t8) || !t8.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return [
        void 0 !== s ? s.createHTML(u2) : u2,
        l2
    ];
};
class E {
    constructor({ strings: t9 , _$litType$: s4  }, n2){
        let l3;
        this.parts = [];
        let r2 = 0, d2 = 0;
        const u3 = t9.length - 1, c1 = this.parts, [v1, a1] = C(t9, s4);
        if (this.el = E.createElement(v1, n2), A.currentNode = this.el.content, 2 === s4) {
            const t10 = this.el.content, i6 = t10.firstChild;
            i6.remove(), t10.append(...i6.childNodes);
        }
        for(; null !== (l3 = A.nextNode()) && c1.length < u3;){
            if (1 === l3.nodeType) {
                if (l3.hasAttributes()) {
                    const t11 = [];
                    for (const i8 of l3.getAttributeNames())if (i8.endsWith("$lit$") || i8.startsWith(e)) {
                        const s5 = a1[d2++];
                        if (t11.push(i8), void 0 !== s5) {
                            const t12 = l3.getAttribute(s5.toLowerCase() + "$lit$").split(e), i9 = /([.?@])?(.*)/.exec(s5);
                            c1.push({
                                type: 1,
                                index: r2,
                                name: i9[2],
                                strings: t12,
                                ctor: "." === i9[1] ? M : "?" === i9[1] ? H : "@" === i9[1] ? I : S
                            });
                        } else c1.push({
                            type: 6,
                            index: r2
                        });
                    }
                    for (const i7 of t11)l3.removeAttribute(i7);
                }
                if (g.test(l3.tagName)) {
                    const t13 = l3.textContent.split(e), s6 = t13.length - 1;
                    if (s6 > 0) {
                        l3.textContent = i ? i.emptyScript : "";
                        for(let i10 = 0; i10 < s6; i10++)l3.append(t13[i10], h()), A.nextNode(), c1.push({
                            type: 2,
                            index: ++r2
                        });
                        l3.append(t13[s6], h());
                    }
                }
            } else if (8 === l3.nodeType) {
                if (l3.data === o) c1.push({
                    type: 2,
                    index: r2
                });
                else {
                    let t14 = -1;
                    for(; -1 !== (t14 = l3.data.indexOf(e, t14 + 1));)c1.push({
                        type: 7,
                        index: r2
                    }), t14 += e.length - 1;
                }
            }
            r2++;
        }
    }
    static createElement(t15, i) {
        const s7 = l.createElement("template");
        return s7.innerHTML = t15, s7;
    }
}
function P(t16, i15, s8 = t16, e2) {
    var o4, n3, l4, h2;
    if (i15 === b) return i15;
    let d3 = void 0 !== e2 ? null === (o4 = s8._$Cl) || void 0 === o4 ? void 0 : o4[e2] : s8._$Cu;
    const u4 = r(i15) ? void 0 : i15._$litDirective$;
    return (null == d3 ? void 0 : d3.constructor) !== u4 && (null === (n3 = null == d3 ? void 0 : d3._$AO) || void 0 === n3 || n3.call(d3, !1), void 0 === u4 ? d3 = void 0 : (d3 = new u4(t16), d3._$AT(t16, s8, e2)), void 0 !== e2 ? (null !== (l4 = (h2 = s8)._$Cl) && void 0 !== l4 ? l4 : h2._$Cl = [])[e2] = d3 : s8._$Cu = d3), void 0 !== d3 && (i15 = P(t16, d3._$AS(t16, i15.values), d3, e2)), i15;
}
class V {
    constructor(t17, i16){
        this.v = [], this._$AN = void 0, this._$AD = t17, this._$AM = i16;
    }
    get parentNode() {
        return this._$AM.parentNode;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    p(t18) {
        var i17;
        const { el: { content: s9  } , parts: e3  } = this._$AD, o5 = (null !== (i17 = null == t18 ? void 0 : t18.creationScope) && void 0 !== i17 ? i17 : l).importNode(s9, !0);
        A.currentNode = o5;
        let n4 = A.nextNode(), h3 = 0, r3 = 0, d4 = e3[0];
        for(; void 0 !== d4;){
            if (h3 === d4.index) {
                let i18;
                2 === d4.type ? i18 = new N(n4, n4.nextSibling, this, t18) : 1 === d4.type ? i18 = new d4.ctor(n4, d4.name, d4.strings, this, t18) : 6 === d4.type && (i18 = new L(n4, this, t18)), this.v.push(i18), d4 = e3[++r3];
            }
            h3 !== (null == d4 ? void 0 : d4.index) && (n4 = A.nextNode(), h3++);
        }
        return o5;
    }
    m(t19) {
        let i19 = 0;
        for (const s10 of this.v)void 0 !== s10 && (void 0 !== s10.strings ? (s10._$AI(t19, s10, i19), i19 += s10.strings.length - 2) : s10._$AI(t19[i19])), i19++;
    }
}
class N {
    constructor(t20, i20, s11, e4){
        var o6;
        this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = t20, this._$AB = i20, this._$AM = s11, this.options = e4, this._$Cg = null === (o6 = null == e4 ? void 0 : e4.isConnected) || void 0 === o6 || o6;
    }
    get _$AU() {
        var t21, i21;
        return null !== (i21 = null === (t21 = this._$AM) || void 0 === t21 ? void 0 : t21._$AU) && void 0 !== i21 ? i21 : this._$Cg;
    }
    get parentNode() {
        let t22 = this._$AA.parentNode;
        const i22 = this._$AM;
        return void 0 !== i22 && 11 === t22.nodeType && (t22 = i22.parentNode), t22;
    }
    get startNode() {
        return this._$AA;
    }
    get endNode() {
        return this._$AB;
    }
    _$AI(t23, i23 = this) {
        t23 = P(this, t23, i23), r(t23) ? t23 === w || null == t23 || "" === t23 ? (this._$AH !== w && this._$AR(), this._$AH = w) : t23 !== this._$AH && t23 !== b && this.$(t23) : void 0 !== t23._$litType$ ? this.T(t23) : void 0 !== t23.nodeType ? this.k(t23) : u(t23) ? this.S(t23) : this.$(t23);
    }
    M(t24, i24 = this._$AB) {
        return this._$AA.parentNode.insertBefore(t24, i24);
    }
    k(t25) {
        this._$AH !== t25 && (this._$AR(), this._$AH = this.M(t25));
    }
    $(t26) {
        this._$AH !== w && r(this._$AH) ? this._$AA.nextSibling.data = t26 : this.k(l.createTextNode(t26)), this._$AH = t26;
    }
    T(t27) {
        var i25;
        const { values: s12 , _$litType$: e5  } = t27, o7 = "number" == typeof e5 ? this._$AC(t27) : (void 0 === e5.el && (e5.el = E.createElement(e5.h, this.options)), e5);
        if ((null === (i25 = this._$AH) || void 0 === i25 ? void 0 : i25._$AD) === o7) this._$AH.m(s12);
        else {
            const t28 = new V(o7, this), i26 = t28.p(this.options);
            t28.m(s12), this.k(i26), this._$AH = t28;
        }
    }
    _$AC(t29) {
        let i27 = T.get(t29.strings);
        return void 0 === i27 && T.set(t29.strings, i27 = new E(t29)), i27;
    }
    S(t30) {
        d(this._$AH) || (this._$AH = [], this._$AR());
        const i28 = this._$AH;
        let s13, e6 = 0;
        for (const o8 of t30)e6 === i28.length ? i28.push(s13 = new N(this.M(h()), this.M(h()), this, this.options)) : s13 = i28[e6], s13._$AI(o8), e6++;
        e6 < i28.length && (this._$AR(s13 && s13._$AB.nextSibling, e6), i28.length = e6);
    }
    _$AR(t31 = this._$AA.nextSibling, i29) {
        var s14;
        for(null === (s14 = this._$AP) || void 0 === s14 || s14.call(this, !1, !0, i29); t31 && t31 !== this._$AB;){
            const i30 = t31.nextSibling;
            t31.remove(), t31 = i30;
        }
    }
    setConnected(t32) {
        var i31;
        void 0 === this._$AM && (this._$Cg = t32, null === (i31 = this._$AP) || void 0 === i31 || i31.call(this, t32));
    }
}
class S {
    constructor(t33, i32, s15, e7, o9){
        this.type = 1, this._$AH = w, this._$AN = void 0, this.element = t33, this.name = i32, this._$AM = e7, this.options = o9, s15.length > 2 || "" !== s15[0] || "" !== s15[1] ? (this._$AH = Array(s15.length - 1).fill(new String), this.strings = s15) : this._$AH = w;
    }
    get tagName() {
        return this.element.tagName;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    _$AI(t34, i33 = this, s16, e9) {
        const o10 = this.strings;
        let n5 = !1;
        if (void 0 === o10) t34 = P(this, t34, i33, 0), n5 = !r(t34) || t34 !== this._$AH && t34 !== b, n5 && (this._$AH = t34);
        else {
            const e8 = t34;
            let l5, h4;
            for(t34 = o10[0], l5 = 0; l5 < o10.length - 1; l5++)h4 = P(this, e8[s16 + l5], i33, l5), h4 === b && (h4 = this._$AH[l5]), n5 || (n5 = !r(h4) || h4 !== this._$AH[l5]), h4 === w ? t34 = w : t34 !== w && (t34 += (null != h4 ? h4 : "") + o10[l5 + 1]), this._$AH[l5] = h4;
        }
        n5 && !e9 && this.C(t34);
    }
    C(t35) {
        t35 === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t35 ? t35 : "");
    }
}
class M extends S {
    constructor(){
        super(...arguments), this.type = 3;
    }
    C(t36) {
        this.element[this.name] = t36 === w ? void 0 : t36;
    }
}
const k = i ? i.emptyScript : "";
class H extends S {
    constructor(){
        super(...arguments), this.type = 4;
    }
    C(t37) {
        t37 && t37 !== w ? this.element.setAttribute(this.name, k) : this.element.removeAttribute(this.name);
    }
}
class I extends S {
    constructor(t38, i34, s17, e10, o11){
        super(t38, i34, s17, e10, o11), this.type = 5;
    }
    _$AI(t39, i35 = this) {
        var s18;
        if ((t39 = null !== (s18 = P(this, t39, i35, 0)) && void 0 !== s18 ? s18 : w) === b) return;
        const e11 = this._$AH, o12 = t39 === w && e11 !== w || t39.capture !== e11.capture || t39.once !== e11.once || t39.passive !== e11.passive, n6 = t39 !== w && (e11 === w || o12);
        o12 && this.element.removeEventListener(this.name, this, e11), n6 && this.element.addEventListener(this.name, this, t39), this._$AH = t39;
    }
    handleEvent(t40) {
        var i36, s19;
        "function" == typeof this._$AH ? this._$AH.call(null !== (s19 = null === (i36 = this.options) || void 0 === i36 ? void 0 : i36.host) && void 0 !== s19 ? s19 : this.element, t40) : this._$AH.handleEvent(t40);
    }
}
class L {
    constructor(t41, i37, s20){
        this.element = t41, this.type = 6, this._$AN = void 0, this._$AM = i37, this.options = s20;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    _$AI(t42) {
        P(this, t42);
    }
}
const R = {
    L: "$lit$",
    P: e,
    V: o,
    I: 1,
    N: C,
    R: V,
    j: u,
    D: P,
    H: N,
    F: S,
    O: H,
    W: I,
    B: M,
    Z: L
}, z = window.litHtmlPolyfillSupport;
null == z || z(E, N), (null !== (t = globalThis.litHtmlVersions) && void 0 !== t ? t : globalThis.litHtmlVersions = []).push("2.2.5");

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9YxkX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "LitElement", ()=>s);
parcelHelpers.export(exports, "UpdatingElement", ()=>r);
parcelHelpers.export(exports, "_$LE", ()=>h);
var _reactiveElement = require("@lit/reactive-element");
var _litHtml = require("lit-html");
parcelHelpers.exportAll(_reactiveElement, exports);
parcelHelpers.exportAll(_litHtml, exports);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var l, o;
const r = (0, _reactiveElement.ReactiveElement);
class s extends (0, _reactiveElement.ReactiveElement) {
    constructor(){
        super(...arguments), this.renderOptions = {
            host: this
        }, this._$Dt = void 0;
    }
    createRenderRoot() {
        var t, e;
        const i = super.createRenderRoot();
        return null !== (t = (e = this.renderOptions).renderBefore) && void 0 !== t || (e.renderBefore = i.firstChild), i;
    }
    update(t) {
        const i = this.render();
        this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Dt = (0, _litHtml.render)(i, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
        var t;
        super.connectedCallback(), null === (t = this._$Dt) || void 0 === t || t.setConnected(!0);
    }
    disconnectedCallback() {
        var t;
        super.disconnectedCallback(), null === (t = this._$Dt) || void 0 === t || t.setConnected(!1);
    }
    render() {
        return 0, _litHtml.noChange;
    }
}
s.finalized = !0, s._$litElement$ = !0, null === (l = globalThis.litElementHydrateSupport) || void 0 === l || l.call(globalThis, {
    LitElement: s
});
const n = globalThis.litElementPolyfillSupport;
null == n || n({
    LitElement: s
});
const h = {
    _$AK: (t, e, i)=>{
        t._$AK(e, i);
    },
    _$AL: (t)=>t._$AL
};
(null !== (o = globalThis.litElementVersions) && void 0 !== o ? o : globalThis.litElementVersions = []).push("3.2.0");

},{"@lit/reactive-element":"hypet","lit-html":"1cmQt","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gAJMK":[function(require,module,exports) {
!function(e, t) {
    module.exports = t();
}(this, function() {
    "use strict";
    var A = window, S = A.document;
    var e1 = new function() {
        function u(e2, r) {
            return e2.replace(/\{(\d+)\}/g, function(e, t) {
                return r[t] || e;
            });
        }
        function l(e) {
            return e.join(" - ");
        }
        function h(e) {
            A.console.log(e);
        }
        function r1(e) {
            for(var t = S.querySelectorAll(e), r = 0; r < t.length; r++)t[r].style.display = "none";
        }
        var d = "copy", p = "share", f = "navigator.share(): ", n1 = "This feature is not supported on this browser or operating system.";
        function b(e) {
            return encodeURIComponent(e);
        }
        function m(e) {
            return decodeURIComponent(e);
        }
        this.i = function() {
            for(var e = S.querySelectorAll(".share-btn"), t = e.length; t--;)a1(e[t]);
            A.navigator.clipboard || (r1('[data-id="copy"]'), h("navigator.clipboard(): " + n1)), A.navigator.canShare || (r1('[data-id="share"]'), h(f + n1));
        };
        var a1 = function(e) {
            for(var t = e.querySelectorAll("a"), r = t.length; r--;)i1(t[r], {
                id: "",
                url: o1(e),
                title: c1(e),
                desc: s1(e)
            });
        }, i1 = function(e, t) {
            t.id = y(e, "data-id"), t.id && (w(e, "click"), g(e, "click", t));
        }, o1 = function(e) {
            return y(e, "data-url") || A.location.href || " ";
        }, c1 = function(e) {
            return y(e, "data-title") || S.title || " ";
        }, s1 = function(e) {
            var t = S.querySelector("meta[name=description]");
            return y(e, "data-desc") || t && y(t, "content") || " ";
        }, k = 0, v = {}, w = function(e, t) {
            var r = e.getAttribute("data-sharebtn-ref");
            r && (e.removeEventListener ? e.removeEventListener(t, v[r]) : e.detachEvent("on" + t, v[r + "ie"]));
        }, g = function(e, t, r) {
            function n() {
                x(r.id, r.url, r.title, r.desc);
            }
            function a() {
                n.call(e);
            }
            var i = e.getAttribute("data-sharebtn-ref");
            i || (i = ++k, e.setAttribute("data-sharebtn-ref", i)), v[i] = n, v[i + "ie"] = a, e.addEventListener ? e.addEventListener(t, n) : e.attachEvent("on" + t, a);
        }, y = function(e, t) {
            return e.getAttribute(t);
        }, x = function(e, t, r, n) {
            var a = b(t), i = b(n), o = b(r), c = o || i || "";
            switch(e){
                case "fb":
                    E(u("https://www.facebook.com/sharer/sharer.php?u={0}&quote={1}", [
                        a,
                        o
                    ]), r);
                    break;
                case "vk":
                    E(u("https://vk.com/share.php?url={0}&title={1}", [
                        a,
                        l([
                            o,
                            i
                        ])
                    ]), r);
                    break;
                case "tw":
                    E(u("https://twitter.com/intent/tweet?url={0}&text={1}", [
                        a,
                        l([
                            o,
                            i
                        ])
                    ]), r);
                    break;
                case "tg":
                    E(u("https://t.me/share/url?url={0}&text={1}", [
                        a,
                        l([
                            o,
                            i
                        ])
                    ]), r);
                    break;
                case "pk":
                    E(u("https://getpocket.com/edit?url={0}&title={1}", [
                        a,
                        l([
                            o,
                            i
                        ])
                    ]), r);
                    break;
                case "re":
                    E(u("https://reddit.com/submit?url={0}&title={1}", [
                        a,
                        o
                    ]), r);
                    break;
                case "ev":
                    E(u("https://www.evernote.com/clip.action?url={0}&t={1}", [
                        a,
                        o
                    ]), r);
                    break;
                case "in":
                    E(u("https://www.linkedin.com/shareArticle?mini=true&url={0}&title={1}&summary={2}&source={0}", [
                        a,
                        o,
                        l([
                            o,
                            i
                        ])
                    ]), r);
                    break;
                case "pi":
                    E(u("https://pinterest.com/pin/create/button/?url={0}&media={0}&description={1}", [
                        a,
                        l([
                            o,
                            i
                        ])
                    ]), r);
                    break;
                case "sk":
                    E(u("https://web.skype.com/share?url={0}&source=button&text={1}", [
                        a,
                        l([
                            o,
                            i
                        ])
                    ]), r);
                    break;
                case "wa":
                    E(u("https://wa.me/?text={0}%20{1}", [
                        l([
                            o,
                            i
                        ]),
                        a
                    ]), r);
                    break;
                case "ok":
                    E(u("https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&service=odnoklassniki&st.shareUrl={0}", [
                        a
                    ]), r);
                    break;
                case "tu":
                    E(u("https://www.tumblr.com/widgets/share/tool?posttype=link&title={0}&caption={0}&content={1}&canonicalUrl={1}&shareSource=tumblr_share_button", [
                        l([
                            o,
                            i
                        ]),
                        a
                    ]), r);
                    break;
                case "hn":
                    E(u("https://news.ycombinator.com/submitlink?t={0}&u={1}", [
                        l([
                            o,
                            i
                        ]),
                        a
                    ]), r);
                    break;
                case "xi":
                    E(u("https://www.xing.com/app/user?op=share;url={0};title={1}", [
                        a,
                        l([
                            o,
                            i
                        ])
                    ]), r);
                    break;
                case "mail":
                    0 < o.length && 0 < i.length && (c = l([
                        o,
                        i
                    ])), 0 < a.length && (c = c + " / " + a), A.location.href = u("mailto:?subject={0}&body={1}", [
                        o,
                        c
                    ]);
                    break;
                case "print":
                    A.print();
                    break;
                case d:
                    A.navigator.clipboard.writeText(m(a));
                    break;
                case p:
                    var s = {
                        title: c = m(l([
                            o,
                            i
                        ])),
                        text: c,
                        url: m(a)
                    };
                    A.navigator.share(s).then(function() {}).catch(function(e) {
                        h(f + "Error");
                    });
            }
        }, E = function(e, t) {
            var r = void 0 !== A.screenLeft ? A.screenLeft : screen.left, n = void 0 !== A.screenTop ? A.screenTop : screen.top, a = A.innerWidth || S.documentElement.clientWidth || screen.width, i = A.innerHeight || S.documentElement.clientHeight || screen.height, r = A.open(e, "", u("resizable,toolbar=yes,location=yes,scrollbars=yes,menubar=yes,width={0},height={1},top={2},left={3}", [
                600,
                400,
                i / 3 - 400 / 3 + n,
                a / 2 - 300 + r
            ]));
            null !== r && r.focus && r.focus();
        };
    };
    return e1.i(), {
        update: function() {
            e1.i();
        }
    };
});

},{}],"5KJj0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _unsafeHtmlJs = require("lit-html/directives/unsafe-html.js");
parcelHelpers.exportAll(_unsafeHtmlJs, exports);

},{"lit-html/directives/unsafe-html.js":"91pKz","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"91pKz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "UnsafeHTMLDirective", ()=>e);
parcelHelpers.export(exports, "unsafeHTML", ()=>o);
var _litHtmlJs = require("../lit-html.js");
var _directiveJs = require("../directive.js");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ class e extends (0, _directiveJs.Directive) {
    constructor(i){
        if (super(i), this.it = (0, _litHtmlJs.nothing), i.type !== (0, _directiveJs.PartType).CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
    }
    render(r) {
        if (r === (0, _litHtmlJs.nothing) || null == r) return this.ft = void 0, this.it = r;
        if (r === (0, _litHtmlJs.noChange)) return r;
        if ("string" != typeof r) throw Error(this.constructor.directiveName + "() called with a non-string value");
        if (r === this.it) return this.ft;
        this.it = r;
        const s = [
            r
        ];
        return s.raw = s, this.ft = {
            _$litType$: this.constructor.resultType,
            strings: s,
            values: []
        };
    }
}
e.directiveName = "unsafeHTML", e.resultType = 1;
const o = (0, _directiveJs.directive)(e);

},{"../lit-html.js":"1cmQt","../directive.js":"9lbyV","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9lbyV":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Directive", ()=>i);
parcelHelpers.export(exports, "PartType", ()=>t);
parcelHelpers.export(exports, "directive", ()=>e);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const t = {
    ATTRIBUTE: 1,
    CHILD: 2,
    PROPERTY: 3,
    BOOLEAN_ATTRIBUTE: 4,
    EVENT: 5,
    ELEMENT: 6
}, e = (t1)=>(...e1)=>({
            _$litDirective$: t1,
            values: e1
        });
class i {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9POI3":[function(require,module,exports) {
module.exports = "<svg enable-background=\"new 0 0 48 48\" id=\"Layer_1\" version=\"1.1\" viewBox=\"0 0 48 48\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <circle cx=\"24\" cy=\"24\" fill=\"#4E71A8\" r=\"24\"></circle>\n    <path d=\"M29.9,19.5h-4v-2.6c0-1,0.7-1.2,1.1-1.2c0.5,0,2.8,0,2.8,0v-4.4l-3.9,0c-4.4,0-5.3,3.3-5.3,5.3v2.9h-2.5V24  h2.5c0,5.8,0,12.7,0,12.7h5.3c0,0,0-7,0-12.7h3.6L29.9,19.5z\" fill=\"#FFFFFF\"></path>\n</svg>";

},{}],"4NlG7":[function(require,module,exports) {
module.exports = "<svg enable-background=\"new 0 0 48 48\" id=\"Layer_1\" version=\"1.1\" viewBox=\"0 0 48 48\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><circle cx=\"24\" cy=\"24\" fill=\"#1CB7EB\" r=\"24\"></circle>\n    <g><g><path d=\"M36.8,15.4c-0.9,0.5-2,0.8-3,0.9c1.1-0.7,1.9-1.8,2.3-3.1c-1,0.6-2.1,1.1-3.4,1.4c-1-1.1-2.3-1.8-3.8-1.8    c-2.9,0-5.3,2.5-5.3,5.7c0,0.4,0,0.9,0.1,1.3c-4.4-0.2-8.3-2.5-10.9-5.9c-0.5,0.8-0.7,1.8-0.7,2.9c0,2,0.9,3.7,2.3,4.7    c-0.9,0-1.7-0.3-2.4-0.7c0,0,0,0.1,0,0.1c0,2.7,1.8,5,4.2,5.6c-0.4,0.1-0.9,0.2-1.4,0.2c-0.3,0-0.7,0-1-0.1    c0.7,2.3,2.6,3.9,4.9,3.9c-1.8,1.5-4.1,2.4-6.5,2.4c-0.4,0-0.8,0-1.3-0.1c2.3,1.6,5.1,2.6,8.1,2.6c9.7,0,15-8.6,15-16.1    c0-0.2,0-0.5,0-0.7C35.2,17.6,36.1,16.6,36.8,15.4z\" fill=\"#FFFFFF\"></path></g></g></svg>";

},{}],"ipHGN":[function(require,module,exports) {
module.exports = "<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 418 418\" xml:space=\"preserve\">\r\n<g>\r\n    <circle cx=\"209\" cy=\"209\" r=\"205\" fill=\"#fff\"></circle>\r\n\t<path fill=\"#7AD06D\" d=\"M198.929,0.242C88.5,5.5,1.356,97.466,1.691,208.02c0.102,33.672,8.231,65.454,22.571,93.536\r\n\t\tL2.245,408.429c-1.191,5.781,4.023,10.843,9.766,9.483l104.723-24.811c26.905,13.402,57.125,21.143,89.108,21.631\r\n\t\tc112.869,1.724,206.982-87.897,210.5-200.724C420.113,93.065,320.295-5.538,198.929,0.242z M323.886,322.197\r\n\t\tc-30.669,30.669-71.446,47.559-114.818,47.559c-25.396,0-49.71-5.698-72.269-16.935l-14.584-7.265l-64.206,15.212l13.515-65.607\r\n\t\tl-7.185-14.07c-11.711-22.935-17.649-47.736-17.649-73.713c0-43.373,16.89-84.149,47.559-114.819\r\n\t\tc30.395-30.395,71.837-47.56,114.822-47.56C252.443,45,293.218,61.89,323.887,92.558c30.669,30.669,47.559,71.445,47.56,114.817\r\n\t\tC371.446,250.361,354.281,291.803,323.886,322.197z\"></path>\r\n    <path fill=\"#7AD06D\" d=\"M309.712,252.351l-40.169-11.534c-5.281-1.516-10.968-0.018-14.816,3.903l-9.823,10.008\r\n\t\tc-4.142,4.22-10.427,5.576-15.909,3.358c-19.002-7.69-58.974-43.23-69.182-61.007c-2.945-5.128-2.458-11.539,1.158-16.218\r\n\t\tl8.576-11.095c3.36-4.347,4.069-10.185,1.847-15.21l-16.9-38.223c-4.048-9.155-15.747-11.82-23.39-5.356\r\n\t\tc-11.211,9.482-24.513,23.891-26.13,39.854c-2.851,28.144,9.219,63.622,54.862,106.222c52.73,49.215,94.956,55.717,122.449,49.057\r\n\t\tc15.594-3.777,28.056-18.919,35.921-31.317C323.568,266.34,319.334,255.114,309.712,252.351z\"></path>\r\n</g>\r\n</svg>\r\n";

},{}],"1zPVq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "html", ()=>(0, _litHauntedJs.html));
parcelHelpers.export(exports, "render", ()=>(0, _litHauntedJs.render));
parcelHelpers.export(exports, "component", ()=>(0, _litHauntedJs.component));
parcelHelpers.export(exports, "createContext", ()=>(0, _litHauntedJs.createContext));
parcelHelpers.export(exports, "virtual", ()=>(0, _litHauntedJs.virtual));
parcelHelpers.export(exports, "default", ()=>(0, _coreJsDefault.default));
var _litHauntedJs = require("./lit-haunted.js");
var _coreJs = require("./core.js");
parcelHelpers.exportAll(_coreJs, exports);
var _coreJsDefault = parcelHelpers.interopDefault(_coreJs);

},{"./lit-haunted.js":"dCOYb","./core.js":"jm0WR","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dCOYb":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "component", ()=>component);
parcelHelpers.export(exports, "createContext", ()=>createContext);
parcelHelpers.export(exports, "virtual", ()=>virtual);
parcelHelpers.export(exports, "html", ()=>(0, _lit.html));
parcelHelpers.export(exports, "render", ()=>(0, _lit.render));
var _lit = require("lit");
var _coreJs = require("./core.js");
var _coreJsDefault = parcelHelpers.interopDefault(_coreJs);
var _virtualJs = require("./virtual.js");
const { component , createContext  } = (0, _coreJsDefault.default)({
    render: (0, _lit.render)
});
const virtual = (0, _virtualJs.makeVirtual)();

},{"lit":"4antt","./core.js":"jm0WR","./virtual.js":"er85R","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"er85R":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "makeVirtual", ()=>makeVirtual);
var _directiveJs = require("lit/directive.js");
var _lit = require("lit");
var _asyncDirectiveJs = require("lit/async-directive.js");
var _schedulerJs = require("./scheduler.js");
const includes = Array.prototype.includes;
const partToScheduler = new WeakMap();
const schedulerToPart = new WeakMap();
class Scheduler extends (0, _schedulerJs.BaseScheduler) {
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
        let part = schedulerToPart.get(this);
        partToScheduler.delete(part);
    }
}
function makeVirtual() {
    function virtual(renderer) {
        class VirtualDirective extends (0, _asyncDirectiveJs.AsyncDirective) {
            cont;
            constructor(partInfo){
                super(partInfo);
                this.cont = undefined;
            }
            update(part, args) {
                this.cont = partToScheduler.get(part);
                if (!this.cont || this.cont.renderer !== renderer) {
                    this.cont = new Scheduler(renderer, part, (r)=>{
                        this.setValue(r);
                    });
                    partToScheduler.set(part, this.cont);
                    schedulerToPart.set(this.cont, part);
                    teardownOnRemove(this.cont, part);
                }
                this.cont.args = args;
                this.cont.update();
                return this.render(args);
            }
            render(args) {
                return 0, _lit.noChange;
            }
        }
        return (0, _directiveJs.directive)(VirtualDirective);
    }
    return virtual;
}
function teardownOnRemove(cont, part, node = part.startNode) {
    let frag = node.parentNode;
    let mo = new MutationObserver((mutations)=>{
        for (let mutation of mutations){
            if (includes.call(mutation.removedNodes, node)) {
                mo.disconnect();
                if (node.parentNode instanceof ShadowRoot) teardownOnRemove(cont, part);
                else cont.teardown();
                break;
            } else if (includes.call(mutation.addedNodes, node.nextSibling)) {
                mo.disconnect();
                teardownOnRemove(cont, part, node.nextSibling || undefined);
                break;
            }
        }
    });
    mo.observe(frag, {
        childList: true
    });
}

},{"lit/directive.js":"9ojx0","lit":"4antt","lit/async-directive.js":"fVXah","./scheduler.js":"gpmTH","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9ojx0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _directiveJs = require("lit-html/directive.js");
parcelHelpers.exportAll(_directiveJs, exports);

},{"lit-html/directive.js":"9lbyV","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fVXah":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _asyncDirectiveJs = require("lit-html/async-directive.js");
parcelHelpers.exportAll(_asyncDirectiveJs, exports);

},{"lit-html/async-directive.js":"4f1Uv","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4f1Uv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "directive", ()=>(0, _directiveJs.directive));
parcelHelpers.export(exports, "AsyncDirective", ()=>d);
var _directiveHelpersJs = require("./directive-helpers.js");
var _directiveJs = require("./directive.js");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const e = (i, t)=>{
    var s, o1;
    const n1 = i._$AN;
    if (void 0 === n1) return !1;
    for (const i1 of n1)null === (o1 = (s = i1)._$AO) || void 0 === o1 || o1.call(s, t, !1), e(i1, t);
    return !0;
}, o = (i)=>{
    let t, s;
    do {
        if (void 0 === (t = i._$AM)) break;
        s = t._$AN, s.delete(i), i = t;
    }while (0 === (null == s ? void 0 : s.size));
}, n = (i)=>{
    for(let t; t = i._$AM; i = t){
        let s = t._$AN;
        if (void 0 === s) t._$AN = s = new Set;
        else if (s.has(i)) break;
        s.add(i), l(t);
    }
};
function r(i) {
    void 0 !== this._$AN ? (o(this), this._$AM = i, n(this)) : this._$AM = i;
}
function h(i, t = !1, s = 0) {
    const n2 = this._$AH, r1 = this._$AN;
    if (void 0 !== r1 && 0 !== r1.size) {
        if (t) {
            if (Array.isArray(n2)) for(let i = s; i < n2.length; i++)e(n2[i], !1), o(n2[i]);
            else null != n2 && (e(n2, !1), o(n2));
        } else e(this, i);
    }
}
const l = (i)=>{
    var t, e1, o2, n3;
    i.type == (0, _directiveJs.PartType).CHILD && (null !== (t = (o2 = i)._$AP) && void 0 !== t || (o2._$AP = h), null !== (e1 = (n3 = i)._$AQ) && void 0 !== e1 || (n3._$AQ = r));
};
class d extends (0, _directiveJs.Directive) {
    constructor(){
        super(...arguments), this._$AN = void 0;
    }
    _$AT(i, t, s) {
        super._$AT(i, t, s), n(this), this.isConnected = i._$AU;
    }
    _$AO(i, t = !0) {
        var s, n4;
        i !== this.isConnected && (this.isConnected = i, i ? null === (s = this.reconnected) || void 0 === s || s.call(this) : null === (n4 = this.disconnected) || void 0 === n4 || n4.call(this)), t && (e(this, i), o(this));
    }
    setValue(t) {
        if ((0, _directiveHelpersJs.isSingleExpression)(this._$Ct)) this._$Ct._$AI(t, this);
        else {
            const i = [
                ...this._$Ct._$AH
            ];
            i[this._$Ci] = t, this._$Ct._$AI(i, this, 0);
        }
    }
    disconnected() {}
    reconnected() {}
}

},{"./directive-helpers.js":"cJsxz","./directive.js":"9lbyV","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cJsxz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "TemplateResultType", ()=>n);
parcelHelpers.export(exports, "clearPart", ()=>p);
parcelHelpers.export(exports, "getCommittedValue", ()=>a);
parcelHelpers.export(exports, "getDirectiveClass", ()=>d);
parcelHelpers.export(exports, "insertPart", ()=>u);
parcelHelpers.export(exports, "isDirectiveResult", ()=>l);
parcelHelpers.export(exports, "isPrimitive", ()=>t);
parcelHelpers.export(exports, "isSingleExpression", ()=>r);
parcelHelpers.export(exports, "isTemplateResult", ()=>v);
parcelHelpers.export(exports, "removePart", ()=>m);
parcelHelpers.export(exports, "setChildPartValue", ()=>c);
parcelHelpers.export(exports, "setCommittedValue", ()=>s);
var _litHtmlJs = require("./lit-html.js");
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const { H: i  } = (0, _litHtmlJs._$LH), t = (o)=>null === o || "object" != typeof o && "function" != typeof o, n = {
    HTML: 1,
    SVG: 2
}, v = (o, i1)=>{
    var t1, n1;
    return void 0 === i1 ? void 0 !== (null === (t1 = o) || void 0 === t1 ? void 0 : t1._$litType$) : (null === (n1 = o) || void 0 === n1 ? void 0 : n1._$litType$) === i1;
}, l = (o)=>{
    var i2;
    return void 0 !== (null === (i2 = o) || void 0 === i2 ? void 0 : i2._$litDirective$);
}, d = (o)=>{
    var i3;
    return null === (i3 = o) || void 0 === i3 ? void 0 : i3._$litDirective$;
}, r = (o)=>void 0 === o.strings, e = ()=>document.createComment(""), u = (o, t2, n2)=>{
    var v2;
    const l1 = o._$AA.parentNode, d1 = void 0 === t2 ? o._$AB : t2._$AA;
    if (void 0 === n2) {
        const t3 = l1.insertBefore(e(), d1), v1 = l1.insertBefore(e(), d1);
        n2 = new i(t3, v1, o, o.options);
    } else {
        const i5 = n2._$AB.nextSibling, t4 = n2._$AM, r1 = t4 !== o;
        if (r1) {
            let i4;
            null === (v2 = n2._$AQ) || void 0 === v2 || v2.call(n2, o), n2._$AM = o, void 0 !== n2._$AP && (i4 = o._$AU) !== t4._$AU && n2._$AP(i4);
        }
        if (i5 !== d1 || r1) {
            let o = n2._$AA;
            for(; o !== i5;){
                const i6 = o.nextSibling;
                l1.insertBefore(o, d1), o = i6;
            }
        }
    }
    return n2;
}, c = (o, i7, t5 = o)=>(o._$AI(i7, t5), o), f = {}, s = (o, i8 = f)=>o._$AH = i8, a = (o)=>o._$AH, m = (o)=>{
    var i9;
    null === (i9 = o._$AP) || void 0 === i9 || i9.call(o, !1, !0);
    let t6 = o._$AA;
    const n3 = o._$AB.nextSibling;
    for(; t6 !== n3;){
        const o = t6.nextSibling;
        t6.remove(), t6 = o;
    }
}, p = (o)=>{
    o._$AR();
};

},{"./lit-html.js":"1cmQt","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7Ux3T":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "css", ()=>css);
let memory = [];
const css = (template, ...values)=>{
    let text = "";
    if (Array.isArray(template)) for(let i = 0; i < template.length; i++){
        text += template[i];
        text += values[i];
    }
    else text = template;
    if (memory.indexOf(text) > -1) return;
    let styleElement = document.createElement("style");
    styleElement.innerHTML = text;
    document.head.appendChild(styleElement);
    memory.push(text);
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["jkloN","gGED4"], "gGED4", "parcelRequireb699")

//# sourceMappingURL=index.d45053e0.js.map
