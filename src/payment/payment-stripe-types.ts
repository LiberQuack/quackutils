import * as StripeClient from "@stripe/stripe-js";
import StripeServer from "stripe";

export type PaymentStripeProviderData = {

    /**
     * PaymentIntent generated on server
     */
    clientSecret?: StripeServer.PaymentIntent["client_secret"]

    /**
     * PaymentIntent generated on client
     */
    paymentIntentResult?: StripeClient.PaymentIntent

    subscription?: StripeServer.Subscription
}