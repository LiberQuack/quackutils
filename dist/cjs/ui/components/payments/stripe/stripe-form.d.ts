import "./stripe-context";
import StripeTypes from "@stripe/stripe-js";
import { CustomElement, CustomElementDefinition } from "../../../ui-types";
import { StripeContextType } from "./types";
export declare const fmt: {
    err: (...args: any[]) => any[];
};
export declare type StripeCardformEvents = {
    onformready: (e: CustomEvent) => void;
    onelementready: (e: CustomEvent<{
        elementType: string;
    }>) => void;
    onsendcardtoken: (e: CustomEvent<{
        token: StripeTypes.Token;
    }>) => void;
};
export declare type StripeCardFormType = CustomElementDefinition<{
    forceLoading?: boolean;
    btnContent?: any;
    stripePublicKey: string;
    value: StripeContextType;
}, Partial<StripeCardformEvents>>;
export declare const StripeForm: StripeCardFormType;
declare global {
    interface HTMLElementTagNameMap {
        'stripe-form': CustomElement<StripeCardFormType>;
    }
}
