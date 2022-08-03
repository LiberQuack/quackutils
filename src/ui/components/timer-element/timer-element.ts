import {useEffect, useMemo, useState} from "haunted/lib/core.js";
import {component} from "haunted";
import {html} from "lit";
import {CustomElementDefinition} from "../../ui-types.js";

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

export const TimerElement:CustomElementDefinition<{ targetDate: string }> = ({targetDate}) => {

    const initialDiff = useMemo(() => targetDate && fmtTime(calcTimeDiff(targetDate)), [])
    const [time, setTime] = useState(initialDiff || "00:00:00");
    const [lastInterval, setLastInterval] = useState(0);

    const [hours, minutes, seconds] = time.split(":");

    useEffect(() => {
        window.clearInterval(lastInterval);
        setInterval(() => {
            if (targetDate) {
                setTime(fmtTime(calcTimeDiff(targetDate)));
            }
        }, 1000);
    }, [targetDate])

    return html`<span>${hours}</span>:<span>${minutes}</span>:<span>${seconds}</span>`
}

function calcTimeDiff(targetDate: string) {
    const timeNow = Date.now();
    const targetDatee = new Date(targetDate);
    const target = targetDatee.getTime() + (targetDatee.getTimezoneOffset() * minute);
    const diff = target - timeNow;
    return diff
}

function fmtTime(time: number) {
    const hours = Math.floor(time / hour).toString();
    const minutes = Math.floor((time % hour) / minute).toString();
    const seconds = Math.floor((time % minute) / second).toString();
    return `${hours}:${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`
}

customElements.define("timer-element", component(TimerElement, {useShadowDOM: false, observedAttributes: ["target-date"] as any}));