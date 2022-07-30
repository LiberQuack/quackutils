import uuid from "uuid";
import {PaymentClientTest} from "./payment-client-test";
import {PaymentServerTest} from "./payment-server-test";
import {setupDomEnvironment} from "../setup-dom-environment";

describe("Stripe payment flow", async () => {
    const {clearDomEnvironment} = setupDomEnvironment();

    //Given: Server and client
    const paymentServer = new PaymentServerTest();
    const paymentClient = new PaymentClientTest();
    paymentClient["sendCalculateCheckout"] = partialCheckout => paymentServer.calculateCheckout({}, partialCheckout);

    //When: Calculations and payment happen
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

    paymentClient.broadcastProviderData(calculatedCheckout);


    //Expect
    console.log("Server to execute the payment successfully")
    console.log("Calculated checkout to have a payment intent secret")
    console.log("inlineItems to be put in items, with inline property true")
    console.log("The stripe elements, to be inited like stripe.elements({token})")
    console.log("A stripe user to be created")
    console.log("A stripe user to have a credit card attached to himself")

    clearDomEnvironment();
})