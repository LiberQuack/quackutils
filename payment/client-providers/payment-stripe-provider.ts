import {PaymentClientProvider} from "./types";
import {PaymentCheckout} from "../types";
import {loadStripe} from "@stripe/stripe-js"
import type * as StripeTypes from "@stripe/stripe-js"

export class PaymentStripeProvider implements PaymentClientProvider {

    provider: "stripe" = "stripe";
    private stripePromise: Promise<StripeTypes.Stripe | null>;

    constructor(stripePublicKey: string) {
        this.stripePromise = loadStripe(stripePublicKey);
    }

    //TODO: Need to improve it, now we expect to work with plans only
    async checkout(checkout: PaymentCheckout): Promise<any> {
        const plans = checkout.items.filter(it => it.type === "plan");

        if (plans.length === 0) {
            throw "PaymentStripeClient expects at least one plan";
        }
    }

}