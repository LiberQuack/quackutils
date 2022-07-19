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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jcmVtZW50LW51bWJlci5qc3giLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvdWkvY29tcG9uZW50cy9pbmNyZW1lbnQtbnVtYmVyL2luY3JlbWVudC1udW1iZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDbEMsT0FBTyxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQVcsTUFBTSxrQkFBa0IsQ0FBQztBQUM3RCxPQUFPLFlBQVksTUFBTSxlQUFlLENBQUM7QUFHekMsTUFBTSxVQUFVLEdBQUc7SUFDZixNQUFNO0lBQ04sSUFBSTtJQUNKLFFBQVE7SUFDUixrQkFBa0I7SUFDbEIsY0FBYztJQUNkLGNBQWM7SUFDZCxNQUFNO0NBQ1QsQ0FBQztBQUlGLE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBZ0QsVUFBUyxFQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBQztJQUNwSixNQUFNLElBQUksR0FBRztRQUNULE1BQU0sRUFBRSxNQUFNLElBQUksWUFBWTtRQUM5QixlQUFlLEVBQUUsZUFBZSxJQUFJLEdBQUc7UUFDdkMsV0FBVyxFQUFFLFdBQVcsSUFBSSxHQUFHO1FBQy9CLFdBQVcsRUFBRSxXQUFXLElBQUksR0FBRztRQUMvQixJQUFJLEVBQUUsSUFBSSxJQUFJLEdBQUc7UUFDakIsRUFBRSxFQUFFLEVBQUU7S0FDVCxDQUFDO0lBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUscUJBQXFCLENBQUMsQ0FBQTtJQUV2RCxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsSUFBd0IsQ0FBQyxDQUFBO0lBQ3BELE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUE2QyxDQUFDLENBQUM7SUFDeEUsTUFBTSxn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