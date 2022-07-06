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
var parcelRequire = $parcel$global["parcelRequireb699"];
parcelRequire.register("juhpr", function(module, exports) {

$parcel$export(module.exports, "TimerElement", () => $646a80d061218349$export$94bb59f6876a36f);

var $bOjWa = parcelRequire("bOjWa");

var $aBWQX = parcelRequire("aBWQX");

var $fqWxh = parcelRequire("fqWxh");
const $646a80d061218349$var$second = 1000;
const $646a80d061218349$var$minute = $646a80d061218349$var$second * 60;
const $646a80d061218349$var$hour = $646a80d061218349$var$minute * 60;
const $646a80d061218349$var$day = $646a80d061218349$var$hour * 24;
const $646a80d061218349$export$94bb59f6876a36f = ({ targetDate: targetDate  })=>{
    const initialDiff = (0, $bOjWa.useMemo)(()=>targetDate && $646a80d061218349$var$fmtTime($646a80d061218349$var$calcTimeDiff(targetDate)), []);
    const [time, setTime] = (0, $fqWxh.useState)(initialDiff || "00:00:00");
    const [lastInterval, setLastInterval] = (0, $fqWxh.useState)(0);
    const [hours, minutes, seconds] = time.split(":");
    (0, $fqWxh.useEffect)(()=>{
        window.clearInterval(lastInterval);
        setInterval(()=>{
            if (targetDate) setTime($646a80d061218349$var$fmtTime($646a80d061218349$var$calcTimeDiff(targetDate)));
        }, 1000);
    }, [
        targetDate
    ]);
    return (0, $aBWQX.html)`<span>${hours}</span>:<span>${minutes}</span>:<span>${seconds}</span>`;
};
function $646a80d061218349$var$calcTimeDiff(targetDate) {
    const timeNow = Date.now();
    const targetDatee = new Date(targetDate);
    const target = targetDatee.getTime() + targetDatee.getTimezoneOffset() * $646a80d061218349$var$minute;
    const diff = target - timeNow;
    return diff;
}
function $646a80d061218349$var$fmtTime(time) {
    const hours = Math.floor(time / $646a80d061218349$var$hour).toString();
    const minutes = Math.floor(time % $646a80d061218349$var$hour / $646a80d061218349$var$minute).toString();
    const seconds = Math.floor(time % $646a80d061218349$var$minute / $646a80d061218349$var$second).toString();
    return `${hours}:${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
}
customElements.define("timer-element", (0, $bOjWa.component)($646a80d061218349$export$94bb59f6876a36f, {
    useShadowDOM: false,
    observedAttributes: [
        "target-date"
    ]
}));

});

})();
//# sourceMappingURL=timer-element.2375afbb.js.map
