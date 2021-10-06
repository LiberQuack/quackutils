import {PaymentCheckout, PaymentPartialCheckout, PaymentProduct, PaymentProductProviderData, PaymentProviderMinimalProperties, PaymentUser, PaymentUserAccount, PaymentUserData} from "./types";
import {ValuesType} from "utility-types";
import {PaymentAccountProvider, PaymentAccountProviderData, PaymentAccountProviderType, PaymentProvider, PaymentProviderCheckout, PaymentProviderCheckoutProductsResult, PaymentProviderCheckoutResult} from "./manager-providers/types";
import {AugmentedRequired} from "utility-types/dist/mapped-types";
import {UserModelType} from "../../src/models/user-model";

export abstract class PaymentManager<U extends PaymentUser, P extends PaymentProduct, PP extends (PaymentAccountProvider | PaymentProvider)[]> {

    providers: PP;

    constructor(paymentProviders: PP) {
        this.providers = paymentProviders;
    }

    async createCard<PN extends ValuesType<PP>["provider"]>(
        user: U,
        providerName: PN,
        card: PaymentAccountProviderData<ValuesType<PP>>
    ): Promise<{ accounts: Array<Extract<PaymentAccountProviderType<ValuesType<PP>>, { provider: PN }> | PaymentUserAccount > }> {

        const accountProviders = this.providers.filter(it => "createCard" in it /*TODO: Improve PaymentAccountProvider detection*/) as PaymentAccountProvider[];
        const provider = accountProviders.find(it => it.provider === providerName);

        if (!provider) {
            throw `Cannot create card for provider ${providerName}... Expected one of [${accountProviders.map(it => it.provider)}]`
        }

        const paymentAccount = await provider.createCard(user, card);

        const nextAccounts = this.mergeProviderData(user.payment?.accounts ?? [], paymentAccount);

        const paymentData: U["payment"] = {
            ...user.payment,
            accounts: nextAccounts
        };

        await this.updateUserPaymentProperties(user, paymentData)

        return {accounts: nextAccounts};
    }

    async updateDefaultCard<PN extends ValuesType<PP>["provider"]>(
        user: U,
        providerName: PN,
        card: Parameters<Extract<ValuesType<PP>, PaymentAccountProvider & { provider: PN }>["updateDefaultCard"]>[1]
    ): Promise<{ accounts: PaymentUserAccount[] }> {
        const accountProviders = this.providers.filter(it => "updateDefaultCard" in it) as PaymentAccountProvider[];
        const provider = accountProviders.find(it => it.provider === providerName);

        if (!provider) {
            throw `Cannot create card for provider ${providerName}... Expected one of [${accountProviders.map(it => it.provider)}]`
        }

        const paymentAccount = await provider.updateDefaultCard(user, card);

        const nextAccounts = this.mergeProviderData(user.payment?.accounts ?? [], paymentAccount);

        await this.updateUserPaymentProperties(user, {
            ...user.payment,
            accounts: nextAccounts
        })

        return {accounts: nextAccounts};
    }

    async checkout(user: U, checkout: PaymentPartialCheckout): Promise<PaymentUserData> {
        const providerData = await this.providerCheckout(user, checkout);
        await this.saveProductsProviderData(providerData.products);

        const {success} = providerData.checkout;
        const successfulCheckout = success ? await this.saveCheckout(user, providerData.checkout) : undefined;

        const paymentData: PaymentUserData = {
            ...user.payment,
            subscription: providerData.subscription,
            lastCheckout: successfulCheckout
        };

        if (success) {
            await this.updateUserPaymentProperties(user, paymentData);
        }

        return paymentData
    }

    async cancelCheckout(user: U, checkoutId: string, reason: string): Promise<PaymentUserData> {
        const checkout = await this.retrieveCheckout(user, checkoutId);

        if (!("providerData" in checkout && checkout.providerData)) {
            throw "Expected property providerData. It indicates checkout was not successful, " +
            "therefore it's not possible cancel it, please, review checkout id " + checkoutId + " before proceeding";
        }

        const providerInstance = this.providers.find(it => it.provider === checkout.provider);
        if (!providerInstance) throw `Provider ${checkout.provider} is unavailable, expected providers are ${this.providers.map(it => it.provider)}`;

        const checkoutResult: PaymentProviderCheckoutResult = await providerInstance.cancelCheckout(user, checkout);
        const savedCheckout = await this.saveCheckout(user, {...checkoutResult.checkout, cancelRequestDate: new Date(), cancelReason: reason})

        const paymentData: PaymentUserData = {
            ...user.payment,
            subscription: checkoutResult.subscription,
            lastCheckout: savedCheckout
        };

        await this.updateUserPaymentProperties(user, paymentData)

        return paymentData
    }

    protected async providerCheckout(user: U, checkout: PaymentPartialCheckout): Promise<PaymentProviderCheckoutResult> {
        const providerInstance = this.providers.find(it => it.provider === checkout.provider);

        if (!providerInstance) {
            throw `Server has no payment provider called ${checkout.provider}, possible values are [${this.providers.map(it => it.provider)}]`
        }

        const calculatedCheckout = await this.calculateCheckout(user, checkout);
        const providerData = await providerInstance.checkout(user, calculatedCheckout);

        return providerData;
    }

    private async saveProductsProviderData(providerResult: PaymentProviderCheckoutProductsResult[]) {
        for (let {productObj, providerData} of providerResult) {
            await this.updateProductProvidersData(productObj, this.mergeProviderData(productObj.payment ?? [], providerData))
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
    abstract retrieveCheckout(user: U, checkoutId: Required<(PaymentProviderCheckout | PaymentCheckout)>["_id"]): Promise<PaymentProviderCheckout | PaymentCheckout>

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
    protected abstract saveCheckout(user: U, checkout: PaymentProviderCheckout): Promise<AugmentedRequired<PaymentProviderCheckout, "_id">>

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