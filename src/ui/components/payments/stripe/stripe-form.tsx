import "./stripe-context"

import StripeTypes from "@stripe/stripe-js";
import {CustomElement, CustomElementDefinition, CustomEventType} from "../../../ui-types";
import {useEffect, useRef} from "haunted/lib/core";
import {Nullable} from "../../../../_/types";
import {useAwait} from "../../../util/hooks/use-await";
import {component} from "haunted";
import {StripeContextType} from "./types";
import {StripeContext} from "./stripe-context";
import {css} from "../../../util/css";

export const fmt = {
    err: (...args: any[]) => args
}

export type StripeCardformEvents = {
    elementready: (e: CustomEvent<{ elementType: string }>) => void,
    sendcardtoken: (e: CustomEvent<{ token: StripeTypes.Token }>) => void,
};

type StripeFormProps = {
    forceLoading?: boolean,
    btnContent?: any,
    stripePublicKey: string,
    value: StripeContextType
};

export type StripeCardFormType = CustomElementDefinition<StripeFormProps, Partial<StripeCardformEvents>>;

css`stripe-form { display: block }`
export const StripeForm: StripeCardFormType = function (props) {
    const stripeRef = useRef(null as Nullable<StripeContextType>);

    const useSubmit = useAwait(async () => {
            if (stripeRef.current) {
                const {stripeClient, stripeElements} = stripeRef.current;
                const stripeTokenizableElm = stripeElements.getElement("cardNumber") || stripeElements.getElement("card");

                if (!stripeTokenizableElm) {
                    throw "Input not found"
                }

                const tokenResult = await stripeClient.createToken(stripeTokenizableElm);

                if (tokenResult.token) {
                    const sendTokenEvent: CustomEventType<StripeCardformEvents, "sendcardtoken"> = new CustomEvent("sendcardtoken", {detail: {token: tokenResult.token}, bubbles: true});
                    this.dispatchEvent(sendTokenEvent)
                }

                if (tokenResult.error) {
                    console.warn(tokenResult.error)
                    throw tokenResult.error;
                }
            }
        }
        , (data) => {
            if (this.value) {
                this.value = {...this.value, useSubmit: {...data}};
            }
        });

    const stripeCb = useAwait(async () => {
        const stripeImport = await import('@stripe/stripe-js');
        const stripe = await stripeImport.loadStripe(props.stripePublicKey);

        if (!stripe) {
            throw "Could not load stripe";
        }

        const stripeElements = stripe.elements();

        stripeRef.current = {
            stripeClient: stripe,
            stripeElements: stripeElements,
            useSubmit: useSubmit
        };

        this.value = stripeRef.current;
    });

    useEffect(() => {
        if (!stripeRef.current) {
            stripeCb.run();
        }
    }, []);
}

customElements.define("stripe-form", component(StripeForm, {
    useShadowDOM: false,
    baseElement: StripeContext.Provider,
    observedAttributes: ["stripe-public-key"] as any
}))

declare global {
    interface HTMLElementTagNameMap {
        'stripe-form': CustomElement<StripeCardFormType>
    }
}