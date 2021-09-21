import {PaymentAccountProvider, SubscriptionProvider} from "./types";
import {EnforcePaymentProviderBase, UserPaymentAccount} from "../types";
import {Stripe} from "stripe";

export type PaymentStripeAccount = EnforcePaymentProviderBase<{
    provider: "stripe",
    customerId: string,
    paymentSources: Array<Stripe.Source.Card>
}>

export class PaymentStripeProvider implements PaymentAccountProvider, SubscriptionProvider {

    stripe: Stripe
    provider: "stripe" = "stripe";

    constructor(apiKey: string) {
        this.stripe = new Stripe(apiKey, {apiVersion: "2020-08-27"})
    }

    async createCard(user: UserPaymentAccount, data: Stripe.Token): Promise<PaymentStripeAccount> {
        const stripeAccount = await this._extractOrCreateStripeAccount(user);

        const sourceListResponse = await this.stripe.customers.listSources(stripeAccount.customerId, {object: 'card'});
        const currentCardSources = sourceListResponse.data as Stripe.Source.Card[];
        const createdSource = await this.stripe.customers.createSource(stripeAccount.customerId, {source: data.id}) as Stripe.Source.Card;

        stripeAccount.paymentSources = [
            createdSource,
            ...currentCardSources
        ]

        return stripeAccount;
    }

    private async _extractOrCreateStripeAccount(user: UserPaymentAccount): Promise<PaymentStripeAccount> {
        const paymentAccounts = user.payment?.accounts
        const stripeExistingAccount = paymentAccounts && paymentAccounts.find(it => it.provider === this.provider) as PaymentStripeAccount | undefined

        if (stripeExistingAccount) {
            return stripeExistingAccount
        } else {
            return this._createStripeAccount(user);
        }
    }

    private async _createStripeAccount(user: UserPaymentAccount): Promise<PaymentStripeAccount> {
        const customerResponse = await this.stripe.customers.create({email: user.email});
        const customerId = customerResponse.id;
        const stripeAccount: PaymentStripeAccount = {provider: this.provider, customerId: customerId, paymentSources: []};
        return stripeAccount;
    }

}