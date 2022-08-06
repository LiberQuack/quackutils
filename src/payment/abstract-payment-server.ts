import {PaymentCalculatedCheckout, PaymentCheckoutExecution, PaymentPartialCheckout, PaymentProduct, PaymentProviderData, PaymentProviderMinimalProperties, PaymentUser, PaymentUserData} from "./types.js";
import {AbstractPaymentServerProvider, PaymentExternalProductData, PaymentProviderCheckoutResult} from "./server-providers/abstract-payment-server-provider.js";
import {logger} from "../logger.js";
import {Undefinable} from "../_/types.js";

export abstract class AbstractPaymentServer<U extends PaymentUser = any, P extends PaymentProduct = any, PP extends AbstractPaymentServerProvider = any> {

    providers: PP[];

    constructor(paymentProviders: PP[]) {
        this.providers = paymentProviders;
    }

    // async createCard<PN extends ValuesType<PP>["provider"]>(
    //     user: U,
    //     providerName: PN,
    //     card: PaymentAccountProviderData<ValuesType<PP>>
    // ): Promise<{ accounts: Array<Extract<PaymentAccountProviderType<ValuesType<PP>>, { provider: PN }> | PaymentUserAccount > }> {
    //
    //     const accountProviders = this.providers.filter(it => "createCard" in it /*TODO: Improve PaymentAccountProvider detection*/) as PaymentAccountProvider[];
    //     const provider = accountProviders.find(it => it.provider === providerName);
    //
    //     if (!provider) {
    //         throw `Cannot create card for provider ${providerName}... Expected one of [${accountProviders.map(it => it.provider)}]`
    //     }
    //
    //     const paymentAccount = await provider.createCard(user, card);
    //
    //     const nextAccounts = this.mergeProviderData(user.payment?.externalProviderAccounts ?? [], paymentAccount);
    //
    //     const paymentData: U["payment"] = {
    //         ...user.payment,
    //         accounts: nextAccounts
    //     };
    //
    //     await this.updateUserPaymentProperties(user, paymentData)
    //
    //     return {accounts: nextAccounts};
    // }

    // async updateDefaultCard<PN extends ValuesType<PP>["provider"]>(
    //     user: U,
    //     providerName: PN,
    //     card: Parameters<Extract<ValuesType<PP>, PaymentAccountProvider & { provider: PN }>["updateDefaultCard"]>[1]
    // ): Promise<{ accounts: PaymentUserAccount[] }> {
    //     const accountProviders = this.providers.filter(it => "updateDefaultCard" in it) as PaymentAccountProvider[];
    //     const provider = accountProviders.find(it => it.provider === providerName);
    //
    //     if (!provider) {
    //         throw `Cannot create card for provider ${providerName}... Expected one of [${accountProviders.map(it => it.provider)}]`
    //     }
    //
    //     const paymentAccount = await provider.updateDefaultCard(user, card);
    //
    //     const nextAccounts = this.mergeProviderData(user.payment?.externalProviderAccounts ?? [], paymentAccount);
    //
    //     await this.updateUserPaymentProperties(user, {
    //         ...user.payment,
    //         accounts: nextAccounts
    //     })
    //
    //     return {accounts: nextAccounts};
    // }

    async handleWebhook(providerName: string, webhookData: any) {
        const provider = this.providers.find(it => it.provider === providerName)
        if (!provider) throw "No payment provider found for handling webhook";

        const isSupported:boolean = await provider.supportsWebhook(webhookData);
        if (!isSupported) {
            console.log(this.handleWebhook, `Ignoring webhook from payment provider ${providerName}`);
            return
        }

        const customerData = await provider.readWebhookCustomer(webhookData);
        console.error(this.handleWebhook, {providerName, data: webhookData});
        if (!customerData) throw `Could not read customer id from ${providerName} webhook`

        const user = await this.retrieveUser(customerData);
        if (!user) throw `Could not find user from customer id ${customerData}`;

        const checkoutData = await provider.readWebhookCheckout(user, webhookData);
        const persistedCheckout = checkoutData && await this.retrieveCheckoutByProviderId(user, checkoutData.providerCheckoutId)
        if (!persistedCheckout) throw `Could not find checkout of webhook from ${user.getId()} provider ${providerName}`

        const checkoutExecution = await provider.handleWebhook(user, persistedCheckout, webhookData);
        if (checkoutExecution) {
            await this.saveCheckout(user, checkoutExecution)

            if (checkoutExecution.success) {
                await this.updateUserPaymentProperties(user, checkoutExecution);
            }
        }
    }

    abstract retrieveUser(customerData: { id: string } | { email: string }): Promise<U>

