import type {PaymentCalculatedCheckout, PaymentCompletedCheckout} from "../types.js";

export type ProviderClientProviderData<P extends AbstractPaymentClientProvider> = P extends AbstractPaymentClientProvider<infer PD> ? PD : never;

export abstract class AbstractPaymentClientProvider<PD = any> {

    abstract provider: string;

    /**
     * Some providers require data communication between client and their services,
     * if it's needed you should implement this method, otherwise just return the same checkout parameter
     *
     * @param checkout
     */
    abstract checkout(checkout: PaymentCalculatedCheckout): Promise<PaymentCompletedCheckout>

    /**
     * Implement here UI elements from the provider
     *
     */
    abstract buildUi(checkout: PaymentCalculatedCheckout, opts: any, sendCheckoutToServer: (checkout: PaymentCalculatedCheckout) => Promise<void>): Promise<any>

    /**
     * Sometimes payment providers may require 1 round trip... Internally
     * an error will be thrown if round trip count is greater than maxRoundTrips
     *
     * @return maxRoundTrip integer representing how many round trips are expected
     */
    maxRoundTrips(): number {
        return 1
    };

}