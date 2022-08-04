import type StripeServer from "stripe";
import type {NarrowCalculatedCheckout, NarrowCompletedCheckout} from "./types.js";
import type {Token} from "@stripe/stripe-js/types/api/tokens.js";
import type {StripeCardElement, StripeCardNumberElement} from "@stripe/stripe-js";

export type PaymentStripeProviderData = {

    /**
     * PaymentIntent generated on server
     */
    clientSecret?: StripeServer.PaymentIntent["client_secret"]

    /**
     * Represents the payment method used by the client,
     * you may be able to store it, for posterior usage
     */
    paymentMethodToken?: Token

    /**
     * Should store a payment intent with status completed
     */
    finalPaymentIntent?: StripeServer.PaymentIntent

    subscription?: StripeServer.Subscription
}

export type NarrowedStripeCalculatedCheckout = NarrowCalculatedCheckout<{
    provider: "stripe",
    externalData: PaymentStripeProviderData,
    clientData: {
        cardElement: StripeCardElement | StripeCardNumberElement,
    }
}>;

export type NarrowedStripeCompletedCheckout = NarrowCompletedCheckout<{
    provider: "stripe",
    externalData: PaymentStripeProviderData,
    clientData: {
        cardElement: StripeCardElement | StripeCardNumberElement,
    }
}>;