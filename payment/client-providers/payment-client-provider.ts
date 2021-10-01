import {PaymentCheckout} from "../types";
import {PaymentProviderCheckout} from "../manager-providers/types";

export abstract class PaymentClientProvider {

    abstract provider: string;

    /**
     * Sometimes payment providers may require 1 round trip... Internally
     * an error will be thrown if round trip count is greater than maxRoundTrips
     *
     * @return maxRoundTrip integer representing how many round trips are expected
     */
    abstract maxRoundTrips(): number;

    /**
     * Some providers require data communication between client and the their services,
     * if it's needed you should implement this method, otherwise just return the same checkout parameter
     *
     * @param checkout
     */
    abstract checkout(checkout: PaymentCheckout | PaymentProviderCheckout): Promise<PaymentCheckout | PaymentProviderCheckout>

}