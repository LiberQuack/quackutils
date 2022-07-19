import {createContext} from "haunted";
import {Nullable} from "../../../../_/types";
import {StripeContextType} from "./types";
import {CustomElement} from "../../../ui-types";

export const StripeContext = createContext(null as Nullable<StripeContextType>);
customElements.define("stripe-provider", StripeContext.Provider);

declare global {
    interface HTMLElementTagNameMap {
        'stripe-provider': CustomElement<typeof StripeContext.Provider>
    }
}