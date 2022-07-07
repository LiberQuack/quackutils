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
parcelRequire.register("bh4lA", function(module, exports) {

$parcel$export(module.exports, "Children", () => $8354a7813bd9882a$export$dca3b0875bd9a954, (v) => $8354a7813bd9882a$export$dca3b0875bd9a954 = v);
$parcel$export(module.exports, "Component", () => $8354a7813bd9882a$export$16fa2f45be04daa8, (v) => $8354a7813bd9882a$export$16fa2f45be04daa8 = v);
$parcel$export(module.exports, "Fragment", () => $8354a7813bd9882a$export$ffb0004e005737fa, (v) => $8354a7813bd9882a$export$ffb0004e005737fa = v);
$parcel$export(module.exports, "Profiler", () => $8354a7813bd9882a$export$e2c29f18771995cb, (v) => $8354a7813bd9882a$export$e2c29f18771995cb = v);
$parcel$export(module.exports, "PureComponent", () => $8354a7813bd9882a$export$221d75b3f55bb0bd, (v) => $8354a7813bd9882a$export$221d75b3f55bb0bd = v);
$parcel$export(module.exports, "StrictMode", () => $8354a7813bd9882a$export$5f8d39834fd61797, (v) => $8354a7813bd9882a$export$5f8d39834fd61797 = v);
$parcel$export(module.exports, "Suspense", () => $8354a7813bd9882a$export$74bf444e3cd11ea5, (v) => $8354a7813bd9882a$export$74bf444e3cd11ea5 = v);
$parcel$export(module.exports, "__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED", () => $8354a7813bd9882a$export$ae55be85d98224ed, (v) => $8354a7813bd9882a$export$ae55be85d98224ed = v);
$parcel$export(module.exports, "cloneElement", () => $8354a7813bd9882a$export$e530037191fcd5d7, (v) => $8354a7813bd9882a$export$e530037191fcd5d7 = v);
$parcel$export(module.exports, "createContext", () => $8354a7813bd9882a$export$fd42f52fd3ae1109, (v) => $8354a7813bd9882a$export$fd42f52fd3ae1109 = v);
$parcel$export(module.exports, "createElement", () => $8354a7813bd9882a$export$c8a8987d4410bf2d, (v) => $8354a7813bd9882a$export$c8a8987d4410bf2d = v);
$parcel$export(module.exports, "createFactory", () => $8354a7813bd9882a$export$d38cd72104c1f0e9, (v) => $8354a7813bd9882a$export$d38cd72104c1f0e9 = v);
$parcel$export(module.exports, "createRef", () => $8354a7813bd9882a$export$7d1e3a5e95ceca43, (v) => $8354a7813bd9882a$export$7d1e3a5e95ceca43 = v);
$parcel$export(module.exports, "forwardRef", () => $8354a7813bd9882a$export$257a8862b851cb5b, (v) => $8354a7813bd9882a$export$257a8862b851cb5b = v);
$parcel$export(module.exports, "isValidElement", () => $8354a7813bd9882a$export$a8257692ac88316c, (v) => $8354a7813bd9882a$export$a8257692ac88316c = v);
$parcel$export(module.exports, "lazy", () => $8354a7813bd9882a$export$488013bae63b21da, (v) => $8354a7813bd9882a$export$488013bae63b21da = v);
$parcel$export(module.exports, "memo", () => $8354a7813bd9882a$export$7c73462e0d25e514, (v) => $8354a7813bd9882a$export$7c73462e0d25e514 = v);
$parcel$export(module.exports, "startTransition", () => $8354a7813bd9882a$export$7568632d0d33d16d, (v) => $8354a7813bd9882a$export$7568632d0d33d16d = v);
$parcel$export(module.exports, "unstable_act", () => $8354a7813bd9882a$export$88948ce120ea2619, (v) => $8354a7813bd9882a$export$88948ce120ea2619 = v);
$parcel$export(module.exports, "useCallback", () => $8354a7813bd9882a$export$35808ee640e87ca7, (v) => $8354a7813bd9882a$export$35808ee640e87ca7 = v);
$parcel$export(module.exports, "useContext", () => $8354a7813bd9882a$export$fae74005e78b1a27, (v) => $8354a7813bd9882a$export$fae74005e78b1a27 = v);
$parcel$export(module.exports, "useDebugValue", () => $8354a7813bd9882a$export$dc8fbce3eb94dc1e, (v) => $8354a7813bd9882a$export$dc8fbce3eb94dc1e = v);
$parcel$export(module.exports, "useDeferredValue", () => $8354a7813bd9882a$export$6a7bc4e911dc01cf, (v) => $8354a7813bd9882a$export$6a7bc4e911dc01cf = v);
$parcel$export(module.exports, "useEffect", () => $8354a7813bd9882a$export$6d9c69b0de29b591, (v) => $8354a7813bd9882a$export$6d9c69b0de29b591 = v);
$parcel$export(module.exports, "useId", () => $8354a7813bd9882a$export$f680877a34711e37, (v) => $8354a7813bd9882a$export$f680877a34711e37 = v);
$parcel$export(module.exports, "useImperativeHandle", () => $8354a7813bd9882a$export$d5a552a76deda3c2, (v) => $8354a7813bd9882a$export$d5a552a76deda3c2 = v);
$parcel$export(module.exports, "useInsertionEffect", () => $8354a7813bd9882a$export$aaabe4eda9ed9969, (v) => $8354a7813bd9882a$export$aaabe4eda9ed9969 = v);
$parcel$export(module.exports, "useLayoutEffect", () => $8354a7813bd9882a$export$e5c5a5f917a5871c, (v) => $8354a7813bd9882a$export$e5c5a5f917a5871c = v);
$parcel$export(module.exports, "useMemo", () => $8354a7813bd9882a$export$1538c33de8887b59, (v) => $8354a7813bd9882a$export$1538c33de8887b59 = v);
$parcel$export(module.exports, "useReducer", () => $8354a7813bd9882a$export$13e3392192263954, (v) => $8354a7813bd9882a$export$13e3392192263954 = v);
$parcel$export(module.exports, "useRef", () => $8354a7813bd9882a$export$b8f5890fc79d6aca, (v) => $8354a7813bd9882a$export$b8f5890fc79d6aca = v);
$parcel$export(module.exports, "useState", () => $8354a7813bd9882a$export$60241385465d0a34, (v) => $8354a7813bd9882a$export$60241385465d0a34 = v);
$parcel$export(module.exports, "useSyncExternalStore", () => $8354a7813bd9882a$export$306c0aa65ff9ec16, (v) => $8354a7813bd9882a$export$306c0aa65ff9ec16 = v);
$parcel$export(module.exports, "useTransition", () => $8354a7813bd9882a$export$7b286972b8d8ccbf, (v) => $8354a7813bd9882a$export$7b286972b8d8ccbf = v);
$parcel$export(module.exports, "version", () => $8354a7813bd9882a$export$83d89fbfd8236492, (v) => $8354a7813bd9882a$export$83d89fbfd8236492 = v);
var $8354a7813bd9882a$export$dca3b0875bd9a954;
var $8354a7813bd9882a$export$16fa2f45be04daa8;
var $8354a7813bd9882a$export$ffb0004e005737fa;
var $8354a7813bd9882a$export$e2c29f18771995cb;
var $8354a7813bd9882a$export$221d75b3f55bb0bd;
var $8354a7813bd9882a$export$5f8d39834fd61797;
var $8354a7813bd9882a$export$74bf444e3cd11ea5;
var $8354a7813bd9882a$export$ae55be85d98224ed;
var $8354a7813bd9882a$export$e530037191fcd5d7;
var $8354a7813bd9882a$export$fd42f52fd3ae1109;
var $8354a7813bd9882a$export$c8a8987d4410bf2d;
var $8354a7813bd9882a$export$d38cd72104c1f0e9;
var $8354a7813bd9882a$export$7d1e3a5e95ceca43;
var $8354a7813bd9882a$export$257a8862b851cb5b;
var $8354a7813bd9882a$export$a8257692ac88316c;
var $8354a7813bd9882a$export$488013bae63b21da;
var $8354a7813bd9882a$export$7c73462e0d25e514;
var $8354a7813bd9882a$export$7568632d0d33d16d;
var $8354a7813bd9882a$export$88948ce120ea2619;
var $8354a7813bd9882a$export$35808ee640e87ca7;
var $8354a7813bd9882a$export$fae74005e78b1a27;
var $8354a7813bd9882a$export$dc8fbce3eb94dc1e;
var $8354a7813bd9882a$export$6a7bc4e911dc01cf;
var $8354a7813bd9882a$export$6d9c69b0de29b591;
var $8354a7813bd9882a$export$f680877a34711e37;
var $8354a7813bd9882a$export$d5a552a76deda3c2;
var $8354a7813bd9882a$export$aaabe4eda9ed9969;
var $8354a7813bd9882a$export$e5c5a5f917a5871c;
var $8354a7813bd9882a$export$1538c33de8887b59;
var $8354a7813bd9882a$export$13e3392192263954;
var $8354a7813bd9882a$export$b8f5890fc79d6aca;
var $8354a7813bd9882a$export$60241385465d0a34;
var $8354a7813bd9882a$export$306c0aa65ff9ec16;
var $8354a7813bd9882a$export$7b286972b8d8ccbf;
var $8354a7813bd9882a$export$83d89fbfd8236492;
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
var $8354a7813bd9882a$var$l = Symbol.for("react.element"), $8354a7813bd9882a$var$n = Symbol.for("react.portal"), $8354a7813bd9882a$var$p = Symbol.for("react.fragment"), $8354a7813bd9882a$var$q = Symbol.for("react.strict_mode"), $8354a7813bd9882a$var$r = Symbol.for("react.profiler"), $8354a7813bd9882a$var$t = Symbol.for("react.provider"), $8354a7813bd9882a$var$u = Symbol.for("react.context"), $8354a7813bd9882a$var$v = Symbol.for("react.forward_ref"), $8354a7813bd9882a$var$w = Symbol.for("react.suspense"), $8354a7813bd9882a$var$x = Symbol.for("react.memo"), $8354a7813bd9882a$var$y = Symbol.for("react.lazy"), $8354a7813bd9882a$var$z = Symbol.iterator;
function $8354a7813bd9882a$var$A(a) {
    if (null === a || "object" !== typeof a) return null;
    a = $8354a7813bd9882a$var$z && a[$8354a7813bd9882a$var$z] || a["@@iterator"];
    return "function" === typeof a ? a : null;
}
var $8354a7813bd9882a$var$B = {
    isMounted: function() {
        return !1;
    },
    enqueueForceUpdate: function() {},
    enqueueReplaceState: function() {},
    enqueueSetState: function() {}
}, $8354a7813bd9882a$var$C = Object.assign, $8354a7813bd9882a$var$D = {};
function $8354a7813bd9882a$var$E(a, b, e) {
    this.props = a;
    this.context = b;
    this.refs = $8354a7813bd9882a$var$D;
    this.updater = e || $8354a7813bd9882a$var$B;
}
$8354a7813bd9882a$var$E.prototype.isReactComponent = {};
$8354a7813bd9882a$var$E.prototype.setState = function(a, b) {
    if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, a, b, "setState");
};
$8354a7813bd9882a$var$E.prototype.forceUpdate = function(a) {
    this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};
function $8354a7813bd9882a$var$F() {}
$8354a7813bd9882a$var$F.prototype = $8354a7813bd9882a$var$E.prototype;
function $8354a7813bd9882a$var$G(a, b, e) {
    this.props = a;
    this.context = b;
    this.refs = $8354a7813bd9882a$var$D;
    this.updater = e || $8354a7813bd9882a$var$B;
}
var $8354a7813bd9882a$var$H = $8354a7813bd9882a$var$G.prototype = new $8354a7813bd9882a$var$F;
$8354a7813bd9882a$var$H.constructor = $8354a7813bd9882a$var$G;
$8354a7813bd9882a$var$C($8354a7813bd9882a$var$H, $8354a7813bd9882a$var$E.prototype);
$8354a7813bd9882a$var$H.isPureReactComponent = !0;
var $8354a7813bd9882a$var$I = Array.isArray, $8354a7813bd9882a$var$J = Object.prototype.hasOwnProperty, $8354a7813bd9882a$var$K = {
    current: null
}, $8354a7813bd9882a$var$L = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
};
function $8354a7813bd9882a$var$M(a, b, e) {
    var d, c = {}, k = null, h = null;
    if (null != b) for(d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b)$8354a7813bd9882a$var$J.call(b, d) && !$8354a7813bd9882a$var$L.hasOwnProperty(d) && (c[d] = b[d]);
    var g = arguments.length - 2;
    if (1 === g) c.children = e;
    else if (1 < g) {
        for(var f = Array(g), m = 0; m < g; m++)f[m] = arguments[m + 2];
        c.children = f;
    }
    if (a && a.defaultProps) for(d in g = a.defaultProps, g)void 0 === c[d] && (c[d] = g[d]);
    return {
        $$typeof: $8354a7813bd9882a$var$l,
        type: a,
        key: k,
        ref: h,
        props: c,
        _owner: $8354a7813bd9882a$var$K.current
    };
}
function $8354a7813bd9882a$var$N(a, b) {
    return {
        $$typeof: $8354a7813bd9882a$var$l,
        type: a.type,
        key: b,
        ref: a.ref,
        props: a.props,
        _owner: a._owner
    };
}
function $8354a7813bd9882a$var$O(a) {
    return "object" === typeof a && null !== a && a.$$typeof === $8354a7813bd9882a$var$l;
}
function $8354a7813bd9882a$var$escape(a1) {
    var b = {
        "=": "=0",
        ":": "=2"
    };
    return "$" + a1.replace(/[=:]/g, function(a) {
        return b[a];
    });
}
var $8354a7813bd9882a$var$P = /\/+/g;
function $8354a7813bd9882a$var$Q(a, b) {
    return "object" === typeof a && null !== a && null != a.key ? $8354a7813bd9882a$var$escape("" + a.key) : b.toString(36);
}
function $8354a7813bd9882a$var$R(a2, b, e, d, c) {
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
                case $8354a7813bd9882a$var$l:
                case $8354a7813bd9882a$var$n:
                    h = !0;
            }
    }
    if (h) return h = a2, c = c(h), a2 = "" === d ? "." + $8354a7813bd9882a$var$Q(h, 0) : d, $8354a7813bd9882a$var$I(c) ? (e = "", null != a2 && (e = a2.replace($8354a7813bd9882a$var$P, "$&/") + "/"), $8354a7813bd9882a$var$R(c, b, e, "", function(a) {
        return a;
    })) : null != c && ($8354a7813bd9882a$var$O(c) && (c = $8354a7813bd9882a$var$N(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace($8354a7813bd9882a$var$P, "$&/") + "/") + a2)), b.push(c)), 1;
    h = 0;
    d = "" === d ? "." : d + ":";
    if ($8354a7813bd9882a$var$I(a2)) for(var g = 0; g < a2.length; g++){
        k = a2[g];
        var f = d + $8354a7813bd9882a$var$Q(k, g);
        h += $8354a7813bd9882a$var$R(k, b, e, f, c);
    }
    else if (f = $8354a7813bd9882a$var$A(a2), "function" === typeof f) for(a2 = f.call(a2), g = 0; !(k = a2.next()).done;)k = k.value, f = d + $8354a7813bd9882a$var$Q(k, g++), h += $8354a7813bd9882a$var$R(k, b, e, f, c);
    else if ("object" === k) throw b = String(a2), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a2).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
    return h;
}
function $8354a7813bd9882a$var$S(a3, b, e) {
    if (null == a3) return a3;
    var d = [], c = 0;
    $8354a7813bd9882a$var$R(a3, d, "", "", function(a) {
        return b.call(e, a, c++);
    });
    return d;
}
function $8354a7813bd9882a$var$T(a) {
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
var $8354a7813bd9882a$var$U = {
    current: null
}, $8354a7813bd9882a$var$V = {
    transition: null
}, $8354a7813bd9882a$var$W = {
    ReactCurrentDispatcher: $8354a7813bd9882a$var$U,
    ReactCurrentBatchConfig: $8354a7813bd9882a$var$V,
    ReactCurrentOwner: $8354a7813bd9882a$var$K
};
$8354a7813bd9882a$export$dca3b0875bd9a954 = {
    map: $8354a7813bd9882a$var$S,
    forEach: function(a, b, e) {
        $8354a7813bd9882a$var$S(a, function() {
            b.apply(this, arguments);
        }, e);
    },
    count: function(a) {
        var b = 0;
        $8354a7813bd9882a$var$S(a, function() {
            b++;
        });
        return b;
    },
    toArray: function(a4) {
        return $8354a7813bd9882a$var$S(a4, function(a) {
            return a;
        }) || [];
    },
    only: function(a) {
        if (!$8354a7813bd9882a$var$O(a)) throw Error("React.Children.only expected to receive a single React element child.");
        return a;
    }
};
$8354a7813bd9882a$export$16fa2f45be04daa8 = $8354a7813bd9882a$var$E;
$8354a7813bd9882a$export$ffb0004e005737fa = $8354a7813bd9882a$var$p;
$8354a7813bd9882a$export$e2c29f18771995cb = $8354a7813bd9882a$var$r;
$8354a7813bd9882a$export$221d75b3f55bb0bd = $8354a7813bd9882a$var$G;
$8354a7813bd9882a$export$5f8d39834fd61797 = $8354a7813bd9882a$var$q;
$8354a7813bd9882a$export$74bf444e3cd11ea5 = $8354a7813bd9882a$var$w;
$8354a7813bd9882a$export$ae55be85d98224ed = $8354a7813bd9882a$var$W;
$8354a7813bd9882a$export$e530037191fcd5d7 = function(a, b, e) {
    if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
    var d = $8354a7813bd9882a$var$C({}, a.props), c = a.key, k = a.ref, h = a._owner;
    if (null != b) {
        void 0 !== b.ref && (k = b.ref, h = $8354a7813bd9882a$var$K.current);
        void 0 !== b.key && (c = "" + b.key);
        if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
        for(f in b)$8354a7813bd9882a$var$J.call(b, f) && !$8354a7813bd9882a$var$L.hasOwnProperty(f) && (d[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
    }
    var f = arguments.length - 2;
    if (1 === f) d.children = e;
    else if (1 < f) {
        g = Array(f);
        for(var m = 0; m < f; m++)g[m] = arguments[m + 2];
        d.children = g;
    }
    return {
        $$typeof: $8354a7813bd9882a$var$l,
        type: a.type,
        key: c,
        ref: k,
        props: d,
        _owner: h
    };
};
$8354a7813bd9882a$export$fd42f52fd3ae1109 = function(a) {
    a = {
        $$typeof: $8354a7813bd9882a$var$u,
        _currentValue: a,
        _currentValue2: a,
        _threadCount: 0,
        Provider: null,
        Consumer: null,
        _defaultValue: null,
        _globalName: null
    };
    a.Provider = {
        $$typeof: $8354a7813bd9882a$var$t,
        _context: a
    };
    return a.Consumer = a;
};
$8354a7813bd9882a$export$c8a8987d4410bf2d = $8354a7813bd9882a$var$M;
$8354a7813bd9882a$export$d38cd72104c1f0e9 = function(a) {
    var b = $8354a7813bd9882a$var$M.bind(null, a);
    b.type = a;
    return b;
};
$8354a7813bd9882a$export$7d1e3a5e95ceca43 = function() {
    return {
        current: null
    };
};
$8354a7813bd9882a$export$257a8862b851cb5b = function(a) {
    return {
        $$typeof: $8354a7813bd9882a$var$v,
        render: a
    };
};
$8354a7813bd9882a$export$a8257692ac88316c = $8354a7813bd9882a$var$O;
$8354a7813bd9882a$export$488013bae63b21da = function(a) {
    return {
        $$typeof: $8354a7813bd9882a$var$y,
        _payload: {
            _status: -1,
            _result: a
        },
        _init: $8354a7813bd9882a$var$T
    };
};
$8354a7813bd9882a$export$7c73462e0d25e514 = function(a, b) {
    return {
        $$typeof: $8354a7813bd9882a$var$x,
        type: a,
        compare: void 0 === b ? null : b
    };
};
$8354a7813bd9882a$export$7568632d0d33d16d = function(a) {
    var b = $8354a7813bd9882a$var$V.transition;
    $8354a7813bd9882a$var$V.transition = {};
    try {
        a();
    } finally{
        $8354a7813bd9882a$var$V.transition = b;
    }
};
$8354a7813bd9882a$export$88948ce120ea2619 = function() {
    throw Error("act(...) is not supported in production builds of React.");
};
$8354a7813bd9882a$export$35808ee640e87ca7 = function(a, b) {
    return $8354a7813bd9882a$var$U.current.useCallback(a, b);
};
$8354a7813bd9882a$export$fae74005e78b1a27 = function(a) {
    return $8354a7813bd9882a$var$U.current.useContext(a);
};
$8354a7813bd9882a$export$dc8fbce3eb94dc1e = function() {};
$8354a7813bd9882a$export$6a7bc4e911dc01cf = function(a) {
    return $8354a7813bd9882a$var$U.current.useDeferredValue(a);
};
$8354a7813bd9882a$export$6d9c69b0de29b591 = function(a, b) {
    return $8354a7813bd9882a$var$U.current.useEffect(a, b);
};
$8354a7813bd9882a$export$f680877a34711e37 = function() {
    return $8354a7813bd9882a$var$U.current.useId();
};
$8354a7813bd9882a$export$d5a552a76deda3c2 = function(a, b, e) {
    return $8354a7813bd9882a$var$U.current.useImperativeHandle(a, b, e);
};
$8354a7813bd9882a$export$aaabe4eda9ed9969 = function(a, b) {
    return $8354a7813bd9882a$var$U.current.useInsertionEffect(a, b);
};
$8354a7813bd9882a$export$e5c5a5f917a5871c = function(a, b) {
    return $8354a7813bd9882a$var$U.current.useLayoutEffect(a, b);
};
$8354a7813bd9882a$export$1538c33de8887b59 = function(a, b) {
    return $8354a7813bd9882a$var$U.current.useMemo(a, b);
};
$8354a7813bd9882a$export$13e3392192263954 = function(a, b, e) {
    return $8354a7813bd9882a$var$U.current.useReducer(a, b, e);
};
$8354a7813bd9882a$export$b8f5890fc79d6aca = function(a) {
    return $8354a7813bd9882a$var$U.current.useRef(a);
};
$8354a7813bd9882a$export$60241385465d0a34 = function(a) {
    return $8354a7813bd9882a$var$U.current.useState(a);
};
$8354a7813bd9882a$export$306c0aa65ff9ec16 = function(a, b, e) {
    return $8354a7813bd9882a$var$U.current.useSyncExternalStore(a, b, e);
};
$8354a7813bd9882a$export$7b286972b8d8ccbf = function() {
    return $8354a7813bd9882a$var$U.current.useTransition();
};
$8354a7813bd9882a$export$83d89fbfd8236492 = "18.2.0";

});

function $ee0a7948b60988aa$var$n(n1) {
    for(var r1 = arguments.length, t1 = Array(r1 > 1 ? r1 - 1 : 0), e1 = 1; e1 < r1; e1++)t1[e1 - 1] = arguments[e1];
    var i, o;
    throw Error("[Immer] minified error nr: " + n1 + (t1.length ? " " + t1.map(function(n2) {
        return "'" + n2 + "'";
    }).join(",") : "") + ". Find the full error at: https://bit.ly/3cXEKWf");
}
function $ee0a7948b60988aa$export$541ac630993a4c84(n3) {
    return !!n3 && !!n3[$ee0a7948b60988aa$var$Q];
}
function $ee0a7948b60988aa$export$16e3aed3edb85946(n4) {
    return !!n4 && (function(n5) {
        if (!n5 || "object" != typeof n5) return !1;
        var r2 = Object.getPrototypeOf(n5);
        if (null === r2) return !0;
        var t2 = Object.hasOwnProperty.call(r2, "constructor") && r2.constructor;
        return t2 === Object || "function" == typeof t2 && Function.toString.call(t2) === $ee0a7948b60988aa$var$Z;
    }(n4) || Array.isArray(n4) || !!n4[$ee0a7948b60988aa$export$6ee2082928bcb0ee] || !!n4.constructor[$ee0a7948b60988aa$export$6ee2082928bcb0ee] || $ee0a7948b60988aa$var$s(n4) || $ee0a7948b60988aa$var$v(n4));
}
function $ee0a7948b60988aa$export$22e8af3f75a010e3(t3) {
    return $ee0a7948b60988aa$export$541ac630993a4c84(t3) || $ee0a7948b60988aa$var$n(23, t3), t3[$ee0a7948b60988aa$var$Q].t;
}
function $ee0a7948b60988aa$var$i(n6, r3, t4) {
    void 0 === t4 && (t4 = !1), 0 === $ee0a7948b60988aa$var$o(n6) ? (t4 ? Object.keys : $ee0a7948b60988aa$var$nn)(n6).forEach(function(e2) {
        t4 && "symbol" == typeof e2 || r3(e2, n6[e2], n6);
    }) : n6.forEach(function(t5, e3) {
        return r3(e3, t5, n6);
    });
}
function $ee0a7948b60988aa$var$o(n7) {
    var r4 = n7[$ee0a7948b60988aa$var$Q];
    return r4 ? r4.i > 3 ? r4.i - 4 : r4.i : Array.isArray(n7) ? 1 : $ee0a7948b60988aa$var$s(n7) ? 2 : $ee0a7948b60988aa$var$v(n7) ? 3 : 0;
}
function $ee0a7948b60988aa$var$u(n8, r5) {
    return 2 === $ee0a7948b60988aa$var$o(n8) ? n8.has(r5) : Object.prototype.hasOwnProperty.call(n8, r5);
}
function $ee0a7948b60988aa$var$a(n9, r6) {
    return 2 === $ee0a7948b60988aa$var$o(n9) ? n9.get(r6) : n9[r6];
}
function $ee0a7948b60988aa$var$f(n10, r7, t6) {
    var e4 = $ee0a7948b60988aa$var$o(n10);
    2 === e4 ? n10.set(r7, t6) : 3 === e4 ? (n10.delete(r7), n10.add(t6)) : n10[r7] = t6;
}
function $ee0a7948b60988aa$var$c(n11, r8) {
    return n11 === r8 ? 0 !== n11 || 1 / n11 == 1 / r8 : n11 != n11 && r8 != r8;
}
function $ee0a7948b60988aa$var$s(n12) {
    return $ee0a7948b60988aa$var$X && n12 instanceof Map;
}
function $ee0a7948b60988aa$var$v(n13) {
    return $ee0a7948b60988aa$var$q && n13 instanceof Set;
}
function $ee0a7948b60988aa$var$p(n14) {
    return n14.o || n14.t;
}
function $ee0a7948b60988aa$var$l(n15) {
    if (Array.isArray(n15)) return Array.prototype.slice.call(n15);
    var r9 = $ee0a7948b60988aa$var$rn(n15);
    delete r9[$ee0a7948b60988aa$var$Q];
    for(var t7 = $ee0a7948b60988aa$var$nn(r9), e5 = 0; e5 < t7.length; e5++){
        var i1 = t7[e5], o1 = r9[i1];
        !1 === o1.writable && (o1.writable = !0, o1.configurable = !0), (o1.get || o1.set) && (r9[i1] = {
            configurable: !0,
            writable: !0,
            enumerable: o1.enumerable,
            value: n15[i1]
        });
    }
    return Object.create(Object.getPrototypeOf(n15), r9);
}
function $ee0a7948b60988aa$export$792f3d81ea979f55(n16, e6) {
    return void 0 === e6 && (e6 = !1), $ee0a7948b60988aa$var$y(n16) || $ee0a7948b60988aa$export$541ac630993a4c84(n16) || !$ee0a7948b60988aa$export$16e3aed3edb85946(n16) ? n16 : ($ee0a7948b60988aa$var$o(n16) > 1 && (n16.set = n16.add = n16.clear = n16.delete = $ee0a7948b60988aa$var$h), Object.freeze(n16), e6 && $ee0a7948b60988aa$var$i(n16, function(n, r10) {
        return $ee0a7948b60988aa$export$792f3d81ea979f55(r10, !0);
    }, !0), n16);
}
function $ee0a7948b60988aa$var$h() {
    $ee0a7948b60988aa$var$n(2);
}
function $ee0a7948b60988aa$var$y(n17) {
    return null == n17 || "object" != typeof n17 || Object.isFrozen(n17);
}
function $ee0a7948b60988aa$var$b(r11) {
    var t8 = $ee0a7948b60988aa$var$tn[r11];
    return t8 || $ee0a7948b60988aa$var$n(18, r11), t8;
}
function $ee0a7948b60988aa$var$m(n18, r12) {
    $ee0a7948b60988aa$var$tn[n18] || ($ee0a7948b60988aa$var$tn[n18] = r12);
}
function $ee0a7948b60988aa$var$_() {
    return $ee0a7948b60988aa$var$U;
}
function $ee0a7948b60988aa$var$j(n19, r13) {
    r13 && ($ee0a7948b60988aa$var$b("Patches"), n19.u = [], n19.s = [], n19.v = r13);
}
function $ee0a7948b60988aa$var$O(n20) {
    $ee0a7948b60988aa$var$g(n20), n20.p.forEach($ee0a7948b60988aa$var$S), n20.p = null;
}
function $ee0a7948b60988aa$var$g(n21) {
    n21 === $ee0a7948b60988aa$var$U && ($ee0a7948b60988aa$var$U = n21.l);
}
function $ee0a7948b60988aa$var$w(n22) {
    return $ee0a7948b60988aa$var$U = {
        p: [],
        l: $ee0a7948b60988aa$var$U,
        h: n22,
        m: !0,
        _: 0
    };
}
function $ee0a7948b60988aa$var$S(n23) {
    var r14 = n23[$ee0a7948b60988aa$var$Q];
    0 === r14.i || 1 === r14.i ? r14.j() : r14.O = !0;
}
function $ee0a7948b60988aa$var$P(r15, e7) {
    e7._ = e7.p.length;
    var i2 = e7.p[0], o2 = void 0 !== r15 && r15 !== i2;
    return e7.h.g || $ee0a7948b60988aa$var$b("ES5").S(e7, r15, o2), o2 ? (i2[$ee0a7948b60988aa$var$Q].P && ($ee0a7948b60988aa$var$O(e7), $ee0a7948b60988aa$var$n(4)), $ee0a7948b60988aa$export$16e3aed3edb85946(r15) && (r15 = $ee0a7948b60988aa$var$M(e7, r15), e7.l || $ee0a7948b60988aa$var$x(e7, r15)), e7.u && $ee0a7948b60988aa$var$b("Patches").M(i2[$ee0a7948b60988aa$var$Q].t, r15, e7.u, e7.s)) : r15 = $ee0a7948b60988aa$var$M(e7, i2, []), $ee0a7948b60988aa$var$O(e7), e7.u && e7.v(e7.u, e7.s), r15 !== $ee0a7948b60988aa$export$45b790e32b2810ee ? r15 : void 0;
}
function $ee0a7948b60988aa$var$M(n24, r16, t9) {
    if ($ee0a7948b60988aa$var$y(r16)) return r16;
    var e8 = r16[$ee0a7948b60988aa$var$Q];
    if (!e8) return $ee0a7948b60988aa$var$i(r16, function(i3, o4) {
        return $ee0a7948b60988aa$var$A(n24, e8, r16, i3, o4, t9);
    }, !0), r16;
    if (e8.A !== n24) return r16;
    if (!e8.P) return $ee0a7948b60988aa$var$x(n24, e8.t, !0), e8.t;
    if (!e8.I) {
        e8.I = !0, e8.A._--;
        var o3 = 4 === e8.i || 5 === e8.i ? e8.o = $ee0a7948b60988aa$var$l(e8.k) : e8.o;
        $ee0a7948b60988aa$var$i(3 === e8.i ? new Set(o3) : o3, function(r17, i4) {
            return $ee0a7948b60988aa$var$A(n24, e8, o3, r17, i4, t9);
        }), $ee0a7948b60988aa$var$x(n24, o3, !1), t9 && n24.u && $ee0a7948b60988aa$var$b("Patches").R(e8, t9, n24.u, n24.s);
    }
    return e8.o;
}
function $ee0a7948b60988aa$var$A(e9, i5, o5, a1, c1, s1) {
    if ($ee0a7948b60988aa$export$541ac630993a4c84(c1)) {
        var v1 = $ee0a7948b60988aa$var$M(e9, c1, s1 && i5 && 3 !== i5.i && !$ee0a7948b60988aa$var$u(i5.D, a1) ? s1.concat(a1) : void 0);
        if ($ee0a7948b60988aa$var$f(o5, a1, v1), !$ee0a7948b60988aa$export$541ac630993a4c84(v1)) return;
        e9.m = !1;
    }
    if ($ee0a7948b60988aa$export$16e3aed3edb85946(c1) && !$ee0a7948b60988aa$var$y(c1)) {
        if (!e9.h.F && e9._ < 1) return;
        $ee0a7948b60988aa$var$M(e9, c1), i5 && i5.A.l || $ee0a7948b60988aa$var$x(e9, c1);
    }
}
function $ee0a7948b60988aa$var$x(n25, r18, t10) {
    void 0 === t10 && (t10 = !1), n25.h.F && n25.m && $ee0a7948b60988aa$export$792f3d81ea979f55(r18, t10);
}
function $ee0a7948b60988aa$var$z(n26, r19) {
    var t11 = n26[$ee0a7948b60988aa$var$Q];
    return (t11 ? $ee0a7948b60988aa$var$p(t11) : n26)[r19];
}
function $ee0a7948b60988aa$var$I(n27, r20) {
    if (r20 in n27) for(var t12 = Object.getPrototypeOf(n27); t12;){
        var e10 = Object.getOwnPropertyDescriptor(t12, r20);
        if (e10) return e10;
        t12 = Object.getPrototypeOf(t12);
    }
}
function $ee0a7948b60988aa$var$k(n28) {
    n28.P || (n28.P = !0, n28.l && $ee0a7948b60988aa$var$k(n28.l));
}
function $ee0a7948b60988aa$var$E(n29) {
    n29.o || (n29.o = $ee0a7948b60988aa$var$l(n29.t));
}
function $ee0a7948b60988aa$var$R(n30, r21, t13) {
    var e11 = $ee0a7948b60988aa$var$s(r21) ? $ee0a7948b60988aa$var$b("MapSet").N(r21, t13) : $ee0a7948b60988aa$var$v(r21) ? $ee0a7948b60988aa$var$b("MapSet").T(r21, t13) : n30.g ? function(n31, r22) {
        var t14 = Array.isArray(n31), e12 = {
            i: t14 ? 1 : 0,
            A: r22 ? r22.A : $ee0a7948b60988aa$var$_(),
            P: !1,
            I: !1,
            D: {},
            l: r22,
            t: n31,
            k: null,
            o: null,
            j: null,
            C: !1
        }, i6 = e12, o6 = $ee0a7948b60988aa$var$en;
        t14 && (i6 = [
            e12
        ], o6 = $ee0a7948b60988aa$var$on);
        var u1 = Proxy.revocable(i6, o6), a2 = u1.revoke, f1 = u1.proxy;
        return e12.k = f1, e12.j = a2, f1;
    }(r21, t13) : $ee0a7948b60988aa$var$b("ES5").J(r21, t13);
    return (t13 ? t13.A : $ee0a7948b60988aa$var$_()).p.push(e11), e11;
}
function $ee0a7948b60988aa$export$97aac956da55dae9(e13) {
    return $ee0a7948b60988aa$export$541ac630993a4c84(e13) || $ee0a7948b60988aa$var$n(22, e13), function n32(r23) {
        if (!$ee0a7948b60988aa$export$16e3aed3edb85946(r23)) return r23;
        var e14, u2 = r23[$ee0a7948b60988aa$var$Q], c2 = $ee0a7948b60988aa$var$o(r23);
        if (u2) {
            if (!u2.P && (u2.i < 4 || !$ee0a7948b60988aa$var$b("ES5").K(u2))) return u2.t;
            u2.I = !0, e14 = $ee0a7948b60988aa$var$F(r23, c2), u2.I = !1;
        } else e14 = $ee0a7948b60988aa$var$F(r23, c2);
        return $ee0a7948b60988aa$var$i(e14, function(r24, t15) {
            u2 && $ee0a7948b60988aa$var$a(u2.t, r24) === t15 || $ee0a7948b60988aa$var$f(e14, r24, n32(t15));
        }), 3 === c2 ? new Set(e14) : e14;
    }(e13);
}
function $ee0a7948b60988aa$var$F(n33, r25) {
    switch(r25){
        case 2:
            return new Map(n33);
        case 3:
            return Array.from(n33);
    }
    return $ee0a7948b60988aa$var$l(n33);
}
function $ee0a7948b60988aa$export$56771cf63ee491f5() {
    function t16(n34, r26) {
        var t17 = s2[n34];
        return t17 ? t17.enumerable = r26 : s2[n34] = t17 = {
            configurable: !0,
            enumerable: r26,
            get: function() {
                var r27 = this[$ee0a7948b60988aa$var$Q];
                return $ee0a7948b60988aa$var$en.get(r27, n34);
            },
            set: function(r28) {
                var t18 = this[$ee0a7948b60988aa$var$Q];
                $ee0a7948b60988aa$var$en.set(t18, n34, r28);
            }
        }, t17;
    }
    function e15(n35) {
        for(var r29 = n35.length - 1; r29 >= 0; r29--){
            var t19 = n35[r29][$ee0a7948b60988aa$var$Q];
            if (!t19.P) switch(t19.i){
                case 5:
                    a3(t19) && $ee0a7948b60988aa$var$k(t19);
                    break;
                case 4:
                    o7(t19) && $ee0a7948b60988aa$var$k(t19);
            }
        }
    }
    function o7(n36) {
        for(var r30 = n36.t, t20 = n36.k, e16 = $ee0a7948b60988aa$var$nn(t20), i7 = e16.length - 1; i7 >= 0; i7--){
            var o8 = e16[i7];
            if (o8 !== $ee0a7948b60988aa$var$Q) {
                var a4 = r30[o8];
                if (void 0 === a4 && !$ee0a7948b60988aa$var$u(r30, o8)) return !0;
                var f3 = t20[o8], s3 = f3 && f3[$ee0a7948b60988aa$var$Q];
                if (s3 ? s3.t !== a4 : !$ee0a7948b60988aa$var$c(f3, a4)) return !0;
            }
        }
        var v2 = !!r30[$ee0a7948b60988aa$var$Q];
        return e16.length !== $ee0a7948b60988aa$var$nn(r30).length + (v2 ? 0 : 1);
    }
    function a3(n37) {
        var r31 = n37.k;
        if (r31.length !== n37.t.length) return !0;
        var t21 = Object.getOwnPropertyDescriptor(r31, r31.length - 1);
        if (t21 && !t21.get) return !0;
        for(var e17 = 0; e17 < r31.length; e17++)if (!r31.hasOwnProperty(e17)) return !0;
        return !1;
    }
    function f2(r32) {
        r32.O && $ee0a7948b60988aa$var$n(3, JSON.stringify($ee0a7948b60988aa$var$p(r32)));
    }
    var s2 = {};
    $ee0a7948b60988aa$var$m("ES5", {
        J: function(n38, r33) {
            var e18 = Array.isArray(n38), i8 = function(n39, r34) {
                if (n39) {
                    for(var e19 = Array(r34.length), i9 = 0; i9 < r34.length; i9++)Object.defineProperty(e19, "" + i9, t16(i9, !0));
                    return e19;
                }
                var o10 = $ee0a7948b60988aa$var$rn(r34);
                delete o10[$ee0a7948b60988aa$var$Q];
                for(var u3 = $ee0a7948b60988aa$var$nn(o10), a5 = 0; a5 < u3.length; a5++){
                    var f4 = u3[a5];
                    o10[f4] = t16(f4, n39 || !!o10[f4].enumerable);
                }
                return Object.create(Object.getPrototypeOf(r34), o10);
            }(e18, n38), o9 = {
                i: e18 ? 5 : 4,
                A: r33 ? r33.A : $ee0a7948b60988aa$var$_(),
                P: !1,
                I: !1,
                D: {},
                l: r33,
                t: n38,
                k: i8,
                o: null,
                O: !1,
                C: !1
            };
            return Object.defineProperty(i8, $ee0a7948b60988aa$var$Q, {
                value: o9,
                writable: !0
            }), i8;
        },
        S: function(n40, t22, o11) {
            o11 ? $ee0a7948b60988aa$export$541ac630993a4c84(t22) && t22[$ee0a7948b60988aa$var$Q].A === n40 && e15(n40.p) : (n40.u && function n41(r35) {
                if (r35 && "object" == typeof r35) {
                    var t23 = r35[$ee0a7948b60988aa$var$Q];
                    if (t23) {
                        var e20 = t23.t, o12 = t23.k, f5 = t23.D, c3 = t23.i;
                        if (4 === c3) $ee0a7948b60988aa$var$i(o12, function(r36) {
                            r36 !== $ee0a7948b60988aa$var$Q && (void 0 !== e20[r36] || $ee0a7948b60988aa$var$u(e20, r36) ? f5[r36] || n41(o12[r36]) : (f5[r36] = !0, $ee0a7948b60988aa$var$k(t23)));
                        }), $ee0a7948b60988aa$var$i(e20, function(n42) {
                            void 0 !== o12[n42] || $ee0a7948b60988aa$var$u(o12, n42) || (f5[n42] = !1, $ee0a7948b60988aa$var$k(t23));
                        });
                        else if (5 === c3) {
                            if (a3(t23) && ($ee0a7948b60988aa$var$k(t23), f5.length = !0), o12.length < e20.length) for(var s4 = o12.length; s4 < e20.length; s4++)f5[s4] = !1;
                            else for(var v3 = e20.length; v3 < o12.length; v3++)f5[v3] = !0;
                            for(var p1 = Math.min(o12.length, e20.length), l1 = 0; l1 < p1; l1++)o12.hasOwnProperty(l1) || (f5[l1] = !0), void 0 === f5[l1] && n41(o12[l1]);
                        }
                    }
                }
            }(n40.p[0]), e15(n40.p));
        },
        K: function(n43) {
            return 4 === n43.i ? o7(n43) : a3(n43);
        }
    });
}
function $ee0a7948b60988aa$export$d3a6659991a0696c() {
    function e21(n44) {
        if (!$ee0a7948b60988aa$export$16e3aed3edb85946(n44)) return n44;
        if (Array.isArray(n44)) return n44.map(e21);
        if ($ee0a7948b60988aa$var$s(n44)) return new Map(Array.from(n44.entries()).map(function(n45) {
            return [
                n45[0],
                e21(n45[1])
            ];
        }));
        if ($ee0a7948b60988aa$var$v(n44)) return new Set(Array.from(n44).map(e21));
        var r37 = Object.create(Object.getPrototypeOf(n44));
        for(var i10 in n44)r37[i10] = e21(n44[i10]);
        return $ee0a7948b60988aa$var$u(n44, $ee0a7948b60988aa$export$6ee2082928bcb0ee) && (r37[$ee0a7948b60988aa$export$6ee2082928bcb0ee] = n44[$ee0a7948b60988aa$export$6ee2082928bcb0ee]), r37;
    }
    function f6(n46) {
        return $ee0a7948b60988aa$export$541ac630993a4c84(n46) ? e21(n46) : n46;
    }
    var c4 = "add";
    $ee0a7948b60988aa$var$m("Patches", {
        $: function(r38, t24) {
            return t24.forEach(function(t25) {
                for(var i11 = t25.path, u4 = t25.op, f7 = r38, s5 = 0; s5 < i11.length - 1; s5++){
                    var v4 = $ee0a7948b60988aa$var$o(f7), p2 = "" + i11[s5];
                    0 !== v4 && 1 !== v4 || "__proto__" !== p2 && "constructor" !== p2 || $ee0a7948b60988aa$var$n(24), "function" == typeof f7 && "prototype" === p2 && $ee0a7948b60988aa$var$n(24), "object" != typeof (f7 = $ee0a7948b60988aa$var$a(f7, p2)) && $ee0a7948b60988aa$var$n(15, i11.join("/"));
                }
                var l2 = $ee0a7948b60988aa$var$o(f7), d1 = e21(t25.value), h1 = i11[i11.length - 1];
                switch(u4){
                    case "replace":
                        switch(l2){
                            case 2:
                                return f7.set(h1, d1);
                            case 3:
                                $ee0a7948b60988aa$var$n(16);
                            default:
                                return f7[h1] = d1;
                        }
                    case c4:
                        switch(l2){
                            case 1:
                                return "-" === h1 ? f7.push(d1) : f7.splice(h1, 0, d1);
                            case 2:
                                return f7.set(h1, d1);
                            case 3:
                                return f7.add(d1);
                            default:
                                return f7[h1] = d1;
                        }
                    case "remove":
                        switch(l2){
                            case 1:
                                return f7.splice(h1, 1);
                            case 2:
                                return f7.delete(h1);
                            case 3:
                                return f7.delete(t25.value);
                            default:
                                return delete f7[h1];
                        }
                    default:
                        $ee0a7948b60988aa$var$n(17, u4);
                }
            }), r38;
        },
        R: function(n47, r39, t26, e22) {
            switch(n47.i){
                case 0:
                case 4:
                case 2:
                    return function(n48, r40, t27, e23) {
                        var o13 = n48.t, s6 = n48.o;
                        $ee0a7948b60988aa$var$i(n48.D, function(n49, i12) {
                            var v5 = $ee0a7948b60988aa$var$a(o13, n49), p3 = $ee0a7948b60988aa$var$a(s6, n49), l3 = i12 ? $ee0a7948b60988aa$var$u(o13, n49) ? "replace" : c4 : "remove";
                            if (v5 !== p3 || "replace" !== l3) {
                                var d2 = r40.concat(n49);
                                t27.push("remove" === l3 ? {
                                    op: l3,
                                    path: d2
                                } : {
                                    op: l3,
                                    path: d2,
                                    value: p3
                                }), e23.push(l3 === c4 ? {
                                    op: "remove",
                                    path: d2
                                } : "remove" === l3 ? {
                                    op: c4,
                                    path: d2,
                                    value: f6(v5)
                                } : {
                                    op: "replace",
                                    path: d2,
                                    value: f6(v5)
                                });
                            }
                        });
                    }(n47, r39, t26, e22);
                case 5:
                case 1:
                    return function(n50, r41, t28, e24) {
                        var i13 = n50.t, o14 = n50.D, u5 = n50.o;
                        if (u5.length < i13.length) {
                            var a6 = [
                                u5,
                                i13
                            ];
                            i13 = a6[0], u5 = a6[1];
                            var s7 = [
                                e24,
                                t28
                            ];
                            t28 = s7[0], e24 = s7[1];
                        }
                        for(var v6 = 0; v6 < i13.length; v6++)if (o14[v6] && u5[v6] !== i13[v6]) {
                            var p4 = r41.concat([
                                v6
                            ]);
                            t28.push({
                                op: "replace",
                                path: p4,
                                value: f6(u5[v6])
                            }), e24.push({
                                op: "replace",
                                path: p4,
                                value: f6(i13[v6])
                            });
                        }
                        for(var l4 = i13.length; l4 < u5.length; l4++){
                            var d3 = r41.concat([
                                l4
                            ]);
                            t28.push({
                                op: c4,
                                path: d3,
                                value: f6(u5[l4])
                            });
                        }
                        i13.length < u5.length && e24.push({
                            op: "replace",
                            path: r41.concat([
                                "length"
                            ]),
                            value: i13.length
                        });
                    }(n47, r39, t26, e22);
                case 3:
                    return function(n51, r42, t29, e25) {
                        var i14 = n51.t, o15 = n51.o, u6 = 0;
                        i14.forEach(function(n52) {
                            if (!o15.has(n52)) {
                                var i15 = r42.concat([
                                    u6
                                ]);
                                t29.push({
                                    op: "remove",
                                    path: i15,
                                    value: n52
                                }), e25.unshift({
                                    op: c4,
                                    path: i15,
                                    value: n52
                                });
                            }
                            u6++;
                        }), u6 = 0, o15.forEach(function(n53) {
                            if (!i14.has(n53)) {
                                var o16 = r42.concat([
                                    u6
                                ]);
                                t29.push({
                                    op: c4,
                                    path: o16,
                                    value: n53
                                }), e25.unshift({
                                    op: "remove",
                                    path: o16,
                                    value: n53
                                });
                            }
                            u6++;
                        });
                    }(n47, r39, t26, e22);
            }
        },
        M: function(n54, r43, t30, e26) {
            t30.push({
                op: "replace",
                path: [],
                value: r43 === $ee0a7948b60988aa$export$45b790e32b2810ee ? void 0 : r43
            }), e26.push({
                op: "replace",
                path: [],
                value: n54
            });
        }
    });
}
function $ee0a7948b60988aa$export$7d9f65390203b435() {
    function r44(n55, r45) {
        function t31() {
            this.constructor = n55;
        }
        a7(n55, r45), n55.prototype = (t31.prototype = r45.prototype, new t31);
    }
    function e27(n56) {
        n56.o || (n56.D = new Map, n56.o = new Map(n56.t));
    }
    function o17(n57) {
        n57.o || (n57.o = new Set, n57.t.forEach(function(r46) {
            if ($ee0a7948b60988aa$export$16e3aed3edb85946(r46)) {
                var e28 = $ee0a7948b60988aa$var$R(n57.A.h, r46, n57);
                n57.p.set(r46, e28), n57.o.add(e28);
            } else n57.o.add(r46);
        }));
    }
    function u7(r47) {
        r47.O && $ee0a7948b60988aa$var$n(3, JSON.stringify($ee0a7948b60988aa$var$p(r47)));
    }
    var a7 = function(n58, r48) {
        return (a7 = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(n59, r49) {
            n59.__proto__ = r49;
        } || function(n60, r50) {
            for(var t32 in r50)r50.hasOwnProperty(t32) && (n60[t32] = r50[t32]);
        })(n58, r48);
    }, f8 = function() {
        function n61(n62, r51) {
            return this[$ee0a7948b60988aa$var$Q] = {
                i: 2,
                l: r51,
                A: r51 ? r51.A : $ee0a7948b60988aa$var$_(),
                P: !1,
                I: !1,
                o: void 0,
                D: void 0,
                t: n62,
                k: this,
                C: !1,
                O: !1
            }, this;
        }
        r44(n61, Map);
        var o18 = n61.prototype;
        return Object.defineProperty(o18, "size", {
            get: function() {
                return $ee0a7948b60988aa$var$p(this[$ee0a7948b60988aa$var$Q]).size;
            }
        }), o18.has = function(n63) {
            return $ee0a7948b60988aa$var$p(this[$ee0a7948b60988aa$var$Q]).has(n63);
        }, o18.set = function(n64, r52) {
            var t33 = this[$ee0a7948b60988aa$var$Q];
            return u7(t33), $ee0a7948b60988aa$var$p(t33).has(n64) && $ee0a7948b60988aa$var$p(t33).get(n64) === r52 || (e27(t33), $ee0a7948b60988aa$var$k(t33), t33.D.set(n64, !0), t33.o.set(n64, r52), t33.D.set(n64, !0)), this;
        }, o18.delete = function(n65) {
            if (!this.has(n65)) return !1;
            var r53 = this[$ee0a7948b60988aa$var$Q];
            return u7(r53), e27(r53), $ee0a7948b60988aa$var$k(r53), r53.t.has(n65) ? r53.D.set(n65, !1) : r53.D.delete(n65), r53.o.delete(n65), !0;
        }, o18.clear = function() {
            var n66 = this[$ee0a7948b60988aa$var$Q];
            u7(n66), $ee0a7948b60988aa$var$p(n66).size && (e27(n66), $ee0a7948b60988aa$var$k(n66), n66.D = new Map, $ee0a7948b60988aa$var$i(n66.t, function(r54) {
                n66.D.set(r54, !1);
            }), n66.o.clear());
        }, o18.forEach = function(n67, r55) {
            var t34 = this;
            $ee0a7948b60988aa$var$p(this[$ee0a7948b60988aa$var$Q]).forEach(function(e, i16) {
                n67.call(r55, t34.get(i16), i16, t34);
            });
        }, o18.get = function(n68) {
            var r56 = this[$ee0a7948b60988aa$var$Q];
            u7(r56);
            var i17 = $ee0a7948b60988aa$var$p(r56).get(n68);
            if (r56.I || !$ee0a7948b60988aa$export$16e3aed3edb85946(i17)) return i17;
            if (i17 !== r56.t.get(n68)) return i17;
            var o19 = $ee0a7948b60988aa$var$R(r56.A.h, i17, r56);
            return e27(r56), r56.o.set(n68, o19), o19;
        }, o18.keys = function() {
            return $ee0a7948b60988aa$var$p(this[$ee0a7948b60988aa$var$Q]).keys();
        }, o18.values = function() {
            var n69, r57 = this, t35 = this.keys();
            return (n69 = {})[$ee0a7948b60988aa$var$V] = function() {
                return r57.values();
            }, n69.next = function() {
                var n70 = t35.next();
                return n70.done ? n70 : {
                    done: !1,
                    value: r57.get(n70.value)
                };
            }, n69;
        }, o18.entries = function() {
            var n71, r58 = this, t36 = this.keys();
            return (n71 = {})[$ee0a7948b60988aa$var$V] = function() {
                return r58.entries();
            }, n71.next = function() {
                var n72 = t36.next();
                if (n72.done) return n72;
                var e29 = r58.get(n72.value);
                return {
                    done: !1,
                    value: [
                        n72.value,
                        e29
                    ]
                };
            }, n71;
        }, o18[$ee0a7948b60988aa$var$V] = function() {
            return this.entries();
        }, n61;
    }(), c5 = function() {
        function n73(n74, r59) {
            return this[$ee0a7948b60988aa$var$Q] = {
                i: 3,
                l: r59,
                A: r59 ? r59.A : $ee0a7948b60988aa$var$_(),
                P: !1,
                I: !1,
                o: void 0,
                t: n74,
                k: this,
                p: new Map,
                O: !1,
                C: !1
            }, this;
        }
        r44(n73, Set);
        var t37 = n73.prototype;
        return Object.defineProperty(t37, "size", {
            get: function() {
                return $ee0a7948b60988aa$var$p(this[$ee0a7948b60988aa$var$Q]).size;
            }
        }), t37.has = function(n75) {
            var r60 = this[$ee0a7948b60988aa$var$Q];
            return u7(r60), r60.o ? !!r60.o.has(n75) || !(!r60.p.has(n75) || !r60.o.has(r60.p.get(n75))) : r60.t.has(n75);
        }, t37.add = function(n76) {
            var r61 = this[$ee0a7948b60988aa$var$Q];
            return u7(r61), this.has(n76) || (o17(r61), $ee0a7948b60988aa$var$k(r61), r61.o.add(n76)), this;
        }, t37.delete = function(n77) {
            if (!this.has(n77)) return !1;
            var r62 = this[$ee0a7948b60988aa$var$Q];
            return u7(r62), o17(r62), $ee0a7948b60988aa$var$k(r62), r62.o.delete(n77) || !!r62.p.has(n77) && r62.o.delete(r62.p.get(n77));
        }, t37.clear = function() {
            var n78 = this[$ee0a7948b60988aa$var$Q];
            u7(n78), $ee0a7948b60988aa$var$p(n78).size && (o17(n78), $ee0a7948b60988aa$var$k(n78), n78.o.clear());
        }, t37.values = function() {
            var n79 = this[$ee0a7948b60988aa$var$Q];
            return u7(n79), o17(n79), n79.o.values();
        }, t37.entries = function() {
            var n80 = this[$ee0a7948b60988aa$var$Q];
            return u7(n80), o17(n80), n80.o.entries();
        }, t37.keys = function() {
            return this.values();
        }, t37[$ee0a7948b60988aa$var$V] = function() {
            return this.values();
        }, t37.forEach = function(n81, r63) {
            for(var t38 = this.values(), e30 = t38.next(); !e30.done;)n81.call(r63, e30.value, e30.value, this), e30 = t38.next();
        }, n73;
    }();
    $ee0a7948b60988aa$var$m("MapSet", {
        N: function(n82, r64) {
            return new f8(n82, r64);
        },
        T: function(n83, r65) {
            return new c5(n83, r65);
        }
    });
}
function $ee0a7948b60988aa$export$cae049b67c7d1bc9() {
    $ee0a7948b60988aa$export$56771cf63ee491f5(), $ee0a7948b60988aa$export$7d9f65390203b435(), $ee0a7948b60988aa$export$d3a6659991a0696c();
}
function $ee0a7948b60988aa$export$c05b21e3257751e5(n84) {
    return n84;
}
function $ee0a7948b60988aa$export$20f911b3f8cf0b74(n85) {
    return n85;
}
var $ee0a7948b60988aa$var$G, $ee0a7948b60988aa$var$U, $ee0a7948b60988aa$var$W = "undefined" != typeof Symbol && "symbol" == typeof Symbol("x"), $ee0a7948b60988aa$var$X = "undefined" != typeof Map, $ee0a7948b60988aa$var$q = "undefined" != typeof Set, $ee0a7948b60988aa$var$B = "undefined" != typeof Proxy && void 0 !== Proxy.revocable && "undefined" != typeof Reflect, $ee0a7948b60988aa$export$45b790e32b2810ee = $ee0a7948b60988aa$var$W ? Symbol.for("immer-nothing") : (($ee0a7948b60988aa$var$G = {})["immer-nothing"] = !0, $ee0a7948b60988aa$var$G), $ee0a7948b60988aa$export$6ee2082928bcb0ee = $ee0a7948b60988aa$var$W ? Symbol.for("immer-draftable") : "__$immer_draftable", $ee0a7948b60988aa$var$Q = $ee0a7948b60988aa$var$W ? Symbol.for("immer-state") : "__$immer_state", $ee0a7948b60988aa$var$V = "undefined" != typeof Symbol && Symbol.iterator || "@@iterator", $ee0a7948b60988aa$var$Y = {
    0: "Illegal state",
    1: "Immer drafts cannot have computed properties",
    2: "This object has been frozen and should not be mutated",
    3: function(n86) {
        return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + n86;
    },
    4: "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",
    5: "Immer forbids circular references",
    6: "The first or second argument to `produce` must be a function",
    7: "The third argument to `produce` must be a function or undefined",
    8: "First argument to `createDraft` must be a plain object, an array, or an immerable object",
    9: "First argument to `finishDraft` must be a draft returned by `createDraft`",
    10: "The given draft is already finalized",
    11: "Object.defineProperty() cannot be used on an Immer draft",
    12: "Object.setPrototypeOf() cannot be used on an Immer draft",
    13: "Immer only supports deleting array indices",
    14: "Immer only supports setting array indices and the 'length' property",
    15: function(n87) {
        return "Cannot apply patch, path doesn't resolve: " + n87;
    },
    16: 'Sets cannot have "replace" patches.',
    17: function(n88) {
        return "Unsupported patch operation: " + n88;
    },
    18: function(n89) {
        return "The plugin for '" + n89 + "' has not been loaded into Immer. To enable the plugin, import and call `enable" + n89 + "()` when initializing your application.";
    },
    20: "Cannot use proxies if Proxy, Proxy.revocable or Reflect are not available",
    21: function(n90) {
        return "produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '" + n90 + "'";
    },
    22: function(n91) {
        return "'current' expects a draft, got: " + n91;
    },
    23: function(n92) {
        return "'original' expects a draft, got: " + n92;
    },
    24: "Patching reserved attributes like __proto__, prototype and constructor is not allowed"
}, $ee0a7948b60988aa$var$Z = "" + Object.prototype.constructor, $ee0a7948b60988aa$var$nn = "undefined" != typeof Reflect && Reflect.ownKeys ? Reflect.ownKeys : void 0 !== Object.getOwnPropertySymbols ? function(n93) {
    return Object.getOwnPropertyNames(n93).concat(Object.getOwnPropertySymbols(n93));
} : Object.getOwnPropertyNames, $ee0a7948b60988aa$var$rn = Object.getOwnPropertyDescriptors || function(n94) {
    var r66 = {};
    return $ee0a7948b60988aa$var$nn(n94).forEach(function(t39) {
        r66[t39] = Object.getOwnPropertyDescriptor(n94, t39);
    }), r66;
}, $ee0a7948b60988aa$var$tn = {}, $ee0a7948b60988aa$var$en = {
    get: function(n95, r67) {
        if (r67 === $ee0a7948b60988aa$var$Q) return n95;
        var e31 = $ee0a7948b60988aa$var$p(n95);
        if (!$ee0a7948b60988aa$var$u(e31, r67)) return function(n96, r68, t40) {
            var e32, i19 = $ee0a7948b60988aa$var$I(r68, t40);
            return i19 ? "value" in i19 ? i19.value : null === (e32 = i19.get) || void 0 === e32 ? void 0 : e32.call(n96.k) : void 0;
        }(n95, e31, r67);
        var i18 = e31[r67];
        return n95.I || !$ee0a7948b60988aa$export$16e3aed3edb85946(i18) ? i18 : i18 === $ee0a7948b60988aa$var$z(n95.t, r67) ? ($ee0a7948b60988aa$var$E(n95), n95.o[r67] = $ee0a7948b60988aa$var$R(n95.A.h, i18, n95)) : i18;
    },
    has: function(n97, r69) {
        return r69 in $ee0a7948b60988aa$var$p(n97);
    },
    ownKeys: function(n98) {
        return Reflect.ownKeys($ee0a7948b60988aa$var$p(n98));
    },
    set: function(n99, r70, t41) {
        var e33 = $ee0a7948b60988aa$var$I($ee0a7948b60988aa$var$p(n99), r70);
        if (null == e33 ? void 0 : e33.set) return e33.set.call(n99.k, t41), !0;
        if (!n99.P) {
            var i20 = $ee0a7948b60988aa$var$z($ee0a7948b60988aa$var$p(n99), r70), o20 = null == i20 ? void 0 : i20[$ee0a7948b60988aa$var$Q];
            if (o20 && o20.t === t41) return n99.o[r70] = t41, n99.D[r70] = !1, !0;
            if ($ee0a7948b60988aa$var$c(t41, i20) && (void 0 !== t41 || $ee0a7948b60988aa$var$u(n99.t, r70))) return !0;
            $ee0a7948b60988aa$var$E(n99), $ee0a7948b60988aa$var$k(n99);
        }
        return n99.o[r70] === t41 && "number" != typeof t41 && (void 0 !== t41 || r70 in n99.o) || (n99.o[r70] = t41, n99.D[r70] = !0, !0);
    },
    deleteProperty: function(n100, r71) {
        return void 0 !== $ee0a7948b60988aa$var$z(n100.t, r71) || r71 in n100.t ? (n100.D[r71] = !1, $ee0a7948b60988aa$var$E(n100), $ee0a7948b60988aa$var$k(n100)) : delete n100.D[r71], n100.o && delete n100.o[r71], !0;
    },
    getOwnPropertyDescriptor: function(n101, r72) {
        var t42 = $ee0a7948b60988aa$var$p(n101), e34 = Reflect.getOwnPropertyDescriptor(t42, r72);
        return e34 ? {
            writable: !0,
            configurable: 1 !== n101.i || "length" !== r72,
            enumerable: e34.enumerable,
            value: t42[r72]
        } : e34;
    },
    defineProperty: function() {
        $ee0a7948b60988aa$var$n(11);
    },
    getPrototypeOf: function(n102) {
        return Object.getPrototypeOf(n102.t);
    },
    setPrototypeOf: function() {
        $ee0a7948b60988aa$var$n(12);
    }
}, $ee0a7948b60988aa$var$on = {};
$ee0a7948b60988aa$var$i($ee0a7948b60988aa$var$en, function(n103, r73) {
    $ee0a7948b60988aa$var$on[n103] = function() {
        return arguments[0] = arguments[0][0], r73.apply(this, arguments);
    };
}), $ee0a7948b60988aa$var$on.deleteProperty = function(r74, t43) {
    return $ee0a7948b60988aa$var$on.set.call(this, r74, t43, void 0);
}, $ee0a7948b60988aa$var$on.set = function(r75, t44, e35) {
    return $ee0a7948b60988aa$var$en.set.call(this, r75[0], t44, e35, r75[0]);
};
var $ee0a7948b60988aa$export$aaadc6ff0f822719 = function() {
    function e36(r76) {
        var e37 = this;
        this.g = $ee0a7948b60988aa$var$B, this.F = !0, this.produce = function(r77, i22, o21) {
            if ("function" == typeof r77 && "function" != typeof i22) {
                var u8 = i22;
                i22 = r77;
                var a8 = e37;
                return function(n104) {
                    var r78 = this;
                    void 0 === n104 && (n104 = u8);
                    for(var t45 = arguments.length, e38 = Array(t45 > 1 ? t45 - 1 : 0), o22 = 1; o22 < t45; o22++)e38[o22 - 1] = arguments[o22];
                    return a8.produce(n104, function(n105) {
                        var t46;
                        return (t46 = i22).call.apply(t46, [
                            r78,
                            n105
                        ].concat(e38));
                    });
                };
            }
            var f9;
            if ("function" != typeof i22 && $ee0a7948b60988aa$var$n(6), void 0 !== o21 && "function" != typeof o21 && $ee0a7948b60988aa$var$n(7), $ee0a7948b60988aa$export$16e3aed3edb85946(r77)) {
                var c6 = $ee0a7948b60988aa$var$w(e37), s8 = $ee0a7948b60988aa$var$R(e37, r77, void 0), v7 = !0;
                try {
                    f9 = i22(s8), v7 = !1;
                } finally{
                    v7 ? $ee0a7948b60988aa$var$O(c6) : $ee0a7948b60988aa$var$g(c6);
                }
                return "undefined" != typeof Promise && f9 instanceof Promise ? f9.then(function(n106) {
                    return $ee0a7948b60988aa$var$j(c6, o21), $ee0a7948b60988aa$var$P(n106, c6);
                }, function(n107) {
                    throw $ee0a7948b60988aa$var$O(c6), n107;
                }) : ($ee0a7948b60988aa$var$j(c6, o21), $ee0a7948b60988aa$var$P(f9, c6));
            }
            if (!r77 || "object" != typeof r77) {
                if (void 0 === (f9 = i22(r77)) && (f9 = r77), f9 === $ee0a7948b60988aa$export$45b790e32b2810ee && (f9 = void 0), e37.F && $ee0a7948b60988aa$export$792f3d81ea979f55(f9, !0), o21) {
                    var p5 = [], l5 = [];
                    $ee0a7948b60988aa$var$b("Patches").M(r77, f9, p5, l5), o21(p5, l5);
                }
                return f9;
            }
            $ee0a7948b60988aa$var$n(21, r77);
        }, this.produceWithPatches = function(n108, r79) {
            if ("function" == typeof n108) return function(r80) {
                for(var t48 = arguments.length, i24 = Array(t48 > 1 ? t48 - 1 : 0), o24 = 1; o24 < t48; o24++)i24[o24 - 1] = arguments[o24];
                return e37.produceWithPatches(r80, function(r81) {
                    return n108.apply(void 0, [
                        r81
                    ].concat(i24));
                });
            };
            var t47, i23, o23 = e37.produce(n108, r79, function(n109, r82) {
                t47 = n109, i23 = r82;
            });
            return "undefined" != typeof Promise && o23 instanceof Promise ? o23.then(function(n110) {
                return [
                    n110,
                    t47,
                    i23
                ];
            }) : [
                o23,
                t47,
                i23
            ];
        }, "boolean" == typeof (null == r76 ? void 0 : r76.useProxies) && this.setUseProxies(r76.useProxies), "boolean" == typeof (null == r76 ? void 0 : r76.autoFreeze) && this.setAutoFreeze(r76.autoFreeze);
    }
    var i21 = e36.prototype;
    return i21.createDraft = function(e39) {
        $ee0a7948b60988aa$export$16e3aed3edb85946(e39) || $ee0a7948b60988aa$var$n(8), $ee0a7948b60988aa$export$541ac630993a4c84(e39) && (e39 = $ee0a7948b60988aa$export$97aac956da55dae9(e39));
        var i25 = $ee0a7948b60988aa$var$w(this), o25 = $ee0a7948b60988aa$var$R(this, e39, void 0);
        return o25[$ee0a7948b60988aa$var$Q].C = !0, $ee0a7948b60988aa$var$g(i25), o25;
    }, i21.finishDraft = function(r83, t49) {
        var e40 = r83 && r83[$ee0a7948b60988aa$var$Q];
        var i26 = e40.A;
        return $ee0a7948b60988aa$var$j(i26, t49), $ee0a7948b60988aa$var$P(void 0, i26);
    }, i21.setAutoFreeze = function(n111) {
        this.F = n111;
    }, i21.setUseProxies = function(r84) {
        r84 && !$ee0a7948b60988aa$var$B && $ee0a7948b60988aa$var$n(20), this.g = r84;
    }, i21.applyPatches = function(n112, t50) {
        var e41;
        for(e41 = t50.length - 1; e41 >= 0; e41--){
            var i27 = t50[e41];
            if (0 === i27.path.length && "replace" === i27.op) {
                n112 = i27.value;
                break;
            }
        }
        e41 > -1 && (t50 = t50.slice(e41 + 1));
        var o26 = $ee0a7948b60988aa$var$b("Patches").$;
        return $ee0a7948b60988aa$export$541ac630993a4c84(n112) ? o26(n112, t50) : this.produce(n112, function(n113) {
            return o26(n113, t50);
        });
    }, e36;
}(), $ee0a7948b60988aa$var$an = new $ee0a7948b60988aa$export$aaadc6ff0f822719, $ee0a7948b60988aa$export$b46cabe22e78bc00 = $ee0a7948b60988aa$var$an.produce, $ee0a7948b60988aa$export$4da66d41c9492c78 = $ee0a7948b60988aa$var$an.produceWithPatches.bind($ee0a7948b60988aa$var$an), $ee0a7948b60988aa$export$573f26f60825c493 = $ee0a7948b60988aa$var$an.setAutoFreeze.bind($ee0a7948b60988aa$var$an), $ee0a7948b60988aa$export$36ccd207ae29b74e = $ee0a7948b60988aa$var$an.setUseProxies.bind($ee0a7948b60988aa$var$an), $ee0a7948b60988aa$export$a8b8e03e6bbe5473 = $ee0a7948b60988aa$var$an.applyPatches.bind($ee0a7948b60988aa$var$an), $ee0a7948b60988aa$export$3c3214997190395f = $ee0a7948b60988aa$var$an.createDraft.bind($ee0a7948b60988aa$var$an), $ee0a7948b60988aa$export$c60f5e69c521b528 = $ee0a7948b60988aa$var$an.finishDraft.bind($ee0a7948b60988aa$var$an);
var $ee0a7948b60988aa$export$2e2bcd8739ae039 = $ee0a7948b60988aa$export$b46cabe22e78bc00;


async function $3f84f0818f1c6432$export$19af69b8fa933a33(arg, preventLog) {
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


class $a40a73a7105d18fd$export$7254cc27399e90bd {
    static instances = [];
    constructor(id, state, opts){
        this.id = id;
        this.subscriptions = [];
        this.hold = false;
        this.queue = [];
        this.isUpdating = false;
        this.state = state;
        this.initialState = state;
        if (!opts?.preventInstanceTracking) $a40a73a7105d18fd$export$7254cc27399e90bd.instances.push(this);
    }
    static getInstances() {
        return $a40a73a7105d18fd$export$7254cc27399e90bd.instances;
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
        const produceResult = (0, $ee0a7948b60988aa$export$2e2bcd8739ae039)(this.state, updater);
        if (produceResult instanceof Promise) {
            this.prevState = this.getStateData();
            this.isUpdating = true;
            this.runSubscribers();
        }
        const [result, err] = await (0, $3f84f0818f1c6432$export$19af69b8fa933a33)(produceResult);
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
const $a40a73a7105d18fd$export$7fa6d73f36ba184f = (logName, state)=>{
    console.log($a40a73a7105d18fd$export$7fa6d73f36ba184f.name, "Started");
    state.subscribe(()=>{
        console.groupCollapsed(`State ${logName}`);
        console.log("data:", state.getState());
        console.log("updating:", state.isUpdating);
        console.log("error:", state.error);
        console.groupEnd();
    });
};


var $53c846c8c76e565a$exports = {};

$parcel$export($53c846c8c76e565a$exports, "useGlue", () => $53c846c8c76e565a$export$eed9a2a671845c2c);
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


const $53c846c8c76e565a$export$eed9a2a671845c2c = (0, $0f99d2a3bc244acf$export$bd89b0cf3447f70)((0, $1b665fc3e0e27e96$export$60241385465d0a34), (0, $9646d553a21536fa$export$6d9c69b0de29b591));


var $f265bcac0306fb75$exports = {};

$parcel$export($f265bcac0306fb75$exports, "useGlue", () => $f265bcac0306fb75$export$eed9a2a671845c2c);

var $3f1e9713cda039b1$exports = {};
"use strict";

$3f1e9713cda039b1$exports = (parcelRequire("bh4lA"));


const $f265bcac0306fb75$export$eed9a2a671845c2c = (0, $0f99d2a3bc244acf$export$bd89b0cf3447f70)((0, $3f1e9713cda039b1$exports.useState), (0, $3f1e9713cda039b1$exports.useEffect));




export {$a40a73a7105d18fd$export$7254cc27399e90bd as State};
//# sourceMappingURL=state.js.map
