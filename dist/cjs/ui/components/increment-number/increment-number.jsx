var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "haunted", "haunted/lib/core", "bezier-easing"], function (require, exports, haunted_1, core_1, bezier_easing_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IncrementNumber = void 0;
    bezier_easing_1 = __importDefault(bezier_easing_1);
    const attributes = [
        "from",
        "to",
        "bezier",
        "seconds-duration",
        "max-decimals",
        "min-decimals",
        "once"
    ];
    const IncrementNumber = function ({ from, to, bezier, secondsDuration, maxDecimals, minDecimals, once }) {
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
        const fromTimeRef = (0, core_1.useRef)(null);
        const bezierRef = (0, core_1.useRef)(null);
        const updateCurrentRef = (0, core_1.useRef)(null);
        (0, core_1.useEffect)(() => {
            const updateCurrent = () => {
                bezierRef.current = (0, bezier_easing_1.default)(...attr.bezier.split(","));
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
        (0, core_1.useEffect)(() => {
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
    exports.IncrementNumber = IncrementNumber;
    customElements.define("increment-number", (0, haunted_1.component)(exports.IncrementNumber, { useShadowDOM: false, observedAttributes: attributes }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jcmVtZW50LW51bWJlci5qc3giLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvdWkvY29tcG9uZW50cy9pbmNyZW1lbnQtbnVtYmVyL2luY3JlbWVudC1udW1iZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0lBTUEsTUFBTSxVQUFVLEdBQUc7UUFDZixNQUFNO1FBQ04sSUFBSTtRQUNKLFFBQVE7UUFDUixrQkFBa0I7UUFDbEIsY0FBYztRQUNkLGNBQWM7UUFDZCxNQUFNO0tBQ1QsQ0FBQztJQUlLLE1BQU0sZUFBZSxHQUFnRCxVQUFTLEVBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFDO1FBQ3BKLE1BQU0sSUFBSSxHQUFHO1lBQ1QsTUFBTSxFQUFFLE1BQU0sSUFBSSxZQUFZO1lBQzlCLGVBQWUsRUFBRSxlQUFlLElBQUksR0FBRztZQUN2QyxXQUFXLEVBQUUsV0FBVyxJQUFJLEdBQUc7WUFDL0IsV0FBVyxFQUFFLFdBQVcsSUFBSSxHQUFHO1lBQy9CLElBQUksRUFBRSxJQUFJLElBQUksR0FBRztZQUNqQixFQUFFLEVBQUUsRUFBRTtTQUNULENBQUM7UUFFRixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxxQkFBcUIsQ0FBQyxDQUFBO1FBRXZELE1BQU0sV0FBVyxHQUFHLElBQUEsYUFBTSxFQUFDLElBQXdCLENBQUMsQ0FBQTtRQUNwRCxNQUFNLFNBQVMsR0FBRyxJQUFBLGFBQU0sRUFBQyxJQUE2QyxDQUFDLENBQUM7UUFDeEUsTUFBTSxnQkFBZ0IsR0FBRyxJQUFBLGFBQU0sRUFBQyxJQUE0QixDQUFDLENBQUM7UUFFOUQsSUFBQSxnQkFBUyxFQUFDLEdBQUcsRUFBRTtZQUNYLE1BQU0sYUFBYSxHQUFHLEdBQUcsRUFBRTtnQkFDdkIsU0FBUyxD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