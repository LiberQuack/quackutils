import StripeTypes from "@stripe/stripe-js";
import {component} from "haunted";
import {useRef, useEffect} from "haunted/lib/core.js";
import {CreateCustomEvent, CustomElement, CustomElementDefinition} from "../../../ui-types.js";
import {Nullable} from "../../../../_/types.js";
import {useAwait} from "../../../util/hooks/use-await.js";
import {StripeContextType} from "./types.js";
import {StripeContext} from "./stripe-context.js";
import {css} from "../../../util/css.js";
import "./stripe-context.js"
import {AbstractPaymentClient} from "../../../../payment/abstract-payment-client.js";
import {PaymentStripeClientProvider} from "../../../../payment/client-providers/payment-stripe-client-provider.js";

export const fmt = {
    err: (...args: any[]) => args
}

export type StripeCardformEvents = {
    elementready: { elementType: string },
    sendcardtoken: { token: StripeTypes.Token },
};

type StripeFormProps = {
    forceLoading?: boolean,
    btnContent?: any,
    stripePublicKey: string,
    value: StripeContextType
};

export type StripeCardFormType = CustomElementDefinition<StripeFormProps, StripeCardformEvents>;

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
                    this.dispatchEvent(CreateCustomEvent("sendcardtoken", {detail: {token: tokenResult.token}, bubbles: true}))
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

    const stripeCb = useAwait(async (opts?: {clientSecret: string}) => {
        const stripeImport = await import('@stripe/stripe-js');
        const stripe = await stripeImport.loadStripe(props.stripePublicKey);

        if (!stripe) {
            throw "Could not load stripe";
        }

        const stripeElements = stripe.elements({clientSecret: opts?.clientSecret});

        stripeRef.current = {
            stripeClient: stripe,
            stripeElements: stripeElements,
            useSubmit: useSubmit
        };

        this.value = stripeRef.current;
    });

    useEffect(() => {
        //TODO: Maybe in the future, think about how to improve
        const unsubscribe = AbstractPaymentClient.subcribeProviderData<PaymentStripeClientProvider>("stripe", (providerData) => {
            const clientSecret = providerData?.paymentIntent?.client_secret;
            if (clientSecret) {
                stripeCb.run({clientSecret: clientSecret});
            }
        });

        if (!stripeRef.current) {
            stripeCb.run();
        }

        return unsubscribe;
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