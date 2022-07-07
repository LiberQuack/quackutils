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


var $3f1e9713cda039b1$exports = {};
"use strict";

$3f1e9713cda039b1$exports = (parcelRequire("bh4lA"));


const $c05eee8e8129013b$export$eed9a2a671845c2c = (0, $0f99d2a3bc244acf$export$bd89b0cf3447f70)((0, $3f1e9713cda039b1$exports.useState), (0, $3f1e9713cda039b1$exports.useEffect));




export {$c05eee8e8129013b$export$eed9a2a671845c2c as useGlue};
//# sourceMappingURL=state-glue-react.js.map
