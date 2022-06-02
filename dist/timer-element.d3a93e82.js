var $bQHWp$haunted = require("haunted");
var $bQHWp$lit = require("lit");
var $bQHWp$hauntedlibcore = require("haunted/lib/core");

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
parcelRequire.register("24Rxt", function(module, exports) {

$parcel$export(module.exports, "TimerElement", () => $749a3fc81447a062$export$94bb59f6876a36f);



const $749a3fc81447a062$var$second = 1000;
const $749a3fc81447a062$var$minute = $749a3fc81447a062$var$second * 60;
const $749a3fc81447a062$var$hour = $749a3fc81447a062$var$minute * 60;
const $749a3fc81447a062$var$day = $749a3fc81447a062$var$hour * 24;
const $749a3fc81447a062$export$94bb59f6876a36f = ({ targetDate: targetDate  })=>{
    const initialDiff = (0, $bQHWp$haunted.useMemo)(()=>targetDate && $749a3fc81447a062$var$fmtTime($749a3fc81447a062$var$calcTimeDiff(targetDate)), []);
    const [time, setTime] = (0, $bQHWp$hauntedlibcore.useState)(initialDiff || "00:00:00");
    const [lastInterval, setLastInterval] = (0, $bQHWp$hauntedlibcore.useState)(0);
    const [hours, minutes, seconds] = time.split(":");
    (0, $bQHWp$hauntedlibcore.useEffect)(()=>{
        window.clearInterval(lastInterval);
        setInterval(()=>{
            if (targetDate) setTime($749a3fc81447a062$var$fmtTime($749a3fc81447a062$var$calcTimeDiff(targetDate)));
        }, 1000);
    }, [
        targetDate
    ]);
    return (0, $bQHWp$lit.html)`<span>${hours}</span>:<span>${minutes}</span>:<span>${seconds}</span>`;
};
function $749a3fc81447a062$var$calcTimeDiff(targetDate) {
    const timeNow = Date.now();
    const targetDatee = new Date(targetDate);
    const target = targetDatee.getTime() + targetDatee.getTimezoneOffset() * $749a3fc81447a062$var$minute;
    const diff = target - timeNow;
    return diff;
}
function $749a3fc81447a062$var$fmtTime(time) {
    const hours = Math.floor(time / $749a3fc81447a062$var$hour).toString();
    const minutes = Math.floor(time % $749a3fc81447a062$var$hour / $749a3fc81447a062$var$minute).toString();
    const seconds = Math.floor(time % $749a3fc81447a062$var$minute / $749a3fc81447a062$var$second).toString();
    return `${hours}:${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
}
customElements.define("timer-element", (0, $bQHWp$haunted.component)($749a3fc81447a062$export$94bb59f6876a36f, {
    useShadowDOM: false,
    observedAttributes: [
        "target-date"
    ]
}));

});


//# sourceMappingURL=timer-element.d3a93e82.js.map
