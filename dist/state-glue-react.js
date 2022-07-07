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
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire9622"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire9622"] = parcelRequire;
}
parcelRequire.register("8znKK", function(module, exports) {

$parcel$export(module.exports, "Children", () => $63d40475fa59e61e$export$dca3b0875bd9a954, (v) => $63d40475fa59e61e$export$dca3b0875bd9a954 = v);
$parcel$export(module.exports, "Component", () => $63d40475fa59e61e$export$16fa2f45be04daa8, (v) => $63d40475fa59e61e$export$16fa2f45be04daa8 = v);
$parcel$export(module.exports, "Fragment", () => $63d40475fa59e61e$export$ffb0004e005737fa, (v) => $63d40475fa59e61e$export$ffb0004e005737fa = v);
$parcel$export(module.exports, "Profiler", () => $63d40475fa59e61e$export$e2c29f18771995cb, (v) => $63d40475fa59e61e$export$e2c29f18771995cb = v);
$parcel$export(module.exports, "PureComponent", () => $63d40475fa59e61e$export$221d75b3f55bb0bd, (v) => $63d40475fa59e61e$export$221d75b3f55bb0bd = v);
$parcel$export(module.exports, "StrictMode", () => $63d40475fa59e61e$export$5f8d39834fd61797, (v) => $63d40475fa59e61e$export$5f8d39834fd61797 = v);
$parcel$export(module.exports, "Suspense", () => $63d40475fa59e61e$export$74bf444e3cd11ea5, (v) => $63d40475fa59e61e$export$74bf444e3cd11ea5 = v);
$parcel$export(module.exports, "__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED", () => $63d40475fa59e61e$export$ae55be85d98224ed, (v) => $63d40475fa59e61e$export$ae55be85d98224ed = v);
$parcel$export(module.exports, "cloneElement", () => $63d40475fa59e61e$export$e530037191fcd5d7, (v) => $63d40475fa59e61e$export$e530037191fcd5d7 = v);
$parcel$export(module.exports, "createContext", () => $63d40475fa59e61e$export$fd42f52fd3ae1109, (v) => $63d40475fa59e61e$export$fd42f52fd3ae1109 = v);
$parcel$export(module.exports, "createElement", () => $63d40475fa59e61e$export$c8a8987d4410bf2d, (v) => $63d40475fa59e61e$export$c8a8987d4410bf2d = v);
$parcel$export(module.exports, "createFactory", () => $63d40475fa59e61e$export$d38cd72104c1f0e9, (v) => $63d40475fa59e61e$export$d38cd72104c1f0e9 = v);
$parcel$export(module.exports, "createRef", () => $63d40475fa59e61e$export$7d1e3a5e95ceca43, (v) => $63d40475fa59e61e$export$7d1e3a5e95ceca43 = v);
$parcel$export(module.exports, "forwardRef", () => $63d40475fa59e61e$export$257a8862b851cb5b, (v) => $63d40475fa59e61e$export$257a8862b851cb5b = v);
$parcel$export(module.exports, "isValidElement", () => $63d40475fa59e61e$export$a8257692ac88316c, (v) => $63d40475fa59e61e$export$a8257692ac88316c = v);
$parcel$export(module.exports, "lazy", () => $63d40475fa59e61e$export$488013bae63b21da, (v) => $63d40475fa59e61e$export$488013bae63b21da = v);
$parcel$export(module.exports, "memo", () => $63d40475fa59e61e$export$7c73462e0d25e514, (v) => $63d40475fa59e61e$export$7c73462e0d25e514 = v);
$parcel$export(module.exports, "startTransition", () => $63d40475fa59e61e$export$7568632d0d33d16d, (v) => $63d40475fa59e61e$export$7568632d0d33d16d = v);
$parcel$export(module.exports, "unstable_act", () => $63d40475fa59e61e$export$88948ce120ea2619, (v) => $63d40475fa59e61e$export$88948ce120ea2619 = v);
$parcel$export(module.exports, "useCallback", () => $63d40475fa59e61e$export$35808ee640e87ca7, (v) => $63d40475fa59e61e$export$35808ee640e87ca7 = v);
$parcel$export(module.exports, "useContext", () => $63d40475fa59e61e$export$fae74005e78b1a27, (v) => $63d40475fa59e61e$export$fae74005e78b1a27 = v);
$parcel$export(module.exports, "useDebugValue", () => $63d40475fa59e61e$export$dc8fbce3eb94dc1e, (v) => $63d40475fa59e61e$export$dc8fbce3eb94dc1e = v);
$parcel$export(module.exports, "useDeferredValue", () => $63d40475fa59e61e$export$6a7bc4e911dc01cf, (v) => $63d40475fa59e61e$export$6a7bc4e911dc01cf = v);
$parcel$export(module.exports, "useEffect", () => $63d40475fa59e61e$export$6d9c69b0de29b591, (v) => $63d40475fa59e61e$export$6d9c69b0de29b591 = v);
$parcel$export(module.exports, "useId", () => $63d40475fa59e61e$export$f680877a34711e37, (v) => $63d40475fa59e61e$export$f680877a34711e37 = v);
$parcel$export(module.exports, "useImperativeHandle", () => $63d40475fa59e61e$export$d5a552a76deda3c2, (v) => $63d40475fa59e61e$export$d5a552a76deda3c2 = v);
$parcel$export(module.exports, "useInsertionEffect", () => $63d40475fa59e61e$export$aaabe4eda9ed9969, (v) => $63d40475fa59e61e$export$aaabe4eda9ed9969 = v);
$parcel$export(module.exports, "useLayoutEffect", () => $63d40475fa59e61e$export$e5c5a5f917a5871c, (v) => $63d40475fa59e61e$export$e5c5a5f917a5871c = v);
$parcel$export(module.exports, "useMemo", () => $63d40475fa59e61e$export$1538c33de8887b59, (v) => $63d40475fa59e61e$export$1538c33de8887b59 = v);
$parcel$export(module.exports, "useReducer", () => $63d40475fa59e61e$export$13e3392192263954, (v) => $63d40475fa59e61e$export$13e3392192263954 = v);
$parcel$export(module.exports, "useRef", () => $63d40475fa59e61e$export$b8f5890fc79d6aca, (v) => $63d40475fa59e61e$export$b8f5890fc79d6aca = v);
$parcel$export(module.exports, "useState", () => $63d40475fa59e61e$export$60241385465d0a34, (v) => $63d40475fa59e61e$export$60241385465d0a34 = v);
$parcel$export(module.exports, "useSyncExternalStore", () => $63d40475fa59e61e$export$306c0aa65ff9ec16, (v) => $63d40475fa59e61e$export$306c0aa65ff9ec16 = v);
$parcel$export(module.exports, "useTransition", () => $63d40475fa59e61e$export$7b286972b8d8ccbf, (v) => $63d40475fa59e61e$export$7b286972b8d8ccbf = v);
$parcel$export(module.exports, "version", () => $63d40475fa59e61e$export$83d89fbfd8236492, (v) => $63d40475fa59e61e$export$83d89fbfd8236492 = v);
var $63d40475fa59e61e$export$dca3b0875bd9a954;
var $63d40475fa59e61e$export$16fa2f45be04daa8;
var $63d40475fa59e61e$export$ffb0004e005737fa;
var $63d40475fa59e61e$export$e2c29f18771995cb;
var $63d40475fa59e61e$export$221d75b3f55bb0bd;
var $63d40475fa59e61e$export$5f8d39834fd61797;
var $63d40475fa59e61e$export$74bf444e3cd11ea5;
var $63d40475fa59e61e$export$ae55be85d98224ed;
var $63d40475fa59e61e$export$e530037191fcd5d7;
var $63d40475fa59e61e$export$fd42f52fd3ae1109;
var $63d40475fa59e61e$export$c8a8987d4410bf2d;
var $63d40475fa59e61e$export$d38cd72104c1f0e9;
var $63d40475fa59e61e$export$7d1e3a5e95ceca43;
var $63d40475fa59e61e$export$257a8862b851cb5b;
var $63d40475fa59e61e$export$a8257692ac88316c;
var $63d40475fa59e61e$export$488013bae63b21da;
var $63d40475fa59e61e$export$7c73462e0d25e514;
var $63d40475fa59e61e$export$7568632d0d33d16d;
var $63d40475fa59e61e$export$88948ce120ea2619;
var $63d40475fa59e61e$export$35808ee640e87ca7;
var $63d40475fa59e61e$export$fae74005e78b1a27;
var $63d40475fa59e61e$export$dc8fbce3eb94dc1e;
var $63d40475fa59e61e$export$6a7bc4e911dc01cf;
var $63d40475fa59e61e$export$6d9c69b0de29b591;
var $63d40475fa59e61e$export$f680877a34711e37;
var $63d40475fa59e61e$export$d5a552a76deda3c2;
var $63d40475fa59e61e$export$aaabe4eda9ed9969;
var $63d40475fa59e61e$export$e5c5a5f917a5871c;
var $63d40475fa59e61e$export$1538c33de8887b59;
var $63d40475fa59e61e$export$13e3392192263954;
var $63d40475fa59e61e$export$b8f5890fc79d6aca;
var $63d40475fa59e61e$export$60241385465d0a34;
var $63d40475fa59e61e$export$306c0aa65ff9ec16;
var $63d40475fa59e61e$export$7b286972b8d8ccbf;
var $63d40475fa59e61e$export$83d89fbfd8236492;
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
var $63d40475fa59e61e$var$l = Symbol.for("react.element"), $63d40475fa59e61e$var$n = Symbol.for("react.portal"), $63d40475fa59e61e$var$p = Symbol.for("react.fragment"), $63d40475fa59e61e$var$q = Symbol.for("react.strict_mode"), $63d40475fa59e61e$var$r = Symbol.for("react.profiler"), $63d40475fa59e61e$var$t = Symbol.for("react.provider"), $63d40475fa59e61e$var$u = Symbol.for("react.context"), $63d40475fa59e61e$var$v = Symbol.for("react.forward_ref"), $63d40475fa59e61e$var$w = Symbol.for("react.suspense"), $63d40475fa59e61e$var$x = Symbol.for("react.memo"), $63d40475fa59e61e$var$y = Symbol.for("react.lazy"), $63d40475fa59e61e$var$z = Symbol.iterator;
function $63d40475fa59e61e$var$A(a) {
    if (null === a || "object" !== typeof a) return null;
    a = $63d40475fa59e61e$var$z && a[$63d40475fa59e61e$var$z] || a["@@iterator"];
    return "function" === typeof a ? a : null;
}
var $63d40475fa59e61e$var$B = {
    isMounted: function() {
        return !1;
    },
    enqueueForceUpdate: function() {},
    enqueueReplaceState: function() {},
    enqueueSetState: function() {}
}, $63d40475fa59e61e$var$C = Object.assign, $63d40475fa59e61e$var$D = {};
function $63d40475fa59e61e$var$E(a, b, e) {
    this.props = a;
    this.context = b;
    this.refs = $63d40475fa59e61e$var$D;
    this.updater = e || $63d40475fa59e61e$var$B;
}
$63d40475fa59e61e$var$E.prototype.isReactComponent = {};
$63d40475fa59e61e$var$E.prototype.setState = function(a, b) {
    if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, a, b, "setState");
};
$63d40475fa59e61e$var$E.prototype.forceUpdate = function(a) {
    this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};
function $63d40475fa59e61e$var$F() {}
$63d40475fa59e61e$var$F.prototype = $63d40475fa59e61e$var$E.prototype;
function $63d40475fa59e61e$var$G(a, b, e) {
    this.props = a;
    this.context = b;
    this.refs = $63d40475fa59e61e$var$D;
    this.updater = e || $63d40475fa59e61e$var$B;
}
var $63d40475fa59e61e$var$H = $63d40475fa59e61e$var$G.prototype = new $63d40475fa59e61e$var$F;
$63d40475fa59e61e$var$H.constructor = $63d40475fa59e61e$var$G;
$63d40475fa59e61e$var$C($63d40475fa59e61e$var$H, $63d40475fa59e61e$var$E.prototype);
$63d40475fa59e61e$var$H.isPureReactComponent = !0;
var $63d40475fa59e61e$var$I = Array.isArray, $63d40475fa59e61e$var$J = Object.prototype.hasOwnProperty, $63d40475fa59e61e$var$K = {
    current: null
}, $63d40475fa59e61e$var$L = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
};
function $63d40475fa59e61e$var$M(a, b, e) {
    var d, c = {}, k = null, h = null;
    if (null != b) for(d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b)$63d40475fa59e61e$var$J.call(b, d) && !$63d40475fa59e61e$var$L.hasOwnProperty(d) && (c[d] = b[d]);
    var g = arguments.length - 2;
    if (1 === g) c.children = e;
    else if (1 < g) {
        for(var f = Array(g), m = 0; m < g; m++)f[m] = arguments[m + 2];
        c.children = f;
    }
    if (a && a.defaultProps) for(d in g = a.defaultProps, g)void 0 === c[d] && (c[d] = g[d]);
    return {
        $$typeof: $63d40475fa59e61e$var$l,
        type: a,
        key: k,
        ref: h,
        props: c,
        _owner: $63d40475fa59e61e$var$K.current
    };
}
function $63d40475fa59e61e$var$N(a, b) {
    return {
        $$typeof: $63d40475fa59e61e$var$l,
        type: a.type,
        key: b,
        ref: a.ref,
        props: a.props,
        _owner: a._owner
    };
}
function $63d40475fa59e61e$var$O(a) {
    return "object" === typeof a && null !== a && a.$$typeof === $63d40475fa59e61e$var$l;
}
function $63d40475fa59e61e$var$escape(a1) {
    var b = {
        "=": "=0",
        ":": "=2"
    };
    return "$" + a1.replace(/[=:]/g, function(a) {
        return b[a];
    });
}
var $63d40475fa59e61e$var$P = /\/+/g;
function $63d40475fa59e61e$var$Q(a, b) {
    return "object" === typeof a && null !== a && null != a.key ? $63d40475fa59e61e$var$escape("" + a.key) : b.toString(36);
}
function $63d40475fa59e61e$var$R(a2, b, e, d, c) {
    var k = typeof a2;
    if ("undefined" === k || "boolean" === k) a2 = null;
    var h = !1;
    if (null === a2) h = !0;
    else switch(k){
        case "string":
        case "number":
            h = !0;
            break;
        case "object":
            switch(a2.$$typeof){
                case $63d40475fa59e61e$var$l:
                case $63d40475fa59e61e$var$n:
                    h = !0;
            }
    }
    if (h) return h = a2, c = c(h), a2 = "" === d ? "." + $63d40475fa59e61e$var$Q(h, 0) : d, $63d40475fa59e61e$var$I(c) ? (e = "", null != a2 && (e = a2.replace($63d40475fa59e61e$var$P, "$&/") + "/"), $63d40475fa59e61e$var$R(c, b, e, "", function(a) {
        return a;
    })) : null != c && ($63d40475fa59e61e$var$O(c) && (c = $63d40475fa59e61e$var$N(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace($63d40475fa59e61e$var$P, "$&/") + "/") + a2)), b.push(c)), 1;
    h = 0;
    d = "" === d ? "." : d + ":";
    if ($63d40475fa59e61e$var$I(a2)) for(var g = 0; g < a2.length; g++){
        k = a2[g];
        var f = d + $63d40475fa59e61e$var$Q(k, g);
        h += $63d40475fa59e61e$var$R(k, b, e, f, c);
    }
    else if (f = $63d40475fa59e61e$var$A(a2), "function" === typeof f) for(a2 = f.call(a2), g = 0; !(k = a2.next()).done;)k = k.value, f = d + $63d40475fa59e61e$var$Q(k, g++), h += $63d40475fa59e61e$var$R(k, b, e, f, c);
    else if ("object" === k) throw b = String(a2), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a2).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
    return h;
}
function $63d40475fa59e61e$var$S(a3, b, e) {
    if (null == a3) return a3;
    var d = [], c = 0;
    $63d40475fa59e61e$var$R(a3, d, "", "", function(a) {
        return b.call(e, a, c++);
    });
    return d;
}
function $63d40475fa59e61e$var$T(a) {
    if (-1 === a._status) {
        var b1 = a._result;
        b1 = b1();
        b1.then(function(b) {
            if (0 === a._status || -1 === a._status) a._status = 1, a._result = b;
        }, function(b) {
            if (0 === a._status || -1 === a._status) a._status = 2, a._result = b;
        });
        -1 === a._status && (a._status = 0, a._result = b1);
    }
    if (1 === a._status) return a._result.default;
    throw a._result;
}
var $63d40475fa59e61e$var$U = {
    current: null
}, $63d40475fa59e61e$var$V = {
    transition: null
}, $63d40475fa59e61e$var$W = {
    ReactCurrentDispatcher: $63d40475fa59e61e$var$U,
    ReactCurrentBatchConfig: $63d40475fa59e61e$var$V,
    ReactCurrentOwner: $63d40475fa59e61e$var$K
};
$63d40475fa59e61e$export$dca3b0875bd9a954 = {
    map: $63d40475fa59e61e$var$S,
    forEach: function(a, b, e) {
        $63d40475fa59e61e$var$S(a, function() {
            b.apply(this, arguments);
        }, e);
    },
    count: function(a) {
        var b = 0;
        $63d40475fa59e61e$var$S(a, function() {
            b++;
        });
        return b;
    },
    toArray: function(a4) {
        return $63d40475fa59e61e$var$S(a4, function(a) {
            return a;
        }) || [];
    },
    only: function(a) {
        if (!$63d40475fa59e61e$var$O(a)) throw Error("React.Children.only expected to receive a single React element child.");
        return a;
    }
};
$63d40475fa59e61e$export$16fa2f45be04daa8 = $63d40475fa59e61e$var$E;
$63d40475fa59e61e$export$ffb0004e005737fa = $63d40475fa59e61e$var$p;
$63d40475fa59e61e$export$e2c29f18771995cb = $63d40475fa59e61e$var$r;
$63d40475fa59e61e$export$221d75b3f55bb0bd = $63d40475fa59e61e$var$G;
$63d40475fa59e61e$export$5f8d39834fd61797 = $63d40475fa59e61e$var$q;
$63d40475fa59e61e$export$74bf444e3cd11ea5 = $63d40475fa59e61e$var$w;
$63d40475fa59e61e$export$ae55be85d98224ed = $63d40475fa59e61e$var$W;
$63d40475fa59e61e$export$e530037191fcd5d7 = function(a, b, e) {
    if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
    var d = $63d40475fa59e61e$var$C({}, a.props), c = a.key, k = a.ref, h = a._owner;
    if (null != b) {
        void 0 !== b.ref && (k = b.ref, h = $63d40475fa59e61e$var$K.current);
        void 0 !== b.key && (c = "" + b.key);
        if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
        for(f in b)$63d40475fa59e61e$var$J.call(b, f) && !$63d40475fa59e61e$var$L.hasOwnProperty(f) && (d[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
    }
    var f = arguments.length - 2;
    if (1 === f) d.children = e;
    else if (1 < f) {
        g = Array(f);
        for(var m = 0; m < f; m++)g[m] = arguments[m + 2];
        d.children = g;
    }
    return {
        $$typeof: $63d40475fa59e61e$var$l,
        type: a.type,
        key: c,
        ref: k,
        props: d,
        _owner: h
    };
};
$63d40475fa59e61e$export$fd42f52fd3ae1109 = function(a) {
    a = {
        $$typeof: $63d40475fa59e61e$var$u,
        _currentValue: a,
        _currentValue2: a,
        _threadCount: 0,
        Provider: null,
        Consumer: null,
        _defaultValue: null,
        _globalName: null
    };
    a.Provider = {
        $$typeof: $63d40475fa59e61e$var$t,
        _context: a
    };
    return a.Consumer = a;
};
$63d40475fa59e61e$export$c8a8987d4410bf2d = $63d40475fa59e61e$var$M;
$63d40475fa59e61e$export$d38cd72104c1f0e9 = function(a) {
    var b = $63d40475fa59e61e$var$M.bind(null, a);
    b.type = a;
    return b;
};
$63d40475fa59e61e$export$7d1e3a5e95ceca43 = function() {
    return {
        current: null
    };
};
$63d40475fa59e61e$export$257a8862b851cb5b = function(a) {
    return {
        $$typeof: $63d40475fa59e61e$var$v,
        render: a
    };
};
$63d40475fa59e61e$export$a8257692ac88316c = $63d40475fa59e61e$var$O;
$63d40475fa59e61e$export$488013bae63b21da = function(a) {
    return {
        $$typeof: $63d40475fa59e61e$var$y,
        _payload: {
            _status: -1,
            _result: a
        },
        _init: $63d40475fa59e61e$var$T
    };
};
$63d40475fa59e61e$export$7c73462e0d25e514 = function(a, b) {
    return {
        $$typeof: $63d40475fa59e61e$var$x,
        type: a,
        compare: void 0 === b ? null : b
    };
};
$63d40475fa59e61e$export$7568632d0d33d16d = function(a) {
    var b = $63d40475fa59e61e$var$V.transition;
    $63d40475fa59e61e$var$V.transition = {};
    try {
        a();
    } finally{
        $63d40475fa59e61e$var$V.transition = b;
    }
};
$63d40475fa59e61e$export$88948ce120ea2619 = function() {
    throw Error("act(...) is not supported in production builds of React.");
};
$63d40475fa59e61e$export$35808ee640e87ca7 = function(a, b) {
    return $63d40475fa59e61e$var$U.current.useCallback(a, b);
};
$63d40475fa59e61e$export$fae74005e78b1a27 = function(a) {
    return $63d40475fa59e61e$var$U.current.useContext(a);
};
$63d40475fa59e61e$export$dc8fbce3eb94dc1e = function() {};
$63d40475fa59e61e$export$6a7bc4e911dc01cf = function(a) {
    return $63d40475fa59e61e$var$U.current.useDeferredValue(a);
};
$63d40475fa59e61e$export$6d9c69b0de29b591 = function(a, b) {
    return $63d40475fa59e61e$var$U.current.useEffect(a, b);
};
$63d40475fa59e61e$export$f680877a34711e37 = function() {
    return $63d40475fa59e61e$var$U.current.useId();
};
$63d40475fa59e61e$export$d5a552a76deda3c2 = function(a, b, e) {
    return $63d40475fa59e61e$var$U.current.useImperativeHandle(a, b, e);
};
$63d40475fa59e61e$export$aaabe4eda9ed9969 = function(a, b) {
    return $63d40475fa59e61e$var$U.current.useInsertionEffect(a, b);
};
$63d40475fa59e61e$export$e5c5a5f917a5871c = function(a, b) {
    return $63d40475fa59e61e$var$U.current.useLayoutEffect(a, b);
};
$63d40475fa59e61e$export$1538c33de8887b59 = function(a, b) {
    return $63d40475fa59e61e$var$U.current.useMemo(a, b);
};
$63d40475fa59e61e$export$13e3392192263954 = function(a, b, e) {
    return $63d40475fa59e61e$var$U.current.useReducer(a, b, e);
};
$63d40475fa59e61e$export$b8f5890fc79d6aca = function(a) {
    return $63d40475fa59e61e$var$U.current.useRef(a);
};
$63d40475fa59e61e$export$60241385465d0a34 = function(a) {
    return $63d40475fa59e61e$var$U.current.useState(a);
};
$63d40475fa59e61e$export$306c0aa65ff9ec16 = function(a, b, e) {
    return $63d40475fa59e61e$var$U.current.useSyncExternalStore(a, b, e);
};
$63d40475fa59e61e$export$7b286972b8d8ccbf = function() {
    return $63d40475fa59e61e$var$U.current.useTransition();
};
$63d40475fa59e61e$export$83d89fbfd8236492 = "18.2.0";

});


$parcel$export(module.exports, "useGlue", () => $488d3b45ea1a037c$export$eed9a2a671845c2c);
const $cf0409fc16cb98dc$export$bd89b0cf3447f70 = (useState, useEffect)=>function useGlue(externalState, logId) {
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


var $bf7eb6dee7272a34$exports = {};
"use strict";

$bf7eb6dee7272a34$exports = (parcelRequire("8znKK"));


const $488d3b45ea1a037c$export$eed9a2a671845c2c = (0, $cf0409fc16cb98dc$export$bd89b0cf3447f70)((0, $bf7eb6dee7272a34$exports.useState), (0, $bf7eb6dee7272a34$exports.useEffect));




//# sourceMappingURL=state-glue-react.js.map
