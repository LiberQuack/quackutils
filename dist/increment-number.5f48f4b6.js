(() => {
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
var parcelRequire = $parcel$global["parcelRequireb699"];
parcelRequire.register("hpKpI", function(module, exports) {

$parcel$export(module.exports, "IncrementNumber", () => $4c84fa493d3726b8$export$b2b8b837786478cd);

var $bOjWa = parcelRequire("bOjWa");

var $fqWxh = parcelRequire("fqWxh");

var $eBhh0 = parcelRequire("eBhh0");
const $4c84fa493d3726b8$var$attributes = [
    "from",
    "to",
    "bezier",
    "seconds-duration",
    "max-decimals",
    "min-decimals",
    "once"
];
const $4c84fa493d3726b8$export$b2b8b837786478cd = function({ from: from , to: to , bezier: bezier , secondsDuration: secondsDuration , maxDecimals: maxDecimals , minDecimals: minDecimals , once: once  }) {
    const attr = {
        bezier: bezier ?? "1, 0, 1, 1",
        secondsDuration: secondsDuration ?? "2",
        maxDecimals: maxDecimals ?? "0",
        minDecimals: minDecimals ?? "0",
        from: from ?? "0",
        to: to
    };
    if (!attr.to) console.warn(this, "Expected input 'to'");
    const fromTimeRef = (0, $fqWxh.useRef)(null);
    const bezierRef = (0, $fqWxh.useRef)(null);
    const updateCurrentRef = (0, $fqWxh.useRef)(null);
    (0, $fqWxh.useEffect)(()=>{
        const updateCurrent = ()=>{
            bezierRef.current = (0, (/*@__PURE__*/$parcel$interopDefault($eBhh0)))(...attr.bezier.split(","));
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
    (0, $fqWxh.useEffect)(()=>{
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
customElements.define("increment-number", (0, $bOjWa.component)($4c84fa493d3726b8$export$b2b8b837786478cd, {
    useShadowDOM: false,
    observedAttributes: $4c84fa493d3726b8$var$attributes
}));

});
parcelRequire.register("eBhh0", function(module, exports) {
/**
 * https://github.com/gre/bezier-easing
 * BezierEasing - use bezier curve for transition easing function
 * by Gaëtan Renaudeau 2014 - 2015 – MIT License
 */ // These values are established by empiricism with tests (tradeoff: performance VS precision)
var $aa11eb7dd9d1791d$var$NEWTON_ITERATIONS = 4;
var $aa11eb7dd9d1791d$var$NEWTON_MIN_SLOPE = 0.001;
var $aa11eb7dd9d1791d$var$SUBDIVISION_PRECISION = 0.0000001;
var $aa11eb7dd9d1791d$var$SUBDIVISION_MAX_ITERATIONS = 10;
var $aa11eb7dd9d1791d$var$kSplineTableSize = 11;
var $aa11eb7dd9d1791d$var$kSampleStepSize = 1.0 / ($aa11eb7dd9d1791d$var$kSplineTableSize - 1.0);
var $aa11eb7dd9d1791d$var$float32ArraySupported = typeof Float32Array === "function";
function $aa11eb7dd9d1791d$var$A(aA1, aA2) {
    return 1.0 - 3.0 * aA2 + 3.0 * aA1;
}
function $aa11eb7dd9d1791d$var$B(aA1, aA2) {
    return 3.0 * aA2 - 6.0 * aA1;
}
function $aa11eb7dd9d1791d$var$C(aA1) {
    return 3.0 * aA1;
}
// Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
function $aa11eb7dd9d1791d$var$calcBezier(aT, aA1, aA2) {
    return (($aa11eb7dd9d1791d$var$A(aA1, aA2) * aT + $aa11eb7dd9d1791d$var$B(aA1, aA2)) * aT + $aa11eb7dd9d1791d$var$C(aA1)) * aT;
}
// Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
function $aa11eb7dd9d1791d$var$getSlope(aT, aA1, aA2) {
    return 3.0 * $aa11eb7dd9d1791d$var$A(aA1, aA2) * aT * aT + 2.0 * $aa11eb7dd9d1791d$var$B(aA1, aA2) * aT + $aa11eb7dd9d1791d$var$C(aA1);
}
function $aa11eb7dd9d1791d$var$binarySubdivide(aX, aA, aB, mX1, mX2) {
    var currentX, currentT, i = 0;
    do {
        currentT = aA + (aB - aA) / 2.0;
        currentX = $aa11eb7dd9d1791d$var$calcBezier(currentT, mX1, mX2) - aX;
        if (currentX > 0.0) aB = currentT;
        else aA = currentT;
    }while (Math.abs(currentX) > $aa11eb7dd9d1791d$var$SUBDIVISION_PRECISION && ++i < $aa11eb7dd9d1791d$var$SUBDIVISION_MAX_ITERATIONS);
    return currentT;
}
function $aa11eb7dd9d1791d$var$newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
    for(var i = 0; i < $aa11eb7dd9d1791d$var$NEWTON_ITERATIONS; ++i){
        var currentSlope = $aa11eb7dd9d1791d$var$getSlope(aGuessT, mX1, mX2);
        if (currentSlope === 0.0) return aGuessT;
        var currentX = $aa11eb7dd9d1791d$var$calcBezier(aGuessT, mX1, mX2) - aX;
        aGuessT -= currentX / currentSlope;
    }
    return aGuessT;
}
function $aa11eb7dd9d1791d$var$LinearEasing(x) {
    return x;
}
module.exports = function bezier(mX1, mY1, mX2, mY2) {
    if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) throw new Error("bezier x values must be in [0, 1] range");
    if (mX1 === mY1 && mX2 === mY2) return $aa11eb7dd9d1791d$var$LinearEasing;
    // Precompute samples table
    var sampleValues = $aa11eb7dd9d1791d$var$float32ArraySupported ? new Float32Array($aa11eb7dd9d1791d$var$kSplineTableSize) : new Array($aa11eb7dd9d1791d$var$kSplineTableSize);
    for(var i = 0; i < $aa11eb7dd9d1791d$var$kSplineTableSize; ++i)sampleValues[i] = $aa11eb7dd9d1791d$var$calcBezier(i * $aa11eb7dd9d1791d$var$kSampleStepSize, mX1, mX2);
    function getTForX(aX) {
        var intervalStart = 0.0;
        var currentSample = 1;
        var lastSample = $aa11eb7dd9d1791d$var$kSplineTableSize - 1;
        for(; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample)intervalStart += $aa11eb7dd9d1791d$var$kSampleStepSize;
        --currentSample;
        // Interpolate to provide an initial guess for t
        var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
        var guessForT = intervalStart + dist * $aa11eb7dd9d1791d$var$kSampleStepSize;
        var initialSlope = $aa11eb7dd9d1791d$var$getSlope(guessForT, mX1, mX2);
        if (initialSlope >= $aa11eb7dd9d1791d$var$NEWTON_MIN_SLOPE) return $aa11eb7dd9d1791d$var$newtonRaphsonIterate(aX, guessForT, mX1, mX2);
        else if (initialSlope === 0.0) return guessForT;
        else return $aa11eb7dd9d1791d$var$binarySubdivide(aX, intervalStart, intervalStart + $aa11eb7dd9d1791d$var$kSampleStepSize, mX1, mX2);
    }
    return function BezierEasing(x) {
        // Because JavaScript number are imprecise, we should guarantee the extremes are right.
        if (x === 0) return 0;
        if (x === 1) return 1;
        return $aa11eb7dd9d1791d$var$calcBezier(getTForX(x), mY1, mY2);
    };
};

});


})();
//# sourceMappingURL=increment-number.5f48f4b6.js.map
