import {PaymentCalculatedCheckout, PaymentCompletedCheckout} from "../types.js";
import type * as StripeTypes from "@stripe/stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import {AbstractPaymentClientProvider} from "./abstract-payment-client-provider.js";
import type StripeServer from "stripe";
import {Undefinable} from "../../_/types.js";
import {PaymentStripeProviderData} from "../payment-stripe-types.js";

export type ProviderClientData<P extends AbstractPaymentClientProvider<unknown>> = Parameters<P["checkout"]>[0] extends PaymentCalculatedCheckout<infer PD> ? PD : never;

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


        const clientSecret = checkout.externalData?.data.clientSecret;
        if (!clientSecret) throw "Expected data not found";
        const stripePaymentIntentResult = await stripe.confirmPayment({elements: 0} as any);

        if (stripePaymentIntentResult?.paymentIntent?.status === "succeeded") {
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