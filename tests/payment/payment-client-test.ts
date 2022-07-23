import {AbstractPaymentClient} from "../../src/payment/abstract-payment-client";
import {PaymentProviderCheckout} from "../../src/payment/server-providers/types";
import {PaymentCheckout, PaymentPartialCheckout, PaymentUserData} from "../../src/payment/types";
import {PaymentStripeClientProvider} from "../../src/payment/client-providers/payment-stripe-client-provider";

export class PaymentClientTest extends AbstractPaymentClient {

    constructor() {
        const providers = [
            () => new PaymentStripeClientProvider("pk_test_51IG332FIx1iLyZGc71gYaVCUDKMPAFlRn49tyrzTqf3FYymriwKSJAnKbWyAK9c9WdIi3gn6O9Y8rOKc1tpSJGmQ00RU6pFiTC")
        ]
        super(providers);
    }

    protected async sendCancelCheckout(checkout: PaymentProviderCheckout, reason: string): Promise<PaymentUserData> {
        const cancellationCheckout: PaymentProviderCheckout = {...checkout};
        cancellationCheckout.cancelReason = reason;

        const req: RequestInit = {body: JSON.stringify(checkout), method: "POST"};
        const paymentUserData = await fetch("https://fake-api/payments/cancel-checkout", req).then(it => it.json());
        return paymentUserData
    }

    protected async sendCheckout(checkout: PaymentCheckout | PaymentProviderCheckout): Promise<PaymentUserData> {
        const reqOpts: RequestInit = {body: JSON.stringify(checkout), method: "POST"};
        const paymentUserData = await fetch("https://fake-api/payments/checkout", reqOpts).then(it => it.json());
        return paymentUserData
    }

    protected async sendCalculateCheckout(partialCheckout: PaymentPartialCheckout): Promise<PaymentCheckout> {
        const reqOpts: RequestInit = {body: JSON.stringify(partialCheckout), method: "POST"};
        const checkout = await fetch("https://fake-api/payments/calculate-checkout", reqOpts).then(it => it.json());
        return checkout
    }

}
