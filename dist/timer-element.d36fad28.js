import {useMemo as $lzY85$useMemo, component as $lzY85$component} from "haunted";
import {html as $lzY85$html} from "lit";
import {useState as $lzY85$useState, useEffect as $lzY85$useEffect} from "haunted/lib/core";

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
parcelRequire.register("3MBbb", function(module, exports) {

$parcel$export(module.exports, "TimerElement", () => $11843d628b7ec2b3$export$94bb59f6876a36f);



const $11843d628b7ec2b3$var$second = 1000;
const $11843d628b7ec2b3$var$minute = $11843d628b7ec2b3$var$second * 60;
const $11843d628b7ec2b3$var$hour = $11843d628b7ec2b3$var$minute * 60;
const $11843d628b7ec2b3$var$day = $11843d628b7ec2b3$var$hour * 24;
const $11843d628b7ec2b3$export$94bb59f6876a36f = ({ targetDate: targetDate  })=>{
    const initialDiff = (0, $lzY85$useMemo)(()=>targetDate && $11843d628b7ec2b3$var$fmtTime($11843d628b7ec2b3$var$calcTimeDiff(targetDate)), []);
    const [time, setTime] = (0, $lzY85$useState)(initialDiff || "00:00:00");
    const [lastInterval, setLastInterval] = (0, $lzY85$useState)(0);
    const [hours, minutes, seconds] = time.split(":");
    (0, $lzY85$useEffect)(()=>{
        window.clearInterval(lastInterval);
        setInterval(()=>{
            if (targetDate) setTime($11843d628b7ec2b3$var$fmtTime($11843d628b7ec2b3$var$calcTimeDiff(targetDate)));
        }, 1000);
    }, [
        targetDate
    ]);
    return (0, $lzY85$html)`<span>${hours}</span>:<span>${minutes}</span>:<span>${seconds}</span>`;
};
function $11843d628b7ec2b3$var$calcTimeDiff(targetDate) {
    const timeNow = Date.now();
    const targetDatee = new Date(targetDate);
    const target = targetDatee.getTime() + targetDatee.getTimezoneOffset() * $11843d628b7ec2b3$var$minute;
    const diff = target - timeNow;
    return diff;
}
function $11843d628b7ec2b3$var$fmtTime(time) {
    const hours = Math.floor(time / $11843d628b7ec2b3$var$hour).toString();
    const minutes = Math.floor(time % $11843d628b7ec2b3$var$hour / $11843d628b7ec2b3$var$minute).toString();
    const seconds = Math.floor(time % $11843d628b7ec2b3$var$minute / $11843d628b7ec2b3$var$second).toString();
    return `${hours}:${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
}
customElements.define("timer-element", (0, $lzY85$component)($11843d628b7ec2b3$export$94bb59f6876a36f, {
    useShadowDOM: false,
    observedAttributes: [
        "target-date"
    ]
}));

});


//# sourceMappingURL=timer-element.d36fad28.js.map
