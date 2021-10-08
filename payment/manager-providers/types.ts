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

    //Id of provider checkout
    providerId: string;
    providerData: any;

    //Use when checkout is cancelled | means payment was refunded
    cancelReason?: string;
    cancelRequestDate?: Date;
}

export type PaymentProviderCheckoutResult = {
    checkout: PaymentProviderCheckout,
    products: Array<PaymentProviderCheckoutProductsResult>,
    subscription?: PaymentUserSubscriptionProperties
};

export interface PaymentProvider extends PaymentProviderBaseProperties {

    /**
     * This method should handle
     * - Checkout of products
     * - Checkout of subscriptions
     * - Reverting subscription cancel, by checking-out the same plan
     * - Handle round trips (like stripe 3D confirmation)
     *
     * @param user
     * @param checkoutObj Some providers have payment flow starting generating secrets on client, if it happens checkoutObj will be PaymentProviderCheckout
     */
    checkout(user: PaymentUser, checkoutObj: PaymentCheckout | PaymentProviderCheckout): Promise<PaymentProviderCheckoutResult>;

    /**
     * Implement checkout cancel
     */
    cancelCheckout(user: PaymentUser, checkoutObj: PaymentProviderCheckout): Promise<PaymentProviderCheckoutResult>;

    /**
     * Handle webhooks
     *
     * @param data
     */
    handleWebhook(user: PaymentUser, checkout: PaymentProviderCheckout, webhookData: any): Promise<PaymentProviderCheckoutResult | void>

    /**
     * Read user data
     *
     * @param data
     */
    readWebhookCustomer(data: any): Promise<{id: string} | {email: string} | void>

    /**
     * Some webhook events are not important, return if it's supported or not
     * @param webhookData
     */
    supportsWebhook(webhookData: any): Promise<boolean>;

    /**
     * Read checkout id
     *
     * @param data
     */
    readWebhookCheckout(user: PaymentUser, data: any): Promise<{providerCheckoutId: string} | void>
}

export interface PaymentAccountProvider<PA = PaymentUserAccount, PD = unknown> extends PaymentProvider {

    createCard(user: PaymentUser, data: PD): Promise<PaymentUserAccount | PA>;

    updateDefaultCard(user: PaymentUser, cardIdentifier: string): Promise<PaymentUserAccount | PA>;

}

export type PaymentAccountProviderType<T> = T extends PaymentAccountProvider<infer U, any> ? U | PaymentUserAccount : unknown
export type PaymentAccountProviderData<T> = T extends PaymentAccountProvider<any, infer U> ? U : unknown