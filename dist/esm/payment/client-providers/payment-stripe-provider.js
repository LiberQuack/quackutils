import { loadStripe } from "@stripe/stripe-js";
import { AbstractPaymentClientProvider } from "./abstract-payment-client-provider";
export class PaymentStripeClientProvider extends AbstractPaymentClientProvider {
    provider = "stripe";
    stripePromise;
    constructor(stripePublicKey) {
        super();
        this.stripePromise = loadStripe(stripePublicKey);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudC1zdHJpcGUtcHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcGF5bWVudC9jbGllbnQtcHJvdmlkZXJzL3BheW1lbnQtc3RyaXBlLXByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQTtBQUM1QyxPQUFPLEVBQUMsNkJBQTZCLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQUlqRixNQUFNLE9BQU8sMkJBQTRCLFNBQVEsNkJBQTZCO0lBRTFFLFFBQVEsR0FBYSxRQUFRLENBQUM7SUFFdEIsYUFBYSxDQUFxQztJQUUxRCxZQUFZLGVBQXVCO1FBQy9CLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBbUQ7UUFDOUQsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxNQUFNO1lBQUUsTUFBTSx1QkFBdUIsQ0FBQztRQUUzQyxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLENBQUM7UUFFOUQsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNwQixNQUFNLCtDQUErQyxDQUFDO1NBQ3pEO1FBRUQsSUFBSSxjQUFjLElBQUksUUFBUSxFQUFFO1lBQzVCLE1BQU0sWUFBWSxHQUFxRCxRQUFRLENBQUMsWUFBWSxDQUFDO1lBQzdGLElBQUksWUFBWSxDQUFDLE1BQU0sS0FBSyxZQUFZLEVBQUU7Z0JBRXRDLElBQUksYUFBYSxHQUFHLFlBQVksQ0FBQyxjQUFjLENBQUM7Z0JBQ2hELElBQUksT0FBTyxhQUFhLEtBQUssUUFBUSxJQUFJLE9BQU8sYUFBYSxFQUFFLGNBQWMsS0FBSyxRQUFRLEVBQUU7b0JBQ3hGLE1BQU0sb0ZBQW9GLENBQUE7aUJBQzdGO2dCQUVELElBQUksYUFBYSxHQUFHLGFBQWEsRUFBRSxjQUFjLENBQUM7Z0JBQ2xELElBQUksYUFBYSxFQUFFLE1BQU0sS0FBSyxpQkFBaUI7b0JBQUUsTUFBTSwyQkFBMkIsQ0FBQztnQkFFbkYsTUFBTSxFQUFDLGFBQWEsRUFBQyxHQUFHLGFBQWEsSUFBSSxFQUFFLENBQUM7Z0JBQzVDLElBQUksQ0FBQyxhQUFhO29CQUFFLE1BQU0scUVBQXFFLENBQUE7Z0JBQy9GLE1BQU0seUJBQXlCLEdBQUcsTUFBTSxNQUFNLENBQUMsa0JBQWtCLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBRWpGLE9BQU8sRUFBQyxHQUFHLFFBQVEsRUFBRSxZQUFZLEVBQUUseUJBQXlCLEVBQUMsQ0FBQTthQUNoRTtTQUNKO1FBRUQsT0FBTyxRQUFRLENBQUM7SUFDcEIsQ0FBQztJQUVELGFBQWE7UUFDVCxPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7Q0FFSiJ9