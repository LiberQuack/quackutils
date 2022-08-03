import {html, render} from "lit";
import {expect} from "chai";

describe("Correct stripe-form initialization (posterior import)", async () => {
    const template = html`
        <stripe-form .stripePublicKey="${'pk_test_51IG332FIx1iLyZGc71gYaVCUDKMPAFlRn49tyrzTqf3FYymriwKSJAnKbWyAK9c9WdIi3gn6O9Y8rOKc1tpSJGmQ00RU6pFiTC'}">
        </stripe-form>
    `

    render(template)

    await import("../../src/ui/components/payments/stripe/stripe-form")

    //Expect stripe-form to start with initial values, since the first moment when the element
    //is being constructed
})


describe("Correct stripe-form initialization (anterior import)", async () => {
    await import("../../src/ui/components/payments/stripe/stripe-form")

    const template = html`
        <stripe-form .stripePublicKey="${'pk_test_51IG332FIx1iLyZGc71gYaVCUDKMPAFlRn49tyrzTqf3FYymriwKSJAnKbWyAK9c9WdIi3gn6O9Y8rOKc1tpSJGmQ00RU6pFiTC'}">
        </stripe-form>
    `

    render(template)

    //Expect stripe-form to start with initial values, since the first moment when the element
    //is being constructed
})