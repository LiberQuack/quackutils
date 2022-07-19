import { PaymentCheckout, PaymentPartialCheckout, PaymentProduct, PaymentProductProviderData, PaymentUser, PaymentUserAccount, PaymentUserData } from "./types";
import { ValuesType } from "utility-types";
import { PaymentAccountProvider, PaymentAccountProviderData, PaymentAccountProviderType, PaymentProvider, PaymentProviderCheckout, PaymentProviderCheckoutResult } from "./manager-providers/types";
export declare abstract class AbstractPaymentServer<U extends PaymentUser, P extends PaymentProduct, PP extends (PaymentAccountProvider | PaymentProvider)[]> {
    providers: PP;
    constructor(paymentProviders: PP);
    createCard<PN extends ValuesType<PP>["provider"]>(user: U, providerName: PN, card: PaymentAccountProviderData<ValuesType<PP>>): Promise<{
        accounts: Array<Extract<PaymentAccountProviderType<ValuesType<PP>>, {
            provider: PN;
        }> | PaymentUserAccount>;
    }>;
    updateDefaultCard<PN extends ValuesType<PP>["provider"]>(user: U, providerName: PN, card: Parameters<Extract<ValuesType<PP>, PaymentAccountProvider & {
        provider: PN;
    }>["updateDefaultCard"]>[1]): Promise<{
        accounts: PaymentUserAccount[];
    }>;
    handleWebhook(providerName: string, webhookData: any): Promise<void>;
    abstract retrieveUser(customerData: {
        id: string;
    } | {
        email: string;
    }): Promise<U>;
    checkout(user: U, checkout: PaymentPartialCheckout): Promise<PaymentUserData>;
    cancelCheckout(user: U, checkoutId: string, reason: string): Promise<PaymentUserData>;
    protected providerCheckout(user: U, checkout: PaymentPartialCheckout): Promise<PaymentProviderCheckoutResult>;
    private saveProductsProviderData;
    private mergeProviderData;
    /**
     * Implement this method for retrieving checkouts from your data source
     */
    abstract retrieveCheckout(user: U, checkoutId: string): Promise<PaymentProviderCheckout | PaymentCheckout>;
    /**
     * Implement this method for retrieving checkouts from your data source
     */
    abstract retrieveCheckoutByProviderId(user: U, providerCheckoutId: string): Promise<PaymentProviderCheckout>;
    /**
     * Implement this method for:
     * - persisting successful checkouts
     * - updating succeeded checkouts
     *
     * @example
     * if (!checkout._id) {
     *     insertDB(checkout)
     * } else {
     *     updateDb(checkout._id, checkout)
     * }
     */
    protected abstract saveCheckout(user: U, checkout: PaymentProviderCheckout): Promise<PaymentProviderCheckout>;
    /**
     * Implement this method per project, should fill as many field as possible
     * items.product is required
     *
     * @param user
     * @param checkout
     */
    abstract calculateCheckout(user: U, checkout: PaymentPartialCheckout): Promise<PaymentCheckout>;
    /**
     * Sometimes products need to be created on provider, implement this method for persisting that changes
     *
     * @param product
     * @param providersData
     * @protected
     */
    protected abstract updateProductProvidersData<P extends PaymentProduct, PPPD extends PaymentProductProviderData>(product: P, providersData: PPPD[]): Promise<void>;
    /**
     * Persist user will allow you to save user payment properties, implementation should be similar to example
     *
     * @example
     * collection.updateOne({_id: user._id}, {$set: {payment: paymentData}});
     *
     *
     * @param user
     * @param paymentData
     * @protected
     */
    protected abstract updateUserPaymentProperties(user: U, paymentData: U["payment"]): Promise<void>;
}
