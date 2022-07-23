import {PaymentClientTest} from "./payment-client-test";
import {PaymentStripeClientProvider} from "../../src/payment/client-providers/payment-stripe-client-provider";
import uuid from "uuid";
import {PaymentServerTest} from "./payment-server-test";
import {PaymentStripeServerProvider} from "../../src/payment/server-providers/payment-stripe-server-provider";
import browserEnv from "@ikscodes/browser-env";

describe("Stripe payment flow", async () => {

    //Given:
    const paymentServer = new PaymentServerTest();
    const paymentClient = new PaymentClientTest();

    paymentClient["sendCalculateCheckout"] = partialCheckout => paymentServer.calculateCheckout({}, partialCheckout);

    //When:
    const calculatedCheckout = await paymentClient.calculateCheckout({
        items: [],
        userId: uuid.v4(),
        provider: "stripe",
        inlineItems: [{
            currency: "USD",
            title: "My testing product",
            price: 100,
            type: "product",
        }]
    })

    console.log("Client: Mount stripe element and submit")
    paymentClient.wireElements(calculatedCheckout)
    console.log("Fill the form and submit it")

    //Expect
    console.log("Server to execute the payment successfully")
    console.log("Calculated checkout to have a payment intent secret")
    console.log("inlineItems to be put in items, with inline property true")
    console.log("The stripe elements, to be inited like stripe.elements({token})")
    console.log("A stripe user to be created")
    console.log("A stripe user to have a credit card attached to himself")
})