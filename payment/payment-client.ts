import {PaymentClientProvider} from "./client-providers/types";
import {PaymentCheckout} from "./types";

/**
 * PaymentClient is the class for executing the checkout on front-end
 */
export abstract class PaymentClient {

    private providers: PaymentClientProvider[];

    constructor(providers: PaymentClientProvider[]) {
        this.providers = providers;
    }

    protected _checkout() {

    }

    abstract checkout(checkout: PaymentCheckout): Promise<void>;
}