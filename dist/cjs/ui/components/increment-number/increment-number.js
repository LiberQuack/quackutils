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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jcmVtZW50LW51bWJlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy91aS9jb21wb25lbnRzL2luY3JlbWVudC1udW1iZXIvaW5jcmVtZW50LW51bWJlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7SUFNQSxNQUFNLFVBQVUsR0FBRztRQUNmLE1BQU07UUFDTixJQUFJO1FBQ0osUUFBUTtRQUNSLGtCQUFrQjtRQUNsQixjQUFjO1FBQ2QsY0FBYztRQUNkLE1BQU07S0FDVCxDQUFDO0lBSUssTUFBTSxlQUFlLEdBQWdELFVBQVMsRUFBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUM7UUFDcEosTUFBTSxJQUFJLEdBQUc7WUFDVCxNQUFNLEVBQUUsTUFBTSxJQUFJLFlBQVk7WUFDOUIsZUFBZSxFQUFFLGVBQWUsSUFBSSxHQUFHO1lBQ3ZDLFdBQVcsRUFBRSxXQUFXLElBQUksR0FBRztZQUMvQixXQUFXLEVBQUUsV0FBVyxJQUFJLEdBQUc7WUFDL0IsSUFBSSxFQUFFLElBQUksSUFBSSxHQUFHO1lBQ2pCLEVBQUUsRUFBRSxFQUFFO1NBQ1QsQ0FBQztRQUVGLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLHFCQUFxQixDQUFDLENBQUE7UUFFdkQsTUFBTSxXQUFXLEdBQUcsSUFBQSxhQUFNLEVBQUMsSUFBd0IsQ0FBQyxDQUFBO1FBQ3BELE1BQU0sU0FBUyxHQUFHLElBQUEsYUFBTSxFQUFDLElBQTZDLENBQUMsQ0FBQztRQUN4RSxNQUFNLGdCQUFnQixHQUFHLElBQUEsYUFBTSxFQUFDLElBQTRCLENBQUMsQ0FBQztRQUU5RCxJQUFBLGdCQUFTLEVBQUMsR0FBRyxFQUFFO1lBQ1gsTUFBTSxhQUFhLEdBQUcsR0FBRyxFQUFFO2dCQUN2QixTQUFTLENB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