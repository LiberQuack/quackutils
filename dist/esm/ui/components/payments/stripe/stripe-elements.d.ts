import { CustomElement, CustomElementDefinition } from "../../../ui-types";
export declare const StripeCard: CustomElementDefinition<{}, {}>;
export declare const StripeCardNumber: CustomElementDefinition<{}, {}>;
export declare const StripeCardCvc: CustomElementDefinition<{}, {}>;
export declare const StripeCardExpiry: CustomElementDefinition<{}, {}>;
export declare const StripeSubmitErr: CustomElementDefinition<{}, {}>;
export declare const StripeSubmit: CustomElementDefinition<{}, {}>;
declare global {
    interface HTMLElementTagNameMap {
        'stripe-card': CustomElement<typeof StripeCard>;
        'stripe-card-number': CustomElement<typeof StripeCardNumber>;
        'stripe-card-cvc': CustomElement<typeof StripeCardCvc>;
        'stripe-card-expiry': CustomElement<typeof StripeCardExpiry>;
    }
}
