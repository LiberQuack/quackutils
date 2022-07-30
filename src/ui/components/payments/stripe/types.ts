import StripeTypes from "@stripe/stripe-js";
import {useAwait} from "../../../util/hooks/use-await.js";

export type StripeContextType = {
    stripeClient: StripeTypes.Stripe,
    stripeElements: StripeTypes.StripeElements,
    useSubmit: ReturnType<typeof useAwait>
};