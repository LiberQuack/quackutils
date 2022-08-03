import StripeTypes from "@stripe/stripe-js";
import {component} from "haunted";
import {useEffect, useRef} from "haunted/lib/core.js";
import {CreateCustomEvent, CustomElement, CustomElementDefinition} from "../../../ui-types.js";
import {Nullable} from "../../../../_/types.js";
import {useAwait} from "../../../util/hooks/use-await.js";
import {StripeContextType} from "./types.js";
import {StripeContext} from "./stripe-context.js";
import {css} from "../../../util/css.js";
import "./stripe-context.js"
import {NarrowedStripeCalculatedCheckout} from "../../../../payment/payment-stripe-types.js";
import {NonUndefined} from "utility-types";

export type StripeCardformEvents = {
    elementready: { elementType: string },

    /**
     * Need to send the transaction token
     * to your api in order to capture the payment
     */
    "payment-method-token":
        NonUndefined<NarrowedStripeCalculatedCheckout["clientData"]> &
        Pick<NarrowedStripeCalculatedCheckout["externalData"]["data"], "paymentMethodToken">
};

export type StripeFormProps = {
    stripeClient?: StripeTypes.Stripe,
    stripePublicKey?: string,
    stripeClientSecret?: string,
    value: StripeContextType
};

export type StripeFormDefinition = CustomElementDefinition<StripeFormProps, StripeCardformEvents>;

css`stripe-form { display: block }`

export const StripeForm: StripeFormDefinition = function ({stripeClient, stripeClientSecret, stripePublicKey}) {
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
                    this.dispatchEvent(CreateCustomEvent("payment-method-token", {detail: {
                            paymentMethodToken: tokenResult.token,
                            cardElement: stripeTokenizableElm
                        }, bubbles: true}))
                }

                if (tokenResult.error) {
                    console.warn(tokenResult.error)
                    throw tokenResult.error;
                }
            }
        }
        ,(data) => {
            if (this.value) {
                this.value = {...this.value, useSubmit: {...data}};
            }
        });

    const stripeCb = useAwait(async () => {
        const loadStripeClient = async () => {
            if (stripePublicKey) {
                const stripeLib = await import('@stripe/stripe-js');
                return stripeLib.loadStripe(stripePublicKey)
            }
        }

        const stripe = stripeClient ?? await loadStripeClient();
        if (!stripe) throw "Could not load stripe";

        const stripeElements = stripe.elements({clientSecret: stripeClientSecret});

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