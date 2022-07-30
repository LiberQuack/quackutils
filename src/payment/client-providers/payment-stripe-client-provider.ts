import {PaymentCalculatedCheckout, PaymentCompletedCheckout} from "../types.js";
import type * as StripeTypes from "@stripe/stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import {AbstractPaymentClientProvider} from "./abstract-payment-client-provider.js";
import type StripeServer from "stripe";
import {Undefinable} from "../../_/types.js";

export type ProviderClientData<P extends AbstractPaymentClientProvider<unknown>> = Parameters<P["checkout"]>[0] extends PaymentCalculatedCheckout<infer PD> ? PD : never;

export type PaymentStripeProviderData = {

    /**
     * PaymentIntent generated on server
     */
    paymentIntent?: StripeTypes.PaymentIntent

    /**
     * PaymentIntent generated on client
     */
    paymentIntentResult?: StripeTypes.PaymentIntent

    subscription?: StripeServer.Subscription
}

/**
 * This stripe client provider
 */
export class PaymentStripeClientProvider extends AbstractPaymentClientProvider<PaymentStripeProviderData> {

    provider: "stripe" = "stripe";

    protected stripePromise: Promise<StripeTypes.Stripe | null>;

    constructor(stripePublicKey: string) {
        super();
        this.stripePromise = loadStripe(stripePublicKey);
    }

    async checkout(checkout: PaymentCalculatedCheckout<PaymentStripeProviderData>): Promise<PaymentCompletedCheckout<PaymentStripeProviderData>> {
        const stripe = await this.stripePromise;
        if (!stripe) throw "Could not load stripe";

        const plans = checkout.items.filter(it => it.type === "plan");

        if (plans.length === 0) {
            throw "PaymentStripeClient expects at least one plan";
        }

        const subscription: StripeServer.Subscription | undefined = checkout.externalData?.data?.subscription;

        let paymentIntent: Undefinable<StripeTypes.PaymentIntent>;

        //TODO: Should be moved to Payment Stripe Server
        if (subscription?.status === "incomplete") {
            let latestInvoice = subscription.latest_invoice;
            if (typeof latestInvoice === "string" || typeof latestInvoice?.payment_intent === "string") {
                throw `Server need to expand property ["latest_invoice", "latest_invoice.payment_intent"]`
            }
            paymentIntent = latestInvoice?.payment_intent && "status" in latestInvoice?.payment_intent ? latestInvoice.payment_intent as StripeTypes.PaymentIntent : undefined;
        } else {
            paymentIntent = checkout.externalData?.data.paymentIntent
        }

        if (paymentIntent?.status !== "requires_action") throw "Unexpected payment status";
        const {client_secret} = paymentIntent ?? {};
        if (!client_secret) throw "Unexpected error while processing your credit card, try again later"
        const stripePaymentIntentResult = await stripe.confirmCardPayment(client_secret);

        if (stripePaymentIntentResult.paymentIntent?.status === "succeeded") {
            return {
                ...checkout,
                externalData: {
                    provider: this.provider,
                    data: {
                        ...checkout.externalData?.data,
                        paymentIntentResult: stripePaymentIntentResult.paymentIntent
                    }
                },
                success: true,
                externalId: stripePaymentIntentResult.paymentIntent.id
            };
        }

        throw "Stripe payment intent failed, expected providerData or status 'succeeded'"
    }

    maxRoundTrips(): number {
        return 1;
    }

}