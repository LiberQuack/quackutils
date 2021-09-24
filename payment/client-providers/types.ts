import {PaymentCheckout} from "../types";
import {PaymentBaseProvider} from "../manager-providers/types";

export interface PaymentClientProvider extends PaymentBaseProvider {

    preCheckout(checkout: PaymentCheckout): Promise<any | void>;

}