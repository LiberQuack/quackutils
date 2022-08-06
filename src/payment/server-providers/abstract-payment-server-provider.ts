import {PaymentCalculatedCheckout, PaymentCheckoutExecution, PaymentProduct, PaymentProviderData, PaymentUser, PaymentUserSubscriptionProperties} from "../types.js";

export interface PaymentProviderBaseProperties {
    provider: string;
}

export type PaymentExternalProductData = {
    productId: string;
    providerData: PaymentProviderData
};

export type PaymentProviderCheckoutResult = {
    checkout: PaymentCheckoutExecution,
    products: Array<PaymentExternalProductData>,
    subscription?: PaymentUserSubscriptionProperties
};

export abstract class AbstractPaymentServerProvider<PD = any> implements PaymentProviderBaseProperties {

    abstract provider: string;

    /**
     * This method should include externalData (provider data) into the calculated checkout
     *
     * @param user
     * @param calculatedCheckout
     */
    abstract prepareCheckout(user: PaymentUser, calculatedCheckout: PaymentCalculatedCheckout): Promise<PaymentCalculatedCheckout>;

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
    abstract checkout(user: PaymentUser, checkoutObj: PaymentCalculatedCheckout): Promise<PaymentCheckoutExecution>;

    /**
     * Implement checkout cancel
     */
    abstract cancelCheckout(user: PaymentUser, checkoutObj: PaymentCheckoutExecution): Promise<PaymentCheckoutExecution>;

    /**
     * Handle webhooks
     *
     * @param data
     */
    abstract handleWebhook(user: PaymentUser, checkout: PaymentCalculatedCheckout | PaymentCheckoutExecution, webhookData: any): Promise<PaymentCheckoutExecution | void>

    /**
     * Read user data
     *
     * @param data
     */
    abstract readWebhookCustomer(data: any): Promise<{id: string} | {email: string} | void>

    /**
     * Some webhook events are not important, return if it's supported or not
     * @param webhookData
     */
    abstract supportsWebhook(webhookData: any): Promise<boolean>;

    /**
     * Read checkout id
     *
     * @param data
     */
    abstract readWebhookCheckout(user: PaymentUser, data: any): Promise<{providerCheckoutId: string} | void>
}