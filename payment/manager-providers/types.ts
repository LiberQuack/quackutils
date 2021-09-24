import {PaymentProduct, PaymentUser, PaymentUserAccountsProperties} from "../types";
import {ValuesType} from "utility-types";

export interface PaymentBaseProvider {
    provider: string;
}

export interface PaymentAccountProvider extends PaymentBaseProvider {

    createCard(user: PaymentUser, data: any): Promise<ValuesType<PaymentUserAccountsProperties["accounts"]>>;

    updateDefaultCard(user: PaymentUser, cardIdentifier: string): Promise<ValuesType<PaymentUserAccountsProperties["accounts"]>>;

    subscribeToPlan(user: PaymentUser, plan: PaymentProduct): Promise<Partial<PaymentUserAccountsProperties>>

}

export interface PaymentProvider extends PaymentBaseProvider {


}

export interface SubscriptionProvider extends PaymentBaseProvider {

}