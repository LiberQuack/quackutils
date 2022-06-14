import {CustomElement} from "../../ui-types";
import {component} from "haunted";
import {useEffect, useRef, useState} from "haunted/lib/core";
import BezierEasing from "bezier-easing";
import {Nullable} from "../../../types";


export const IncrementNumber:CustomElement<{from: string, to: string, bezier: string, secondsDuration: string, maxDecimals: string, minDecimals: string}> = function({from, to, bezier, secondsDuration, maxDecimals, minDecimals}) {
    const attr = {
        bezier: bezier ?? "1, 0, 1, 1",
        secondsDuration: secondsDuration ?? "2",
        maxDecimals: maxDecimals ?? "0",
        minDecimals: minDecimals ?? "0",
        from: from ?? "0",
        to: to
    };

    if (!attr.to) console.warn(this, "Expected input 'to'")

    const fromTimeRef = useRef(null as Nullable<number>)
    const bezierRef = useRef(null as Nullable<BezierEasing.EasingFunction>);
    const updateCurrentRef = useRef(null as Nullable<() => void>);

    useEffect(() => {
        const updateCurrent = () => {
            bezierRef.current = BezierEasing(...attr.bezier.split(",") as unknown as [number, number, number, number])
            fromTimeRef.current = Date.now();
            const fmt = new Intl.NumberFormat(undefined, {maximumFractionDigits: +attr.maxDecimals, minimumFractionDigits: +attr.minDecimals})

            const potato = () => {
                const duration = +attr.secondsDuration * 1000;
                const toTime = fromTimeRef.current! + duration
                const pointInLinearCurve = (duration - (toTime - Date.now())) / duration
                const pointInBezier = bezierRef.current!(pointInLinearCurve > 1 ? 1 : pointInLinearCurve < 0 ? 0 : pointInLinearCurve)


                const numberFrom = +attr.from;
                const numberTo = +attr.to;
                const diff = numberTo - numberFrom;

                const current = (pointInBezier * (diff) + numberFrom);
                this.textContent = fmt.format(current);

                if (pointInBezier < 1) {
                    requestAnimationFrame(potato);
                }
            };

            potato()
        }

        updateCurrentRef.current = updateCurrent;
    }, [from, to])

    useEffect(() => {
        const observer = new IntersectionObserver((elms) => {
            if (elms[0]?.isIntersecting) {
                updateCurrentRef.current?.();
            } else {
                this.textContent = attr.from;
            }
        }, {threshold: 1});

        observer.observe(this);
    }, [])
}

customElements.define("increment-number", component(IncrementNumber, {useShadowDOM: false, observedAttributes: ["from", "to", "bezier", "seconds-duration", "max-decimals", "min-decimals"] as any}));