    /**
     * Checkout execution
     *
     * Keep in mind to watch success field,
     *
     *
     * @param user
     * @param checkout
     */
    async checkout(user: U, checkout: PaymentCalculatedCheckout): Promise<PaymentCheckoutExecution> {
        logger.info("payment-server", `Starting checkout for user ${checkout.userId}, provider ${checkout.provider}, products [${checkout.items.map(it => it.productId)}]`)

        const checkoutExecution = await this.providerCheckout(user, checkout);
        await this.saveProductsProviderData(checkoutExecution);
        await this.saveCheckout(user, checkoutExecution);

        if (checkoutExecution.success) {
            await this.updateUserPaymentProperties(user, checkoutExecution);
        }

        return checkoutExecution;
    }

    async cancelCheckout(user: U, checkoutId: string, reason: string): Promise<PaymentUserData> {
        const checkout = await this.retrieveCheckout(user, checkoutId);

        if (!checkout.externalData || !checkout.externalId) {
            throw "Expected property providerData and externalId. It indicates checkout was not successful, " +
            "therefore it's not possible cancel it, please, review checkout id " + checkoutId + " before proceeding";
        }

        const providerInstance = this.providers.find(it => it.provider === checkout.provider);
        if (!providerInstance) throw `Provider ${checkout.provider} is unavailable, expected providers are ${this.providers.map(it => it.provider)}`;

        const checkoutResult: PaymentCheckoutExecution = await providerInstance.cancelCheckout(user, checkout as PaymentCheckoutExecution);
        const savedCheckout = await this.saveCheckout(user, {...checkoutResult, cancelRequestDate: new Date(), cancelReason: reason})

        const paymentData: PaymentUserData = {
            ...user.payment,
            subscription: checkoutResult.subscription,
            lastCheckout: savedCheckout
        };

        await this.updateUserPaymentProperties(user, paymentData)

        return paymentData
    }

    protected async providerCheckout(user: U, checkout: PaymentCalculatedCheckout): Promise<PaymentCheckoutExecution> {
        const providerInstance = this.providers.find(it => it.provider === checkout.provider);

        if (!providerInstance) {
            throw `Server has no payment provider called ${checkout.provider}, possible values are [${this.providers.map(it => it.provider)}]`
        }

        const providerData:PaymentCheckoutExecution = await providerInstance.checkout(user, checkout);
        return providerData;
    }

    private async saveProductsProviderData(checkoutExecution: PaymentCheckoutExecution) {
        const externalProductData: Undefinable<PaymentExternalProductData[]> = checkoutExecution.externalProductData

        if (externalProductData) {
            for (let extData of externalProductData) {
                const product = checkoutExecution.items.find(it => it.productId === extData.productId)?.product;
                if (!product) {
                    logger.warn("payment-server", `Could not update product ${extData.productId} with provider ${checkoutExecution.provider} data`);
                    continue;
                }

                const updatedProduct = this.mergeProviderData(product.externalPaymentData ?? [], extData.providerData);
                await this.updateProductProvidersData(extData.productId, updatedProduct);
            }
        }
    }

    //Builds next providerData array
    // if provider data already exists, replace it...
    // otherwise add it to the array
    private mergeProviderData<PD extends PaymentProviderMinimalProperties>(originalData: PD[], data: PD): PD[] {
        const idx = originalData.findIndex(it => it.provider === data.provider)

        let nextData = [...originalData];
        if (idx > -1) {
            nextData[idx] = data;
        } else {
            nextData.push(data);
        }

        return nextData;
    }

    /**
     * Implement this method for retrieving checkouts from your data source
     */
    abstract retrieveCheckout(user: U, checkoutId: string): Promise<PaymentCheckoutExecution | PaymentCalculatedCheckout>

    /**
     * Implement this method for retrieving checkouts from your data source
     */
    abstract retrieveCheckoutByProviderId(user: U, providerCheckoutId: string): Promise<PaymentCheckoutExecution>

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
    protected abstract saveCheckout(user: U, checkout: PaymentCheckoutExecution): Promise<PaymentCheckoutExecution>

    /**
     * Implement this method per project, should fill as many field as possible
     * items.product is required
     *
     * @param user
     * @param partialCheckout
     */
    abstract calculateCheckout(user: U, partialCheckout: PaymentPartialCheckout): Promise<PaymentCalculatedCheckout>;

    /**
     * Sometimes products need to be created on provider, implement this method for persisting that changes
     *
     * @param product
     * @param providersData
     * @protected
     */
    protected abstract updateProductProvidersData<PPPD extends PaymentProviderData>(product: string, providersData: PPPD[]): Promise<void>;
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