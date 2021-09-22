import {UserPaymentAccount, UserPaymentAccountProperties} from "../types";
import {ValuesType} from "utility-types";

export interface BasePaymentProvider {
    provider: string;
}

export interface PaymentAccountProvider<CCD = unknown> extends BasePaymentProvider{

    createCard(user: UserPaymentAccount, data: CCD): Promise<ValuesType<UserPaymentAccountProperties["accounts"]>>;

}

export interface PaymentProvider extends BasePaymentProvider{



}

export interface SubscriptionProvider extends BasePaymentProvider{

}

