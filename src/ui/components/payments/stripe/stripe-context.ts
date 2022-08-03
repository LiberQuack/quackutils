import {createContext} from "haunted";
import {Nullable} from "../../../../_/types.js";
import {StripeContextType} from "./types.js";

export const StripeContext = createContext(null as Nullable<StripeContextType>);
customElements.define("stripe-provider", StripeContext.Provider);