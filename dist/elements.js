(() => {
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

var parcelRequire = $parcel$global["parcelRequireb699"];
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

  $parcel$global["parcelRequireb699"] = parcelRequire;
}
parcelRequire.register("lcZtt", function(module, exports) {


module.exports = (parcelRequire("ilGyR"))((parcelRequire("4wq9i")).getBundleURL("4XCKu") + "timer-element.2375afbb.js").then(()=>parcelRequire("juhpr"));

});
parcelRequire.register("ilGyR", function(module, exports) {
"use strict";

var $8k5wV = parcelRequire("8k5wV");
module.exports = $8k5wV(function(bundle) {
    return new Promise(function(resolve, reject) {
        // Don't insert the same script twice (e.g. if it was already in the HTML)
        var existingScripts = document.getElementsByTagName("script");
        if ([].concat(existingScripts).some(function isCurrentBundle(script) {
            return script.src === bundle;
        })) {
            resolve();
            return;
        }
        var preloadLink = document.createElement("link");
        preloadLink.href = bundle;
        preloadLink.rel = "preload";
        preloadLink.as = "script";
        document.head.appendChild(preloadLink);
        var script1 = document.createElement("script");
        script1.async = true;
        script1.type = "text/javascript";
        script1.charset = "utf-8";
        script1.src = bundle;
        script1.onerror = function(e) {
            var error = new TypeError("Failed to fetch dynamically imported module: ".concat(bundle, ". Error: ").concat(e.message));
            script1.onerror = script1.onload = null;
            script1.remove();
            reject(error);
        };
        script1.onload = function() {
            script1.onerror = script1.onload = null;
            resolve();
        };
        document.getElementsByTagName("head")[0].appendChild(script1);
    });
});

});
parcelRequire.register("8k5wV", function(module, exports) {
"use strict";
var $60f47b23ee5de0de$var$cachedBundles = {};
var $60f47b23ee5de0de$var$cachedPreloads = {};
var $60f47b23ee5de0de$var$cachedPrefetches = {};
function $60f47b23ee5de0de$var$getCache(type) {
    switch(type){
        case "preload":
            return $60f47b23ee5de0de$var$cachedPreloads;
        case "prefetch":
            return $60f47b23ee5de0de$var$cachedPrefetches;
        default:
            return $60f47b23ee5de0de$var$cachedBundles;
    }
}
module.exports = function(loader, type) {
    return function(bundle) {
        var cache = $60f47b23ee5de0de$var$getCache(type);
        if (cache[bundle]) return cache[bundle];
        return cache[bundle] = loader.apply(null, arguments).catch(function(e) {
            delete cache[bundle];
            throw e;
        });
    };
};

});


parcelRequire.register("4wq9i", function(module, exports) {

$parcel$export(module.exports, "getBundleURL", () => $34ae6f35ce94b3db$export$bdfd709ae4826697, (v) => $34ae6f35ce94b3db$export$bdfd709ae4826697 = v);
var $34ae6f35ce94b3db$export$bdfd709ae4826697;
var $34ae6f35ce94b3db$export$c9e73fbda7da57b6;
var $34ae6f35ce94b3db$export$5a759dc7a1cfb72a;
"use strict";
var $34ae6f35ce94b3db$var$bundleURL = {};
function $34ae6f35ce94b3db$var$getBundleURLCached(id) {
    var value = $34ae6f35ce94b3db$var$bundleURL[id];
    if (!value) {
        value = $34ae6f35ce94b3db$var$getBundleURL();
        $34ae6f35ce94b3db$var$bundleURL[id] = value;
    }
    return value;
}
function $34ae6f35ce94b3db$var$getBundleURL() {
    try {
        throw new Error();
    } catch (err) {
        var matches = ("" + err.stack).match(/(https?|file|ftp|(chrome|moz)-extension):\/\/[^)\n]+/g);
        if (matches) // The first two stack frames will be this function and getBundleURLCached.
        // Use the 3rd one, which will be a runtime in the original bundle.
        return $34ae6f35ce94b3db$var$getBaseURL(matches[2]);
    }
    return "/";
}
function $34ae6f35ce94b3db$var$getBaseURL(url) {
    return ("" + url).replace(/^((?:https?|file|ftp|(chrome|moz)-extension):\/\/.+)\/[^/]+$/, "$1") + "/";
} // TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.
function $34ae6f35ce94b3db$var$getOrigin(url) {
    var matches = ("" + url).match(/(https?|file|ftp|(chrome|moz)-extension):\/\/[^/]+/);
    if (!matches) throw new Error("Origin not found");
    return matches[0];
}
$34ae6f35ce94b3db$export$bdfd709ae4826697 = $34ae6f35ce94b3db$var$getBundleURLCached;
$34ae6f35ce94b3db$export$c9e73fbda7da57b6 = $34ae6f35ce94b3db$var$getBaseURL;
$34ae6f35ce94b3db$export$5a759dc7a1cfb72a = $34ae6f35ce94b3db$var$getOrigin;

});


parcelRequire.register("epTo3", function(module, exports) {


module.exports = (parcelRequire("ilGyR"))((parcelRequire("4wq9i")).getBundleURL("4XCKu") + "share-element.7dd07c87.js").then(()=>parcelRequire("gJqI1"));

});

parcelRequire.register("7ynNg", function(module, exports) {


module.exports = (parcelRequire("ilGyR"))((parcelRequire("4wq9i")).getBundleURL("4XCKu") + "increment-number.5f48f4b6.js").then(()=>parcelRequire("hpKpI"));

});

var $9e7441528ff72f0e$exports = {};
console.log("Lazy loading components");

if (document.querySelector("timer-element")) (parcelRequire("lcZtt"));

if (document.querySelector("share-element")) (parcelRequire("epTo3"));

if (document.querySelector("increment-number")) (parcelRequire("7ynNg"));

})();
//# sourceMappingURL=elements.js.map
