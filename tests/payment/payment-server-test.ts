import {AbstractPaymentServer} from "../../src/payment/abstract-payment-server";
import {PaymentStripeClientProvider} from "../../src/payment/client-providers/payment-stripe-client-provider";
import {PaymentCalculatedCheckout, PaymentPartialCheckout, PaymentProduct, PaymentCompletedCheckout, PaymentUser} from "../../src/payment/types";
import {PaymentStripeServerProvider} from "../../src/payment/server-providers/payment-stripe-server-provider";
import {AbstractPaymentServerProvider} from "../../src";

export class PaymentServerTest<P extends PaymentProduct = any> extends AbstractPaymentServer<PaymentUser,P, PaymentStripeServerProvider> {

    constructor() {
        const stripeServerProvider = new PaymentStripeServerProvider("sk_test_51IG332FIx1iLyZGcQNijexsy68POTsgRhCpND6yekwBffywFXa3EM5wvn2jJxPFMx4l2IqHvyHzLpY272HbqVlAN00PjmkPSzB")
        super([stripeServerProvider]);
    }

    calculateCheckout(user: {}, checkout: PaymentPartialCheckout<ArrayType<this["providers"]>["provider"]>): Promise<PaymentCalculatedCheckout> {
        throw "Not implemented";
    }

    retrieveCheckout(user: {}, checkoutId: string): Promise<PaymentCompletedCheckout | PaymentCalculatedCheckout> {
        throw "Not implemented";
    }

    retrieveCheckoutByProviderId(user: {}, providerCheckoutId: string): Promise<PaymentCompletedCheckout> {
        throw "Not implemented";
    }

    async retrieveUser(customerData: { id: string } | { email: string }): Promise<PaymentUser> {
        return {
            getId(): string {
                return "none"
            },
            email: "always the same email",
        }
    }

    protected saveCheckout(user: {}, checkout: PaymentCompletedCheckout): Promise<PaymentCompletedCheckout> {
        throw "Not implemented";
    }

    protected updateProductProvidersData<P, PPPD>(product: P, providersData: PPPD[]): Promise<void> {
        return Promise.resolve(undefined);
    }

    protected updateUserPaymentProperties(user: {}, paymentData: {}): Promise<void> {
        return Promise.resolve(undefined);
    }

}