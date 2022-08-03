import {CreateCustomEvent, CustomElement, CustomElementDefinition} from "../../../ui-types.js";
import {useContext, useEffect, useState} from "haunted/lib/core.js";
import {StripeContext} from "./stripe-context.js";
import {component} from "haunted";
import {css} from "../../../util/css.js";
import {StripeContextType} from "./types.js";
import {StripeCardformEvents} from "./stripe-form.js";
import {Nullable} from "../../../../_/types.js";
import {html} from "lit";
import {fmt} from "../../../../fmt.js";

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

function buildStripeElement(host: CustomElement<{}, StripeCardformEvents>, stripeRef: StripeContextType, type: CardTypes, opts: any) {
    const stripeElm = stripeRef.stripeElements.create(type as any, opts);
    const container = document.createElement("div");
    stripeElm.mount(container);

    stripeElm.on("ready", (e) => {
        host.dispatchEvent(CreateCustomEvent("elementready", {detail: e, bubbles: true}));
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