import StripeTypes from "@stripe/stripe-js";

export type StripeRef = {
    stripeClient: StripeTypes.Stripe,
    stripeElements: StripeTypes.StripeElements,
    stripeElementInstances: StripeTypes.StripeElementBase[],
    html: {
        cardNumber: HTMLElement,
        cardExpiry: HTMLElement,
        cardCvc: HTMLElement,
    }
};