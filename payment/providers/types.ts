import {UserPaymentAccount, UserPaymentAccountProperties} from "../types";
import {PaymentManager} from "../payment-manager";
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

//Utility
export type ProviderName<P extends PaymentManager<any, any, any>> = ValuesType<P["providers"]>["provider"]
export type CreateCardData<P extends PaymentManager<any, any, any>> = Parameters<Extract<ValuesType<P["providers"]>, PaymentAccountProvider<any>>["createCard"]>[1]