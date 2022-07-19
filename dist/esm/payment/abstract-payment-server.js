export class AbstractPaymentServer {
    providers;
    constructor(paymentProviders) {
        this.providers = paymentProviders;
    }
    async createCard(user, providerName, card) {
        const accountProviders = this.providers.filter(it => "createCard" in it /*TODO: Improve PaymentAccountProvider detection*/);
        const provider = accountProviders.find(it => it.provider === providerName);
        if (!provider) {
            throw `Cannot create card for provider ${providerName}... Expected one of [${accountProviders.map(it => it.provider)}]`;
        }
        const paymentAccount = await provider.createCard(user, card);
        const nextAccounts = this.mergeProviderData(user.payment?.accounts ?? [], paymentAccount);
        const paymentData = {
            ...user.payment,
            accounts: nextAccounts
        };
        await this.updateUserPaymentProperties(user, paymentData);
        return { accounts: nextAccounts };
    }
    async updateDefaultCard(user, providerName, card) {
        const accountProviders = this.providers.filter(it => "updateDefaultCard" in it);
        const provider = accountProviders.find(it => it.provider === providerName);
        if (!provider) {
            throw `Cannot create card for provider ${providerName}... Expected one of [${accountProviders.map(it => it.provider)}]`;
        }
        const paymentAccount = await provider.updateDefaultCard(user, card);
        const nextAccounts = this.mergeProviderData(user.payment?.accounts ?? [], paymentAccount);
        await this.updateUserPaymentProperties(user, {
            ...user.payment,
            accounts: nextAccounts
        });
        return { accounts: nextAccounts };
    }
    async handleWebhook(providerName, webhookData) {
        const provider = this.providers.find(it => it.provider === providerName);
        if (!provider)
            throw "No payment provider found for handling webhook";
        const isSupported = await provider.supportsWebhook(webhookData);
        if (!isSupported) {
            console.log(this.handleWebhook, `Ignoring webhook from payment provider ${providerName}`);
            return;
        }
        const customerData = await provider.readWebhookCustomer(webhookData);
        console.error(this.handleWebhook, { providerName, data: webhookData });
        if (!customerData)
            throw `Could not read customer id from ${providerName} webhook`;
        const user = await this.retrieveUser(customerData);
        if (!user)
            throw `Could not find user from customer id ${customerData}`;
        const checkoutData = await provider.readWebhookCheckout(user, webhookData);
        const checkout = checkoutData && await this.retrieveCheckoutByProviderId(user, checkoutData.providerCheckoutId);
        if (!checkout)
            throw `Could not find checkout of webhook from ${user.email} provider ${providerName}`;
        const providerCheckoutResult = await provider.handleWebhook(user, checkout, webhookData);
        if (providerCheckoutResult) {
            const { success } = providerCheckoutResult.checkout;
            const successfulCheckout = success ? await this.saveCheckout(user, providerCheckoutResult.checkout) : undefined;
            const paymentData = {
                ...user.payment,
                subscription: providerCheckoutResult.subscription,
                lastCheckout: successfulCheckout,
            };
            if (success) {
                await this.updateUserPaymentProperties(user, paymentData);
            }
        }
        return;
    }
    async checkout(user, checkout) {
        const providerData = await this.providerCheckout(user, checkout);
        await this.saveProductsProviderData(providerData.products);
        const { success } = providerData.checkout;
        const successfulCheckout = success ? await this.saveCheckout(user, providerData.checkout) : undefined;
        const paymentData = {
            ...user.payment,
            subscription: providerData.subscription,
            lastCheckout: successfulCheckout
        };
        if (success) {
            await this.updateUserPaymentProperties(user, paymentData);
        }
        return paymentData;
    }
    async cancelCheckout(user, checkoutId, reason) {
        const checkout = await this.retrieveCheckout(user, checkoutId);
        if (!("providerData" in checkout && checkout.providerData)) {
            throw "Expected property providerData. It indicates checkout was not successful, " +
                "therefore it's not possible cancel it, please, review checkout id " + checkoutId + " before proceeding";
        }
        const providerInstance = this.providers.find(it => it.provider === checkout.provider);
        if (!providerInstance)
            throw `Provider ${checkout.provider} is unavailable, expected providers are ${this.providers.map(it => it.provider)}`;
        const checkoutResult = await providerInstance.cancelCheckout(user, checkout);
        const savedCheckout = await this.saveCheckout(user, { ...checkoutResult.checkout, cancelRequestDate: new Date(), cancelReason: reason });
        const paymentData = {
            ...user.payment,
            subscription: checkoutResult.subscription,
            lastCheckout: savedCheckout
        };
        await this.updateUserPaymentProperties(user, paymentData);
        return paymentData;
    }
    async providerCheckout(user, checkout) {
        const providerInstance = this.providers.find(it => it.provider === checkout.provider);
        if (!providerInstance) {
            throw `Server has no payment provider called ${checkout.provider}, possible values are [${this.providers.map(it => it.provider)}]`;
        }
        const calculatedCheckout = await this.calculateCheckout(user, checkout);
        const providerData = await providerInstance.checkout(user, calculatedCheckout);
        return providerData;
    }
    async saveProductsProviderData(providerResult) {
        for (let { productObj, providerData } of providerResult) {
            await this.updateProductProvidersData(productObj, this.mergeProviderData(productObj.payment ?? [], providerData));
        }
    }
    //Builds next providerData array
    // if provider data already exists, replace it...
    // otherwise add it to the array
    mergeProviderData(originalData, data) {
        const idx = originalData.findIndex(it => it.provider === data.provider);
        let nextData = [...originalData];
        if (idx > -1) {
            nextData[idx] = data;
        }
        else {
            nextData.push(data);
        }
        return nextData;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtcGF5bWVudC1zZXJ2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGF5bWVudC9hYnN0cmFjdC1wYXltZW50LXNlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLQSxNQUFNLE9BQWdCLHFCQUFxQjtJQUV2QyxTQUFTLENBQUs7SUFFZCxZQUFZLGdCQUFvQjtRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLGdCQUFnQixDQUFDO0lBQ3RDLENBQUM7SUFFRCxLQUFLLENBQUMsVUFBVSxDQUNaLElBQU8sRUFDUCxZQUFnQixFQUNoQixJQUFnRDtRQUdoRCxNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQyxrREFBa0QsQ0FBNkIsQ0FBQztRQUN4SixNQUFNLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUSxLQUFLLFlBQVksQ0FBQyxDQUFDO1FBRTNFLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDWCxNQUFNLG1DQUFtQyxZQUFZLHdCQUF3QixnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQTtTQUMxSDtRQUVELE1BQU0sY0FBYyxHQUFHLE1BQU0sUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFN0QsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsUUFBUSxJQUFJLEVBQUUsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUUxRixNQUFNLFdBQVcsR0FBaUI7WUFDOUIsR0FBRyxJQUFJLENBQUMsT0FBTztZQUNmLFFBQVEsRUFBRSxZQUFZO1NBQ3pCLENBQUM7UUFF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