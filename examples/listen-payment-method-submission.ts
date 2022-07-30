import {paymentClient} from "./create-payment-client-example";
import {StripeCardformEvents} from "../src/ui/components/payments/stripe/stripe-form";
import {PaymentCalculatedCheckout, PaymentPartialCheckout} from "../src/payment/types";
import uuid from "uuid"
import {calculatePayment} from "./calculate-payment";

export async function setupForm() {
    const calculatedCheckout = await calculatePayment();

    window.addEventListener<StripeCardformEvents, "sendcardtoken">("sendcardtoken", e => {
        const cardToken = e.detail.token;
        paymentClient.checkout(calculatedCheckout.calculatedCheckout);
    })
}

