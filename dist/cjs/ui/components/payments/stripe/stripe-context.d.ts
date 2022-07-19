import { Nullable } from "../../../../_/types";
import { StripeContextType } from "./types";
import { CustomElement } from "../../../ui-types";
export declare const StripeContext: import("haunted/lib/create-context").Context<Nullable<StripeContextType>>;
declare global {
    interface HTMLElementTagNameMap {
        'stripe-provider': CustomElement<typeof StripeContext.Provider>;
    }
}
