import { component } from "haunted";
import { useEffect, useRef } from "haunted/lib/core";
import BezierEasing from "bezier-easing";
const attributes = [
    "from",
    "to",
    "bezier",
    "seconds-duration",
    "max-decimals",
    "min-decimals",
    "once"
];
export const IncrementNumber = function ({ from, to, bezier, secondsDuration, maxDecimals, minDecimals, once }) {
    const attr = {
        bezier: bezier ?? "1, 0, 1, 1",
        secondsDuration: secondsDuration ?? "2",
        maxDecimals: maxDecimals ?? "0",
        minDecimals: minDecimals ?? "0",
        from: from ?? "0",
        to: to
    };
    if (!attr.to)
        console.warn(this, "Expected input 'to'");
    const fromTimeRef = useRef(null);
    const bezierRef = useRef(null);
    const updateCurrentRef = useRef(null);
    useEffect(() => {
        const updateCurrent = () => {
            bezierRef.current = BezierEasing(...attr.bezier.split(","));
            fromTimeRef.current = Date.now();
            const fmt = new Intl.NumberFormat(undefined, { maximumFractionDigits: +attr.maxDecimals, minimumFractionDigits: +attr.minDecimals });
            const potato = () => {
                const duration = +attr.secondsDuration * 1000;
                const toTime = fromTimeRef.current + duration;
                const pointInLinearCurve = (duration - (toTime - Date.now())) / duration;
                const pointInBezier = bezierRef.current(pointInLinearCurve > 1 ? 1 : pointInLinearCurve < 0 ? 0 : pointInLinearCurve);
                const numberFrom = +attr.from;
                const numberTo = +attr.to;
                const diff = numberTo - numberFrom;
                const current = (pointInBezier * (diff) + numberFrom);
                this.textContent = fmt.format(current);
                if (pointInBezier < 1) {
                    requestAnimationFrame(potato);
                }
            };
            potato();
        };
        updateCurrentRef.current = updateCurrent;
    }, [from, to]);
    useEffect(() => {
        const observerEnter = new IntersectionObserver((elms) => {
            if (elms[0]?.isIntersecting)
                updateCurrentRef.current?.();
            if (elms[0]?.isIntersecting && once)
                observerEnter.disconnect();
        }, { threshold: 1 });
        observerEnter.observe(this);
        if (once)
            return;
        const observerExit = new IntersectionObserver((elms) => {
            if (!elms[0]?.isIntersecting)
                this.textContent = attr.from;
        });
        observerExit.observe(this);
    }, []);
};
customElements.define("increment-number", component(IncrementNumber, { useShadowDOM: false, observedAttributes: attributes }));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jcmVtZW50LW51bWJlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy91aS9jb21wb25lbnRzL2luY3JlbWVudC1udW1iZXIvaW5jcmVtZW50LW51bWJlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUNsQyxPQUFPLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBVyxNQUFNLGtCQUFrQixDQUFDO0FBQzdELE9BQU8sWUFBWSxNQUFNLGVBQWUsQ0FBQztBQUd6QyxNQUFNLFVBQVUsR0FBRztJQUNmLE1BQU07SUFDTixJQUFJO0lBQ0osUUFBUTtJQUNSLGtCQUFrQjtJQUNsQixjQUFjO0lBQ2QsY0FBYztJQUNkLE1BQU07Q0FDVCxDQUFDO0FBSUYsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFnRCxVQUFTLEVBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFDO0lBQ3BKLE1BQU0sSUFBSSxHQUFHO1FBQ1QsTUFBTSxFQUFFLE1BQU0sSUFBSSxZQUFZO1FBQzlCLGVBQWUsRUFBRSxlQUFlLElBQUksR0FBRztRQUN2QyxXQUFXLEVBQUUsV0FBVyxJQUFJLEdBQUc7UUFDL0IsV0FBVyxFQUFFLFdBQVcsSUFBSSxHQUFHO1FBQy9CLElBQUksRUFBRSxJQUFJLElBQUksR0FBRztRQUNqQixFQUFFLEVBQUUsRUFBRTtLQUNULENBQUM7SUFFRixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxxQkFBcUIsQ0FBQyxDQUFBO0lBRXZELE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxJQUF3QixDQUFDLENBQUE7SUFDcEQsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQTZDLENBQUMsQ0FBQztJQUN4RSxNQUFNLGdC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