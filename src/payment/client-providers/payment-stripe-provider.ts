import {PaymentCheckout} from "../types";
import type * as StripeTypes from "@stripe/stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import {AbstractPaymentClientProvider} from "./abstract-payment-client-provider";
import {PaymentProviderCheckout} from "../manager-providers/types";
import type StripeServer from "stripe";

export class PaymentStripeClientProvider extends AbstractPaymentClientProvider {

    provider: "stripe" = "stripe";

    private stripePromise: Promise<StripeTypes.Stripe | null>;

    constructor(stripePublicKey: string) {
        super();
        this.stripePromise = loadStripe(stripePublicKey);
    }

    async checkout(checkout: PaymentCheckout | PaymentProviderCheckout): Promise<PaymentCheckout | PaymentProviderCheckout> {
        const stripe = await this.stripePromise;
        if (!stripe) throw "Could not load stripe";

        const plans = checkout.items.filter(it => it.type === "plan");

        if (plans.length === 0) {
            throw "PaymentStripeClient expects at least one plan";
        }

        if ("providerData" in checkout) {
            const stripeResult: StripeServer.Response<StripeServer.Subscription> = checkout.providerData;
            if (stripeResult.status === "incomplete") {

                let latestInvoice = stripeResult.latest_invoice;
                if (typeof latestInvoice === "string" || typeof latestInvoice?.payment_intent === "string") {
                    throw `Server need to expand property ["latest_invoice", "latest_invoice.payment_intent"]`
                }

                let paymentIntent = latestInvoice?.payment_intent;
                if (paymentIntent?.status !== "requires_action") throw "Unexpected payment status";

                const {client_secret} = paymentIntent ?? {};
                if (!client_secret) throw "Unexpected error while processing your credit card, try again later"
                const stripePaymentIntentResult = await stripe.confirmCardPayment(client_secret);

                return {...checkout, providerData: stripePaymentIntentResult}
            }
        }

        return checkout;
    }

    maxRoundTrips(): number {
        return 1;
    }

}