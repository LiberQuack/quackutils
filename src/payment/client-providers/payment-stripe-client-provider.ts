import {loadStripe} from "@stripe/stripe-js"
import {AbstractPaymentClientProvider} from "./abstract-payment-client-provider.js";
import type StripeTypes from "@stripe/stripe-js"
import type {NarrowedStripeCalculatedCheckout, NarrowedStripeCompletedCheckout, PaymentStripeProviderData} from "../payment-stripe-types.js";
import type {EventListener} from "../../ui/ui-types.js";
import type {StripeCardformEvents} from "../../ui/components/payments/stripe/stripe-form.js";

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

        const {paymentMethodToken, clientSecret, setupIntentStatus} = checkout.externalData.data;

        const cardElement = checkout.clientData?.cardElement;
        if (!cardElement) throw "Expected stripe elements instance on checkout.clientData"

        if (clientSecret) {
            if (setupIntentStatus === "requires_action") {
                const {setupIntent, error} = await stripe.confirmCardSetup(clientSecret);
                const intentId = setupIntent?.id ?? error?.setup_intent?.id;
                if (!intentId) throw "Unexpected error";

                return {
                    ...checkout,
                    success: false,
                    externalId: intentId,
                    errorMessage: error?.message
                }
            }
        }

        if (paymentMethodToken){
            return {
                ...checkout,
                success: false,
                externalId: false,
            }
        }

        throw "Payment failed, unexpected checkout flow";
    }

    async buildUi(checkout: NarrowedStripeCalculatedCheckout, opts: {htmlTemplate?: any}, sendCheckoutToServer: (checkout: NarrowedStripeCalculatedCheckout) => void): Promise<HTMLElement> {
        const {html, render} = await import("lit");
        await import("../../ui/components/payments/stripe/stripe-elements.js");
        await import("../../ui/components/payments/stripe/stripe-form.js");

        let stripeFormTemplate = html`
            <stripe-form .stripeClient="${await this.stripePromise}">
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

    maxRoundTrips(): number {
        return 2;
    }

}