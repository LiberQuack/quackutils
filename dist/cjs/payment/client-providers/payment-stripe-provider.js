define(["require", "exports", "@stripe/stripe-js", "./abstract-payment-client-provider"], function (require, exports, stripe_js_1, abstract_payment_client_provider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PaymentStripeClientProvider = void 0;
    class PaymentStripeClientProvider extends abstract_payment_client_provider_1.AbstractPaymentClientProvider {
        provider = "stripe";
        stripePromise;
        constructor(stripePublicKey) {
            super();
            this.stripePromise = (0, stripe_js_1.loadStripe)(stripePublicKey);
        }
        async checkout(checkout) {
            const stripe = await this.stripePromise;
            if (!stripe)
                throw "Could not load stripe";
            const plans = checkout.items.filter(it => it.type === "plan");
            if (plans.length === 0) {
                throw "PaymentStripeClient expects at least one plan";
            }
            if ("providerData" in checkout) {
                const stripeResult = checkout.providerData;
                if (stripeResult.status === "incomplete") {
                    let latestInvoice = stripeResult.latest_invoice;
                    if (typeof latestInvoice === "string" || typeof latestInvoice?.payment_intent === "string") {
                        throw `Server need to expand property ["latest_invoice", "latest_invoice.payment_intent"]`;
                    }
                    let paymentIntent = latestInvoice?.payment_intent;
                    if (paymentIntent?.status !== "requires_action")
                        throw "Unexpected payment status";
                    const { client_secret } = paymentIntent ?? {};
                    if (!client_secret)
                        throw "Unexpected error while processing your credit card, try again later";
                    const stripePaymentIntentResult = await stripe.confirmCardPayment(client_secret);
                    return { ...checkout, providerData: stripePaymentIntentResult };
                }
            }
            return checkout;
        }
        maxRoundTrips() {
            return 1;
        }
    }
    exports.PaymentStripeClientProvider = PaymentStripeClientProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudC1zdHJpcGUtcHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcGF5bWVudC9jbGllbnQtcHJvdmlkZXJzL3BheW1lbnQtc3RyaXBlLXByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7SUFPQSxNQUFhLDJCQUE0QixTQUFRLGdFQUE2QjtRQUUxRSxRQUFRLEdBQWEsUUFBUSxDQUFDO1FBRXRCLGFBQWEsQ0FBcUM7UUFFMUQsWUFBWSxlQUF1QjtZQUMvQixLQUFLLEVBQUUsQ0FBQztZQUNSLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBQSxzQkFBVSxFQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3JELENBQUM7UUFFRCxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQW1EO1lBQzlELE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUN4QyxJQUFJLENBQUMsTUFBTTtnQkFBRSxNQUFNLHVCQUF1QixDQUFDO1lBRTNDLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsQ0FBQztZQUU5RCxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUNwQixNQUFNLCtDQUErQyxDQUFDO2FBQ3pEO1lBRUQsSUFBSSxjQUFjLElBQUksUUFBUSxFQUFFO2dCQUM1QixNQUFNLFlBQVksR0FBcUQsUUFBUSxDQUFDLFlBQVksQ0FBQztnQkFDN0YsSUFBSSxZQUFZLENBQUMsTUFBTSxLQUFLLFlBQVksRUFBRTtvQkFFdEMsSUFBSSxhQUFhLEdBQUcsWUFBWSxDQUFDLGNBQWMsQ0FBQztvQkFDaEQsSUFBSSxPQUFPLGFBQWEsS0FBSyxRQUFRLElBQUksT0FBTyxhQUFhLEVBQUUsY0FBYyxLQUFLLFFBQVEsRUFBRTt3QkFDeEYsTUFBTSxvRkFBb0YsQ0FBQTtxQkFDN0Y7b0JBRUQsSUFBSSxhQUFhLEdBQUcsYUFBYSxFQUFFLGNBQWMsQ0FBQztvQkFDbEQsSUFBSSxhQUFhLEVBQUUsTUFBTSxLQUFLLGlCQUFpQjt3QkFBRSxNQUFNLDJCQUEyQixDQUFDO29CQUVuRixNQUFNLEVBQUMsYUFBYSxFQUFDLEdBQUcsYUFBYSxJQUFJLEVBQUUsQ0FBQztvQkFDNUMsSUFBSSxDQUFDLGFBQWE7d0JBQUUsTUFBTSxxRUFBcUUsQ0FBQTtvQkFDL0YsTUFBTSx5QkFBeUIsR0FBRyxNQUFNLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFFakYsT0FBTyxFQUFDLEdBQUcsUUFBUSxFQUFFLFlBQVksRUFBRSx5QkFBeUIsRUFBQyxDQUFBO2lCQUNoRTthQUNKO1lBRUQsT0FBTyxRQUFRLENBQUM7UUFDcEIsQ0FBQztRQUVELGFBQWE7WUFDVCxPQUFPLENBQUMsQ0FBQztRQUNiLENBQUM7S0FFSjtJQWhERCxrRUFnREMifQ==