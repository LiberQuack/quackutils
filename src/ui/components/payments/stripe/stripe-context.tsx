import {createContext} from "haunted";
import {Nullable} from "../../../../_/types";
import {StripeRef} from "./types";

export const StripeContext = createContext(null as Nullable<StripeRef>);
customElements.define("stripe-provider", StripeContext.Provider);

declare global {
    interface HTMLElementTagNameMap {
        'stripe-provider': typeof StripeContext.Provider
    }
}