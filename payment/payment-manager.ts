import {PaymentCheckout, PaymentProduct, PaymentUser, PaymentUserAccountsProperties, PaymentUserSubscriptionProperties} from "./types";
import {ValuesType} from "utility-types";
import {PaymentAccountProvider, PaymentProvider, SubscriptionProvider} from "./manager-providers/types";

export abstract class PaymentManager<U extends PaymentUserSubscriptionProperties, P extends PaymentProduct, PP extends (PaymentAccountProvider | PaymentProvider | SubscriptionProvider)[] = any> {

    providers: PP;

    constructor(paymentProviders: PP) {
        this.providers = paymentProviders;
    }

    abstract calculateCheckout(user: U, checkout: PaymentCheckout): Promise<PaymentCheckout>;

    async createCard<PN extends ValuesType<PP>["provider"]>(
        user: PaymentUser,
        providerName: PN,
        card: Parameters<Extract<ValuesType<PP>, PaymentAccountProvider & { provider: PN }>["createCard"]>[1]
    ): Promise<{ account: ValuesType<PaymentUserAccountsProperties["accounts"]> }> {

        const accountProviders = this.providers.filter(it => "createCard" in it) as PaymentAccountProvider[];
        const provider = accountProviders.find(it => it.provider === providerName);

        if (!provider) {
            throw `Cannot create card for provider ${providerName}... Expected one of [${accountProviders.map(it => it.provider)}]`
        }

        const userPaymentAccount = await provider.createCard(user, card);
        return {account: userPaymentAccount};
    }

    async updateDefaultCard<PN extends ValuesType<PP>["provider"]>(
        user: PaymentUser,
        providerName: PN,
        card: Parameters<Extract<ValuesType<PP>, PaymentAccountProvider & { provider: PN }>["updateDefaultCard"]>[1]
    ): Promise<{ account: ValuesType<PaymentUserAccountsProperties["accounts"]> }> {

        const accountProviders = this.providers.filter(it => "updateDefaultCard" in it) as PaymentAccountProvider[];
        const provider = accountProviders.find(it => it.provider === providerName);

        if (!provider) {
            throw `Cannot create card for provider ${providerName}... Expected one of [${accountProviders.map(it => it.provider)}]`
        }

        const userPaymentAccount = await provider.updateDefaultCard(user, card);
        return {account: userPaymentAccount};
    }

    async ensureCheckoutData() {

    }

}