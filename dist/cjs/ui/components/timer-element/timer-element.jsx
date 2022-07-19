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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXItZWxlbWVudC5qc3giLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvdWkvY29tcG9uZW50cy90aW1lci1lbGVtZW50L3RpbWVyLWVsZW1lbnQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7SUFLQSxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDcEIsTUFBTSxNQUFNLEdBQUcsTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUMzQixNQUFNLElBQUksR0FBRyxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ3pCLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7SUFJZixNQUFNLFlBQVksR0FBb0IsQ0FBQyxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUU7UUFFMUQsTUFBTSxXQUFXLEdBQUcsSUFBQSxpQkFBTyxFQUFDLEdBQUcsRUFBRSxDQUFDLFVBQVUsSUFBSSxPQUFPLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFDdEYsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxJQUFBLGVBQVEsRUFBQyxXQUFXLElBQUksVUFBVSxDQUFDLENBQUM7UUFDNUQsTUFBTSxDQUFDLFlBQVksRUFBRSxlQUFlLENBQUMsR0FBRyxJQUFBLGVBQVEsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUVwRCxNQUFNLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWxELElBQUEsZ0JBQVMsRUFBQyxHQUFHLEVBQUU7WUFDWCxNQUFNLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ25DLFdBQVcsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2IsSUFBSSxVQUFVLEVBQUU7b0JBQ1osT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUM5QztZQUNMLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNiLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUE7UUFFaEIsT0FBTyxJQUFBLFVBQUksRUFBQSxTQUFTLEtBQUssaUJBQWlCLE9BQU8saUJBQWlCLE9BQU8sU0FBUyxDQUFBO0lBQ3RGLENBQUMsQ0FBQTtJQWxCWSxRQUFBLFlBQVksZ0JBa0J4QjtJQUVELFNBQVMsWUFBWSxDQUFDLFVBQWtCO1FBQ3BDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMzQixNQUFNLFdBQVcsR0FBRyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN6QyxNQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQztRQUNsRixNQUFNLElBQUksR0FBRyxNQUFNLEdBQUcsT0FBTyxDQUFDO1FBQzlCLE9BQU8sSUFBSSxDQUFBO0lBQ2YsQ0FBQztJQUVELFNBQVMsT0FBTyxDQUFDLElBQVk7UUFDekIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDakQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM5RCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hFLE9BQU8sR0FBRyxLQUFLLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQTtJQUM3RSxDQUFDO0lBRUQsY0FBYyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsSUFBQSxtQkFBUyxFQUFDLG9CQUFZLEVBQUUsRUFBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLGtCQUFrQixFQUFFLENBQUMsYUFBYSxDQUFRLEVBQUMsQ0FBQyxDQUFDLENBQUMifQ==