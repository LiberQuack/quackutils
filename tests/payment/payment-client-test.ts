import {AbstractPaymentClient} from "../../src/payment/abstract-payment-client";
import {PaymentCalculatedCheckout, PaymentPartialCheckout, PaymentCompletedCheckout, PaymentUserData} from "../../src/payment/types";
import {PaymentStripeClientProvider} from "../../src/payment/client-providers/payment-stripe-client-provider";
import {AbstractPaymentClientProvider} from "../../src";

export class PaymentClientTest<P extends AbstractPaymentClientProvider = any> extends AbstractPaymentClient<P> {

    protected async sendCancelCheckout(checkout: PaymentCompletedCheckout): Promise<PaymentUserData> {
        const req: RequestInit = {body: JSON.stringify(checkout), method: "POST"};
        const paymentUserData = await fetch("https://fake-api/payments/cancel-checkout", req).then(it => it.json());
        return paymentUserData as any
    }

    protected async sendCheckout(checkout: PaymentCalculatedCheckout | PaymentCompletedCheckout): Promise<PaymentUserData> {
        const reqOpts: RequestInit = {body: JSON.stringify(checkout), method: "POST"};
        const paymentUserData = await fetch("https://fake-api/payments/checkout", reqOpts).then(it => it.json());
        return paymentUserData
    }

    protected async sendCalculateCheckout(partialCheckout: PaymentPartialCheckout): Promise<PaymentCalculatedCheckout> {
        const reqOpts: RequestInit = {body: JSON.stringify(partialCheckout), method: "POST"};
        const checkout = await fetch("https://fake-api/payments/calculate-checkout", reqOpts).then(it => it.json());
        return checkout
    }
}
