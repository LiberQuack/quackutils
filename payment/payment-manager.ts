import {PaymentPlan, UserPaymentAccount, UserPaymentAccountProperties, UserSubscriptionProperties} from "./types";
import {ValuesType} from "utility-types";
import {PaymentAccountProvider, PaymentProvider, SubscriptionProvider} from "./providers/types";

export class PaymentManager<U extends UserSubscriptionProperties, P extends PaymentPlan, PP extends (PaymentAccountProvider | PaymentProvider | SubscriptionProvider)[]> {

    providers: PP;

    constructor(paymentProviders: PP) {
        this.providers = paymentProviders;
    }

    async createCard<PN extends ValuesType<PP>["provider"]>(
        user: UserPaymentAccount,
        providerName: PN,
        card: Parameters<Extract<ValuesType<PP>, PaymentAccountProvider & { provider: PN }>["createCard"]>[1]
    ): Promise<{ account: ValuesType<UserPaymentAccountProperties["accounts"]> }> {

        const accountProviders = this.providers.filter(it => "createCard" in it) as PaymentAccountProvider[];
        const provider = accountProviders.find(it => it.provider === providerName);

        if (!provider) {
            throw `Cannot create card for provider ${providerName}... Expected one of [${accountProviders.map(it => it.provider)}]`
        }

        const userPaymentAccount = await provider.createCard(user, card);
        return {account: userPaymentAccount};
    }

}