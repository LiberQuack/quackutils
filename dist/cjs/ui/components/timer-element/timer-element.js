define(["require", "exports", "haunted", "lit", "haunted/lib/core"], function (require, exports, haunted_1, lit_1, core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TimerElement = void 0;
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const TimerElement = ({ targetDate }) => {
        const initialDiff = (0, haunted_1.useMemo)(() => targetDate && fmtTime(calcTimeDiff(targetDate)), []);
        const [time, setTime] = (0, core_1.useState)(initialDiff || "00:00:00");
        const [lastInterval, setLastInterval] = (0, core_1.useState)(0);
        const [hours, minutes, seconds] = time.split(":");
        (0, core_1.useEffect)(() => {
            window.clearInterval(lastInterval);
            setInterval(() => {
                if (targetDate) {
                    setTime(fmtTime(calcTimeDiff(targetDate)));
                }
            }, 1000);
        }, [targetDate]);
        return (0, lit_1.html) `<span>${hours}</span>:<span>${minutes}</span>:<span>${seconds}</span>`;
    };
    exports.TimerElement = TimerElement;
    function calcTimeDiff(targetDate) {
        const timeNow = Date.now();
        const targetDatee = new Date(targetDate);
        const target = targetDatee.getTime() + (targetDatee.getTimezoneOffset() * minute);
        const diff = target - timeNow;
        return diff;
    }
    function fmtTime(time) {
        const hours = Math.floor(time / hour).toString();
        const minutes = Math.floor((time % hour) / minute).toString();
        const seconds = Math.floor((time % minute) / second).toString();
        return `${hours}:${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
    }
    customElements.define("timer-element", (0, haunted_1.component)(exports.TimerElement, { useShadowDOM: false, observedAttributes: ["target-date"] }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXItZWxlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy91aS9jb21wb25lbnRzL3RpbWVyLWVsZW1lbnQvdGltZXItZWxlbWVudC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztJQUtBLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQztJQUNwQixNQUFNLE1BQU0sR0FBRyxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQzNCLE1BQU0sSUFBSSxHQUFHLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDekIsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUlmLE1BQU0sWUFBWSxHQUFvQixDQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBRTtRQUUxRCxNQUFNLFdBQVcsR0FBRyxJQUFBLGlCQUFPLEVBQUMsR0FBRyxFQUFFLENBQUMsVUFBVSxJQUFJLE9BQU8sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUN0RixNQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLElBQUEsZUFBUSxFQUFDLFdBQVcsSUFBSSxVQUFVLENBQUMsQ0FBQztRQUM1RCxNQUFNLENBQUMsWUFBWSxFQUFFLGVBQWUsQ0FBQyxHQUFHLElBQUEsZUFBUSxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXBELE1BQU0sQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFbEQsSUFBQSxnQkFBUyxFQUFDLEdBQUcsRUFBRTtZQUNYLE1BQU0sQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDbkMsV0FBVyxDQUFDLEdBQUcsRUFBRTtnQkFDYixJQUFJLFVBQVUsRUFBRTtvQkFDWixPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQzlDO1lBQ0wsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2IsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQTtRQUVoQixPQUFPLElBQUEsVUFBSSxFQUFBLFNBQVMsS0FBSyxpQkFBaUIsT0FBTyxpQkFBaUIsT0FBTyxTQUFTLENBQUE7SUFDdEYsQ0FBQyxDQUFBO0lBbEJZLFFBQUEsWUFBWSxnQkFrQnhCO0lBRUQsU0FBUyxZQUFZLENBQUMsVUFBa0I7UUFDcEMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzNCLE1BQU0sV0FBVyxHQUFHLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDO1FBQ2xGLE1BQU0sSUFBSSxHQUFHLE1BQU0sR0FBRyxPQUFPLENBQUM7UUFDOUIsT0FBTyxJQUFJLENBQUE7SUFDZixDQUFDO0lBRUQsU0FBUyxPQUFPLENBQUMsSUFBWTtRQUN6QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNqRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzlELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEUsT0FBTyxHQUFHLEtBQUssSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFBO0lBQzdFLENBQUM7SUFFRCxjQUFjLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxJQUFBLG1CQUFTLEVBQUMsb0JBQVksRUFBRSxFQUFDLFlBQVksRUFBRSxLQUFLLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQyxhQUFhLENBQVEsRUFBQyxDQUFDLENBQUMsQ0FBQyJ9