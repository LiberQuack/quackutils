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
parcelRequire.register("KgACT", function(module, exports) {

$parcel$export(module.exports, "loadStripe", () => $08b12a5ed5dbfb52$export$de80f7562c3fd6b1);
var $08b12a5ed5dbfb52$var$V3_URL = "https://js.stripe.com/v3";
var $08b12a5ed5dbfb52$var$V3_URL_REGEX = /^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/;
var $08b12a5ed5dbfb52$var$EXISTING_SCRIPT_MESSAGE = "loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used";
var $08b12a5ed5dbfb52$var$findScript = function findScript() {
    var scripts = document.querySelectorAll('script[src^="'.concat($08b12a5ed5dbfb52$var$V3_URL, '"]'));
    for(var i = 0; i < scripts.length; i++){
        var script = scripts[i];
        if (!$08b12a5ed5dbfb52$var$V3_URL_REGEX.test(script.src)) continue;
        return script;
    }
    return null;
};
var $08b12a5ed5dbfb52$var$injectScript = function injectScript(params) {
    var queryString = params && !params.advancedFraudSignals ? "?advancedFraudSignals=false" : "";
    var script = document.createElement("script");
    script.src = "".concat($08b12a5ed5dbfb52$var$V3_URL).concat(queryString);
    var headOrBody = document.head || document.body;
    if (!headOrBody) throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");
    headOrBody.appendChild(script);
    return script;
};
var $08b12a5ed5dbfb52$var$registerWrapper = function registerWrapper(stripe, startTime) {
    if (!stripe || !stripe._registerWrapper) return;
    stripe._registerWrapper({
        name: "stripe-js",
        version: "1.32.0",
        startTime: startTime
    });
};
var $08b12a5ed5dbfb52$var$stripePromise = null;
var $08b12a5ed5dbfb52$var$loadScript = function loadScript(params) {
    // Ensure that we only attempt to load Stripe.js at most once
    if ($08b12a5ed5dbfb52$var$stripePromise !== null) return $08b12a5ed5dbfb52$var$stripePromise;
    $08b12a5ed5dbfb52$var$stripePromise = new Promise(function(resolve, reject) {
        if (typeof window === "undefined") {
            // Resolve to null when imported server side. This makes the module
            // safe to import in an isomorphic code base.
            resolve(null);
            return;
        }
        if (window.Stripe && params) console.warn($08b12a5ed5dbfb52$var$EXISTING_SCRIPT_MESSAGE);
        if (window.Stripe) {
            resolve(window.Stripe);
            return;
        }
        try {
            var script = $08b12a5ed5dbfb52$var$findScript();
            if (script && params) console.warn($08b12a5ed5dbfb52$var$EXISTING_SCRIPT_MESSAGE);
            else if (!script) script = $08b12a5ed5dbfb52$var$injectScript(params);
            script.addEventListener("load", function() {
                if (window.Stripe) resolve(window.Stripe);
                else reject(new Error("Stripe.js not available"));
            });
            script.addEventListener("error", function() {
                reject(new Error("Failed to load Stripe.js"));
            });
        } catch (error) {
            reject(error);
            return;
        }
    });
    return $08b12a5ed5dbfb52$var$stripePromise;
};
var $08b12a5ed5dbfb52$var$initStripe = function initStripe(maybeStripe, args, startTime) {
    if (maybeStripe === null) return null;
    var stripe = maybeStripe.apply(undefined, args);
    $08b12a5ed5dbfb52$var$registerWrapper(stripe, startTime);
    return stripe;
}; // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// own script injection.
var $08b12a5ed5dbfb52$var$stripePromise$1 = Promise.resolve().then(function() {
    return $08b12a5ed5dbfb52$var$loadScript(null);
});
var $08b12a5ed5dbfb52$var$loadCalled = false;
$08b12a5ed5dbfb52$var$stripePromise$1["catch"](function(err) {
    if (!$08b12a5ed5dbfb52$var$loadCalled) console.warn(err);
});
var $08b12a5ed5dbfb52$export$de80f7562c3fd6b1 = function loadStripe() {
    for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++)args[_key] = arguments[_key];
    $08b12a5ed5dbfb52$var$loadCalled = true;
    var startTime = Date.now();
    return $08b12a5ed5dbfb52$var$stripePromise$1.then(function(maybeStripe) {
        return $08b12a5ed5dbfb52$var$initStripe(maybeStripe, args, startTime);
    });
};

});


//# sourceMappingURL=stripe.esm.4469c15d.js.map
