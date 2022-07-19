import { useContext, useEffect, useState } from "haunted/lib/core";
import { StripeContext } from "./stripe-context";
import { component } from "haunted";
import { css } from "../../../util/css";
import { fmt } from "./stripe-form";
import { html } from "lit";
function defineComponent(tagName, func) {
    css `${tagName} {display: block}`;
    customElements.define(tagName, component(func, { useShadowDOM: false }));
    return func;
}
function defineStripeInputElm(tagName, type, opts) {
    const StripeInputElm = function () {
        const stripeContext = useContext(StripeContext);
        const [stripeElm, setStripeElm] = useState(null);
        useEffect(() => {
            if (stripeContext) {
                setStripeElm(buildStripeElement(this, stripeContext, type, opts));
            }
        }, [stripeContext]);
        return stripeElm;
    };
    return defineComponent(tagName, StripeInputElm);
}
function buildStripeElement(host, stripeRef, type, opts) {
    const stripeElm = stripeRef.stripeElements.create(type, opts);
    const container = document.createElement("div");
    stripeElm.mount(container);
    stripeElm.on("ready", (e) => {
        let onElementReadyEvent = new CustomEvent("elementready", { detail: e, bubbles: true });
        host.dispatchEvent(onElementReadyEvent);
    });
    return container;
}
export const StripeCard = defineStripeInputElm("stripe-card", "card");
export const StripeCardNumber = defineStripeInputElm("stripe-card-number", "cardNumber");
export const StripeCardCvc = defineStripeInputElm("stripe-card-cvc", "cardCvc");
export const StripeCardExpiry = defineStripeInputElm("stripe-card-expiry", "cardExpiry");
export const StripeSubmitErr = defineComponent("stripe-submit-error", function () {
    const stripeContext = useContext(StripeContext);
    const err = stripeContext?.useSubmit?.err;
    if (!err) {
        return undefined;
    }
    return html `${fmt.err(err)}`;
});
export const StripeSubmit = defineComponent("stripe-submit", function () {
    const stripeContext = useContext(StripeContext);
    const submitCb = stripeContext?.useSubmit?.run;
    useEffect(() => {
        if (submitCb) {
            this.addEventListener("click", submitCb);
            return () => this.removeEventListener("click", submitCb);
        }
    }, [submitCb]);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaXBlLWVsZW1lbnRzLmpzeCIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy91aS9jb21wb25lbnRzL3BheW1lbnRzL3N0cmlwZS9zdHJpcGUtZWxlbWVudHMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBQyxVQUFVLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMvQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBQ2xDLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUV0QyxPQUFPLEVBQUMsR0FBRyxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUV4RCxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0sS0FBSyxDQUFDO0FBSXpCLFNBQVMsZUFBZSxDQUFDLE9BQWUsRUFBRSxJQUE2QjtJQUNuRSxHQUFHLENBQUEsR0FBRyxPQUFPLG1CQUFtQixDQUFBO0lBQ2hDLGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxJQUFJLEVBQUUsRUFBQyxZQUFZLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFFRCxTQUFTLG9CQUFvQixDQUFDLE9BQWUsRUFBRSxJQUFlLEVBQUUsSUFBVTtJQUV0RSxNQUFNLGNBQWMsR0FBNEI7UUFDNUMsTUFBTSxhQUFhLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2hELE1BQU0sQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLEdBQUcsUUFBUSxDQUFDLElBQTZCLENBQUMsQ0FBQztRQUUxRSxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ1gsSUFBSSxhQUFhLEVBQUU7Z0JBQ2YsWUFBWSxDQUFDLGtCQUFrQixDQUFDLElB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