import {PaymentClientProvider} from "./client-providers/types";
import {PaymentCheckout, PaymentUserData} from "./types";
import {PaymentProviderCheckout} from "./manager-providers/types";

/**
 * PaymentClient is the class for executing the checkout on front-end
 */
export abstract class PaymentClient {

    private providers: PaymentClientProvider[];

    constructor(providers: PaymentClientProvider[]) {
        this.providers = providers;
    }

    /**
     * Here you should send the checkout to the server
     *
     * @param checkout
     */
    abstract checkout(checkout: PaymentCheckout): Promise<PaymentUserData>;
}