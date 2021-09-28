import {PaymentCheckout, PaymentProduct, PaymentProductProviderData, PaymentUser, PaymentUserAccount, PaymentUserSubscriptionProperties} from "../types";

export interface PaymentProviderBaseProperties {
    provider: string;
}

export type PaymentProviderCheckoutProductsResult = {
    productObj: PaymentProduct;
    providerData: PaymentProductProviderData
};

export type PaymentProviderCheckout = PaymentCheckout & {
    success: boolean;
    providerData: any;
}

export type PaymentProviderCheckoutResult = {
    checkout: PaymentProviderCheckout,
    products: Array<PaymentProviderCheckoutProductsResult>,
    subscription?: PaymentUserSubscriptionProperties
};

export interface PaymentProvider extends PaymentProviderBaseProperties {

    /**
     * Keep in mind if you handle plans and products, you need to support both in checkout method
     *
     * @param user
     * @param checkoutObj
     */
    checkout(user: PaymentUser, checkoutObj: PaymentCheckout): Promise<PaymentProviderCheckoutResult>;

}

export interface PaymentAccountProvider<PA = PaymentUserAccount, PD = unknown> extends PaymentProvider {

    createCard(user: PaymentUser, data: PD): Promise<PaymentUserAccount | PA>;

    updateDefaultCard(user: PaymentUser, cardIdentifier: string): Promise<PaymentUserAccount | PA>;

}

export type PaymentAccountProviderType<T> = T extends PaymentAccountProvider<infer U, any> ? U | PaymentUserAccount : unknown
export type PaymentAccountProviderData<T> = T extends PaymentAccountProvider<any, infer U> ? U : unknown