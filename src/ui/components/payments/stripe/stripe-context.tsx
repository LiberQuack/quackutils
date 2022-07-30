import {createContext} from "haunted";
import {Nullable} from "../../../../_/types.js";
import {StripeContextType} from "./types.js";
import {CustomElement} from "../../../ui-types.js";

export const StripeContext = createContext(null as Nullable<StripeContextType>);
customElements.define("stripe-provider", StripeContext.Provider);

declare global {
    interface HTMLElementTagNameMap {
        'stripe-provider': CustomElement<typeof StripeContext.Provider>
    }
}