import {AbstractPaymentClient} from "../src/payment/abstract-payment-client";
import {PaymentProviderCheckout} from "../src/payment/manager-providers/types";
import {PaymentCheckout, PaymentUserData} from "../src/payment/types";
import {PaymentStripeClientProvider} from "../src/payment/client-providers/payment-stripe-provider";

class PaymentClient extends AbstractPaymentClient {

    protected async sendCancelCheckout(checkout: PaymentProviderCheckout, reason: string): Promise<PaymentUserData> {
        const cancellationCheckout: PaymentProviderCheckout = {...checkout};
        cancellationCheckout.cancelReason = reason;

        const req: RequestInit = {body: JSON.stringify(checkout), method: "POST"};
        const PaymentUserData = await fetch("https://fake-api/payments/cancel-checkout", req).then(it => it.json());
        return PaymentUserData
    }

    protected async sendCheckout(checkout: PaymentCheckout | PaymentProviderCheckout): Promise<PaymentUserData> {
        const reqOpts: RequestInit = {body: JSON.stringify(checkout), method: "POST"};
        const PaymentUserData = await fetch("https://fake-api/payments/checkout", reqOpts).then(it => it.json());
        return PaymentUserData
    }

}

const paymentClient = new PaymentClient([
    () => new PaymentStripeClientProvider("pk_test_51IG332FIx1iLyZGc71gYaVCUDKMPAFlRn49tyrzTqf3FYymriwKSJAnKbWyAK9c9WdIi3gn6O9Y8rOKc1tpSJGmQ00RU6pFiTC")
]);