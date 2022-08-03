import type * as StripeTypes from "@stripe/stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import {AbstractPaymentClientProvider} from "./abstract-payment-client-provider.js";
import {NarrowedStripeCalculatedCheckout, NarrowedStripeCompletedCheckout, PaymentStripeProviderData} from "../payment-stripe-types.js";
import {EventListener} from "../../ui/ui-types.js";
import {StripeCardformEvents} from "../../ui/components/payments/stripe/stripe-form.js";

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

    async checkout(checkout: NarrowedStripeCalculatedCheckout): Promise<NarrowedStripeCompletedCheckout> {
        const stripe = await this.stripePromise;
        if (!stripe) throw "Could not load stripe";


        const clientSecret = checkout.externalData?.data.clientSecret;
        if (!clientSecret) throw "Expected data not found";

        const cardElement = checkout.clientData?.cardElement;
        if (!cardElement) throw "Expected stripe elements instance on checkout.clientData"

        const stripePaymentIntentResult = await stripe.confirmCardPayment(clientSecret, {payment_method: {
                card: cardElement
        }});

        const paymentIntentResult = stripePaymentIntentResult?.paymentIntent;
        const status = paymentIntentResult?.status;

        if (paymentIntentResult && status && ["requires_capture","succeeded"].indexOf(status) > -1) {
            return {
                ...checkout,
                success: true,
                externalId: paymentIntentResult.id
            };
        }

        throw `Stripe payment intent failed, unexpected status ${status}`
    }

    async buildUi(checkout: NarrowedStripeCalculatedCheckout, opts: {htmlTemplate?: any}, sendCheckoutToServer: (checkout: NarrowedStripeCalculatedCheckout) => void): Promise<HTMLElement> {
        const clientSecret = checkout.externalData.data.clientSecret;
        if (!clientSecret) throw "Did not found client secret data"

        const {html, render} = await import("lit");
        await import("../../ui/components/payments/stripe/stripe-elements.js");
        await import("../../ui/components/payments/stripe/stripe-form.js");

        let stripeFormTemplate = html`
            <stripe-form .stripeClient="${await this.stripePromise}" .stripeClientSecret="${clientSecret}">
                ${opts.htmlTemplate ?? html`
                    <stripe-card></stripe-card>
                    <stripe-submit-error></stripe-submit-error>
                    <stripe-submit><button class="button">Submit</button></stripe-submit>
                `}
            </stripe-form>
        `

        let container = document.createElement("div");
        (container as EventListener<StripeCardformEvents>).addEventListener("payment-method-token", (e) => {

            const nextCheckout: NarrowedStripeCalculatedCheckout = {
                ...checkout,
                externalData: {
                    provider: "stripe",
                    data: {
                        ...checkout.externalData.data,
                        paymentMethodToken: e.detail.paymentMethodToken
                    }
                },
                clientData: {
                    cardElement: e.detail.cardElement,
                }
            }

            sendCheckoutToServer(nextCheckout);
        });

        render(stripeFormTemplate, container);


        return container;
    }

}