import uuid from "uuid";
import {PaymentClientTest} from "./payment-client-test";
import {PaymentServerTest} from "./payment-server-test";
import {setupDomEnvironment} from "../setup-dom-environment";
import {PaymentStripeClientProvider} from "../../src";
import {PaymentCalculatedCheckout, PaymentCompletedCheckout} from "../../src/payment/types";

describe("Checkout calc", async () => {
    throw "Need to implement it"

    const paymentServer = new PaymentServerTest();

    paymentServer.calculateCheckout({}, {
        items: [],

        inlineItems: [{
            currency: "USD",
            title: "Test",
            price: 10,
            type: 'product',
            quantity: 7,
        }],

        coupon_codes: [/* TODO: Add a coupon code */],

        //TODO: If different than providers in that instance
        // typescript should show a warning
        provider: "stripe",
        userId: ""
    })
})

describe("Stripe payment flow", async () => {
    throw "Need to implement it"

    const {clearDomEnvironment} = setupDomEnvironment();

    //Given: Server and client
    const paymentServer = new PaymentServerTest();
    const paymentClient = new PaymentClientTest([
            () => new PaymentStripeClientProvider("pk_test_51IG332FIx1iLyZGc71gYaVCUDKMPAFlRn49tyrzTqf3FYymriwKSJAnKbWyAK9c9WdIi3gn6O9Y8rOKc1tpSJGmQ00RU6pFiTC"),
        ]
    );
    paymentClient["sendCalculateCheckout"] = partialCheckout => paymentServer.calculateCheckout({}, partialCheckout);

    //When: Calculations and payment happen
    const calculatedCheckout = await paymentClient.calculateCheckout({
        items: [],
        userId: uuid.v4(),
        provider: "stripe",
        inlineItems: [{
            quantity: 1,
            currency: "USD",
            title: "My testing product",
            price: 100,
            type: "product",
        }]
    })

    const ui = await paymentClient.buildUi(calculatedCheckout, {
        onSuccess: async checkout => {
            paymentClient.checkout(checkout)
        }});

    document.body.append(ui)
    //TODO: Click on submit button for testing

    //Expect
    console.log("Server to execute the payment successfully")
    console.log("Calculated checkout to have a payment intent secret")
    console.log("inlineItems to be put in items, with inline property true")
    console.log("The stripe elements, to be inited like stripe.elements({token})")
    console.log("A stripe user to be created")
    console.log("A stripe user to have a credit card attached to himself")

    clearDomEnvironment();
})

describe("Stripe subscription flow", () => {
    throw "Need to implement it"
})

describe("Stripe subscription cancellation flow", () => {
    throw "Need to implement it"
})

describe("Stripe subscription revert cancellation flow", () => {
    throw "Need to implement it"
})