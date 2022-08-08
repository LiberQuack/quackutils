import type StripeServer from "stripe";
import type {NarrowCalculatedCheckout, NarrowCompletedCheckout} from "./types.js";
import type {Token} from "@stripe/stripe-js/types/api/tokens.js";
import type {StripeCardElement, StripeCardNumberElement} from "@stripe/stripe-js";

export type PaymentStripeProviderData = {

    /**
     * SetupIntent generated on server
     */
    clientSecret?: StripeServer.SetupIntent["client_secret"]

    /**
     * Represents the payment method used by the client,
     * you may be able to store it, for posterior usage
     */
    paymentMethodToken?: Token

    /**
     * Provide the status of the payment intent to your client,
     * so based on that, if it's require_action, we can trigger 3DS verification
     * before charging the user
     *
     * Otherwise even failed 3ds attempts, will be charged, and they may
     * cause future payments to be blocked
     */
    setupIntentStatus?: StripeServer.SetupIntent["status"] | StripeServer.PaymentIntent["status"]

    subscription?: StripeServer.Subscription
}

export type NarrowedStripeCalculatedCheckout = NarrowCalculatedCheckout<{
    provider: "stripe",
    externalData: PaymentStripeProviderData,
    clientData: {
        cardElement?: StripeCardElement | StripeCardNumberElement,
    }
}>;

export type NarrowedStripeCompletedCheckout = NarrowCompletedCheckout<{
    provider: "stripe",
    externalData: PaymentStripeProviderData,
    clientData: {
        cardElement?: StripeCardElement | StripeCardNumberElement,
    }
}>;