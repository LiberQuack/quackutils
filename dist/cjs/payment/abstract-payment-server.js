define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AbstractPaymentServer = void 0;
    class AbstractPaymentServer {
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
    exports.AbstractPaymentServer = AbstractPaymentServer;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtcGF5bWVudC1zZXJ2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGF5bWVudC9hYnN0cmFjdC1wYXltZW50LXNlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0lBS0EsTUFBc0IscUJBQXFCO1FBRXZDLFNBQVMsQ0FBSztRQUVkLFlBQVksZ0JBQW9CO1lBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsZ0JBQWdCLENBQUM7UUFDdEMsQ0FBQztRQUVELEtBQUssQ0FBQyxVQUFVLENBQ1osSUFBTyxFQUNQLFlBQWdCLEVBQ2hCLElBQWdEO1lBR2hELE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxZQUFZLElBQUksRUFBRSxDQUFDLGtEQUFrRCxDQUE2QixDQUFDO1lBQ3hKLE1BQU0sUUFBUSxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEtBQUssWUFBWSxDQUFDLENBQUM7WUFFM0UsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDWCxNQUFNLG1DQUFtQyxZQUFZLHdCQUF3QixnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQTthQUMxSDtZQUVELE1BQU0sY0FBYyxHQUFHLE1BQU0sUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFN0QsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsUUFBUSxJQUFJLEVBQUUsRUFBRSxjQUFjLENBQUMsQ0FBQztZQUUxRixNQUFNLFdBQVcsR0FBaUI7Z0JBQzlCLEdBQUcsSUFBSSxDQUFDLE9BQU87Z0JBQ2YsUUFBUSxFQUFFLFlBQVk7YUFDekIsQ0FBQztZ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