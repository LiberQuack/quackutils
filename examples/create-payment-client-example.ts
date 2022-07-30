import {AbstractPaymentClient} from "../src/payment/abstract-payment-client";
import {PaymentCalculatedCheckout, PaymentPartialCheckout, PaymentCompletedCheckout, PaymentUserData} from "../src/payment/types";
import {PaymentStripeClientProvider} from "../src/payment/client-providers/payment-stripe-client-provider";

class PaymentClient extends AbstractPaymentClient {

    protected async sendCancelCheckout(checkout: PaymentCompletedCheckout, reason: string): Promise<PaymentUserData> {
        const cancellationCheckout: PaymentCompletedCheckout = {...checkout};
        cancellationCheckout.cancelReason = reason;

        const req: RequestInit = {body: JSON.stringify(checkout), method: "POST"};
        const paymentUserData = await fetch("https://fake-api/payments/cancel-checkout", req).then(it => it.json());
        return paymentUserData
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

export const paymentClient = new PaymentClient([
    () => new PaymentStripeClientProvider("pk_test_51IG332FIx1iLyZGc71gYaVCUDKMPAFlRn49tyrzTqf3FYymriwKSJAnKbWyAK9c9WdIi3gn6O9Y8rOKc1tpSJGmQ00RU6pFiTC")
]);