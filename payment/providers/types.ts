import {PaymentUser, PaymentUserAccountsProperties} from "../types";
import {ValuesType} from "utility-types";

export interface BasePaymentProvider {
    provider: string;
}

export interface PaymentAccountProvider<CCD = unknown> extends BasePaymentProvider{

    createCard(user: PaymentUser, data: CCD): Promise<ValuesType<PaymentUserAccountsProperties["accounts"]>>;

}

export interface PaymentProvider extends BasePaymentProvider{



}

export interface SubscriptionProvider extends BasePaymentProvider{

}

