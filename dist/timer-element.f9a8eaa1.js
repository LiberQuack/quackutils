require("./timer-element.a01435ae.js");

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
parcelRequire.register("6bCY3", function(module, exports) {

$parcel$export(module.exports, "TimerElement", () => $1f427ab5a220ab01$export$94bb59f6876a36f);

var $2gcaC = parcelRequire("2gcaC");

var $a2F4o = parcelRequire("a2F4o");

var $6CFuW = parcelRequire("6CFuW");
const $1f427ab5a220ab01$var$second = 1000;
const $1f427ab5a220ab01$var$minute = $1f427ab5a220ab01$var$second * 60;
const $1f427ab5a220ab01$var$hour = $1f427ab5a220ab01$var$minute * 60;
const $1f427ab5a220ab01$var$day = $1f427ab5a220ab01$var$hour * 24;
const $1f427ab5a220ab01$export$94bb59f6876a36f = ({ targetDate: targetDate  })=>{
    const initialDiff = (0, $2gcaC.useMemo)(()=>targetDate && $1f427ab5a220ab01$var$fmtTime($1f427ab5a220ab01$var$calcTimeDiff(targetDate)), []);
    const [time, setTime] = (0, $6CFuW.useState)(initialDiff || "00:00:00");
    const [lastInterval, setLastInterval] = (0, $6CFuW.useState)(0);
    const [hours, minutes, seconds] = time.split(":");
    (0, $6CFuW.useEffect)(()=>{
        window.clearInterval(lastInterval);
        setInterval(()=>{
            if (targetDate) setTime($1f427ab5a220ab01$var$fmtTime($1f427ab5a220ab01$var$calcTimeDiff(targetDate)));
        }, 1000);
    }, [
        targetDate
    ]);
    return (0, $a2F4o.html)`<span>${hours}</span>:<span>${minutes}</span>:<span>${seconds}</span>`;
};
function $1f427ab5a220ab01$var$calcTimeDiff(targetDate) {
    const timeNow = Date.now();
    const targetDatee = new Date(targetDate);
    const target = targetDatee.getTime() + targetDatee.getTimezoneOffset() * $1f427ab5a220ab01$var$minute;
    const diff = target - timeNow;
    return diff;
}
function $1f427ab5a220ab01$var$fmtTime(time) {
    const hours = Math.floor(time / $1f427ab5a220ab01$var$hour).toString();
    const minutes = Math.floor(time % $1f427ab5a220ab01$var$hour / $1f427ab5a220ab01$var$minute).toString();
    const seconds = Math.floor(time % $1f427ab5a220ab01$var$minute / $1f427ab5a220ab01$var$second).toString();
    return `${hours}:${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
}
customElements.define("timer-element", (0, $2gcaC.component)($1f427ab5a220ab01$export$94bb59f6876a36f, {
    useShadowDOM: false,
    observedAttributes: [
        "target-date"
    ]
}));

});


//# sourceMappingURL=timer-element.f9a8eaa1.js.map
