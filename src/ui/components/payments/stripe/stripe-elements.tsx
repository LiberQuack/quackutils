import {CustomElement} from "../../../ui-types";
import {useContext, useLayoutEffect} from "haunted/lib/core";
import {StripeContext} from "./stripe-context";
import {component} from "haunted";
import {css} from "../../../util/css";

export const StripeCardNumber: CustomElement = () => {
        useLayoutEffect(() => {
        css`
            stripe-card-number { display: block }
        `
    }, [])

    const stripeContext = useContext(StripeContext);
    return stripeContext?.html?.cardNumber;
}

export const StripeCardCvc: CustomElement = () => {
        useLayoutEffect(() => {
        css`
            stripe-card-cvc { display: block }
        `
    }, [])

    const stripeContext = useContext(StripeContext);
    return stripeContext?.html?.cardCvc;
}

export const StripeCardExpiry: CustomElement = () => {
        useLayoutEffect(() => {
        css`
            stripe-card-expiry { display: block }
        `
    }, [])

    const stripeContext = useContext(StripeContext);
    return stripeContext?.html?.cardExpiry;
}

customElements.define("stripe-card-number", component(StripeCardNumber, StripeContext.Consumer, {useShadowDOM: false}))
customElements.define("stripe-card-cvc", component(StripeCardCvc, StripeContext.Consumer, {useShadowDOM: false}))
customElements.define("stripe-card-expiry", component(StripeCardExpiry, StripeContext.Consumer, {useShadowDOM: false}))

declare global {
    interface HTMLElementTagNameMap {
        'stripe-card-number': typeof StripeContext.Provider
    }
}