import {CustomElement, CustomElementDefinition, CustomEventType} from "../../../ui-types";
import {useContext, useEffect, useState} from "haunted/lib/core";
import {StripeContext} from "./stripe-context";
import {component} from "haunted";
import {css} from "../../../util/css";
import {StripeContextType} from "./types";
import {fmt, StripeCardformEvents} from "./stripe-form";
import {Nullable} from "../../../../_/types";
import {html} from "lit";

type CardTypes = "cardNumber" | "cardExpiry" | "cardCvc" | "card";

function defineComponent(tagName: string, func: CustomElementDefinition) {
    css`${tagName} {display: block}`
    customElements.define(tagName, component(func, {useShadowDOM: false}));
    return func;
}

function defineStripeInputElm(tagName: string, type: CardTypes, opts?: any) {

    const StripeInputElm: CustomElementDefinition = function () {
        const stripeContext = useContext(StripeContext);
        const [stripeElm, setStripeElm] = useState(null as Nullable<HTMLElement>);

        useEffect(() => {
            if (stripeContext?.stripeElements) {
                setStripeElm(buildStripeElement(this, stripeContext, type, opts));
            }
        }, [stripeContext?.stripeElements])

        return stripeElm
    };

    return defineComponent(tagName, StripeInputElm)
}

function buildStripeElement(host: HTMLElement, stripeRef: StripeContextType, type: CardTypes, opts: any) {
    const stripeElm = stripeRef.stripeElements.create(type as any, opts);
    const container = document.createElement("div");
    stripeElm.mount(container);

    stripeElm.on("ready", (e) => {
        let onElementReadyEvent: CustomEventType<StripeCardformEvents, "elementready"> = new CustomEvent("elementready", {detail: e, bubbles: true});
        host.dispatchEvent(onElementReadyEvent);
    })

    return container
}

export const StripeCard = defineStripeInputElm("stripe-card", "card");
export const StripeCardNumber = defineStripeInputElm("stripe-card-number", "cardNumber")
export const StripeCardCvc = defineStripeInputElm("stripe-card-cvc", "cardCvc");
export const StripeCardExpiry = defineStripeInputElm("stripe-card-expiry", "cardExpiry");

export const StripeSubmitErr = defineComponent("stripe-submit-error", function() {
    const stripeContext = useContext(StripeContext);
    const err = stripeContext?.useSubmit?.err;

    if (!err) {
        return undefined
    }

    return html`${fmt.err(err)}`
})

export const StripeSubmit = defineComponent("stripe-submit", function() {
    const stripeContext = useContext(StripeContext);
    const submitCb = stripeContext?.useSubmit?.run;

    useEffect(() => {
        if (submitCb) {
            this.addEventListener("click", submitCb);
            return () => this.removeEventListener("click", submitCb);
        }
    }, [submitCb])
})


declare global {
    interface HTMLElementTagNameMap {
        'stripe-card': CustomElement<typeof StripeCard>
        'stripe-card-number': CustomElement<typeof StripeCardNumber>
        'stripe-card-cvc': CustomElement<typeof StripeCardCvc>
        'stripe-card-expiry': CustomElement<typeof StripeCardExpiry>
    }
}