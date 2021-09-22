import {PaymentAccountProvider, SubscriptionProvider} from "./types";
import {EnforcePaymentProviderBase, UserPaymentAccount} from "../types";
import {Stripe} from "stripe";

export type PaymentStripeAccount = EnforcePaymentProviderBase<{
    provider: "stripe",
    customer: Stripe.Customer
    paymentSources: Array<Stripe.Card>
}>

export class PaymentStripeProvider implements PaymentAccountProvider, SubscriptionProvider {

    stripe: Stripe
    provider: "stripe" = "stripe";

    constructor(apiKey: string) {
        this.stripe = new Stripe(apiKey, {apiVersion: "2020-08-27"})
    }

    async createCard(user: UserPaymentAccount, data: Stripe.Token): Promise<PaymentStripeAccount> {
        const stripeAccount = await this._extractOrCreateStripeAccount(user);

        const sourceListResponse = await this.stripe.customers.listSources(stripeAccount.customer.id, {object: 'card'});
        const currentCardSources = sourceListResponse.data as Stripe.Card[];
        const createdSource = await this.stripe.customers.createSource(stripeAccount.customer.id, {source: data.id}) as Stripe.Card;

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
        const {lastResponse, ...customer} = customerResponse
        const stripeAccount: PaymentStripeAccount = {provider: this.provider, customer: customer, paymentSources: []};
        return stripeAccount;
    }

}