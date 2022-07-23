import {paymentClient} from "./create-payment-client-example";
import {PaymentPartialCheckout} from "../src/payment/types";
import uuid from "uuid"

export async function calculatePayment() {

    const initialCheckout: PaymentPartialCheckout = {
        provider: "stripe",
        userId: uuid.v4(),
        items: [],
        inlineItems: [{
            type: "product",
            title: "Financial Services",
            price: 100,
            currency: "USD"
        }]
    };

    const calculatedCheckout = await paymentClient.calculateCheckout(initialCheckout);

    const checkoutPage = (
        <>
            <div>Description</div>
            <div>{calculatedCheckout.items.map(it => <div>{it.product.title}</div>)}</div>
            <div>Total</div>
            <div>{calculatedCheckout.currency} {calculatedCheckout.total}</div>
        </>
    )

    return {calculatedCheckout, checkoutPage}
}
