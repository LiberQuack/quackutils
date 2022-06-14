import "./timer-element.ceeb6f2f.js";

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
parcelRequire.register("5hmFI", function(module, exports) {

$parcel$export(module.exports, "TimerElement", () => $d5b7ef9ed2f437f3$export$94bb59f6876a36f);

var $7WcZB = parcelRequire("7WcZB");

var $k6j4s = parcelRequire("k6j4s");

var $eC0rA = parcelRequire("eC0rA");
const $d5b7ef9ed2f437f3$var$second = 1000;
const $d5b7ef9ed2f437f3$var$minute = $d5b7ef9ed2f437f3$var$second * 60;
const $d5b7ef9ed2f437f3$var$hour = $d5b7ef9ed2f437f3$var$minute * 60;
const $d5b7ef9ed2f437f3$var$day = $d5b7ef9ed2f437f3$var$hour * 24;
const $d5b7ef9ed2f437f3$export$94bb59f6876a36f = ({ targetDate: targetDate  })=>{
    const initialDiff = (0, $7WcZB.useMemo)(()=>targetDate && $d5b7ef9ed2f437f3$var$fmtTime($d5b7ef9ed2f437f3$var$calcTimeDiff(targetDate)), []);
    const [time, setTime] = (0, $eC0rA.useState)(initialDiff || "00:00:00");
    const [lastInterval, setLastInterval] = (0, $eC0rA.useState)(0);
    const [hours, minutes, seconds] = time.split(":");
    (0, $eC0rA.useEffect)(()=>{
        window.clearInterval(lastInterval);
        setInterval(()=>{
            if (targetDate) setTime($d5b7ef9ed2f437f3$var$fmtTime($d5b7ef9ed2f437f3$var$calcTimeDiff(targetDate)));
        }, 1000);
    }, [
        targetDate
    ]);
    return (0, $k6j4s.html)`<span>${hours}</span>:<span>${minutes}</span>:<span>${seconds}</span>`;
};
function $d5b7ef9ed2f437f3$var$calcTimeDiff(targetDate) {
    const timeNow = Date.now();
    const targetDatee = new Date(targetDate);
    const target = targetDatee.getTime() + targetDatee.getTimezoneOffset() * $d5b7ef9ed2f437f3$var$minute;
    const diff = target - timeNow;
    return diff;
}
function $d5b7ef9ed2f437f3$var$fmtTime(time) {
    const hours = Math.floor(time / $d5b7ef9ed2f437f3$var$hour).toString();
    const minutes = Math.floor(time % $d5b7ef9ed2f437f3$var$hour / $d5b7ef9ed2f437f3$var$minute).toString();
    const seconds = Math.floor(time % $d5b7ef9ed2f437f3$var$minute / $d5b7ef9ed2f437f3$var$second).toString();
    return `${hours}:${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
}
customElements.define("timer-element", (0, $7WcZB.component)($d5b7ef9ed2f437f3$export$94bb59f6876a36f, {
    useShadowDOM: false,
    observedAttributes: [
        "target-date"
    ]
}));

});


//# sourceMappingURL=timer-element.0c7bc8d8.js.map
