import { PaymentCheckout } from "../types";
import { AbstractPaymentClientProvider } from "./abstract-payment-client-provider";
import { PaymentProviderCheckout } from "../manager-providers/types";
export declare class PaymentStripeClientProvider extends AbstractPaymentClientProvider {
    provider: "stripe";
    private stripePromise;
    constructor(stripePublicKey: string);
    checkout(checkout: PaymentCheckout | PaymentProviderCheckout): Promise<PaymentCheckout | PaymentProviderCheckout>;
    maxRoundTrips(): number;
}
