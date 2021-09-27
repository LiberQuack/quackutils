import {PaymentCheckout} from "../types";
import {PaymentProviderBaseProperties} from "../manager-providers/types";

export interface PaymentClientProvider extends PaymentProviderBaseProperties {

    checkout(checkout: PaymentCheckout): Promise<PaymentCheckout>;

}