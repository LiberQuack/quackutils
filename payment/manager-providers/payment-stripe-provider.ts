import {PaymentAccountProvider, SubscriptionProvider} from "./types";
import {PaymentEnforceProviderBase, PaymentProduct, PaymentUser, PaymentUserAccountsProperties} from "../types";
import {Stripe} from "stripe";

export type PaymentStripeAccount = PaymentEnforceProviderBase<{
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

    async updateDefaultCard(user: PaymentUser, cardIdentifier: string): Promise<PaymentStripeAccount> {
        const stripeAccount = this._getStripeAccount(user);
        if (!stripeAccount) {
            throw `User ${user._id} doesn't have a stripe account`;
        }

        const response = await this.stripe.customers.update(stripeAccount.customer.id, {default_source: cardIdentifier});
        const {lastResponse, ...customer} = response;

        return {
            ...stripeAccount,
            customer
        }
    }

    async createCard(user: PaymentUser, data: Stripe.Token): Promise<PaymentStripeAccount> {
        const stripeAccount = this._getStripeAccount(user) || await this._createStripeAccount(user);

        const sourceListResponse = await this.stripe.customers.listSources(stripeAccount.customer.id, {object: 'card'});
        const currentCardSources = sourceListResponse.data as Stripe.Card[];
        const createdSource = await this.stripe.customers.createSource(stripeAccount.customer.id, {source: data.id}) as Stripe.Card;
        const {lastResponse, ...customer} = await this.stripe.customers.retrieve(stripeAccount.customer.id);

        stripeAccount.customer = customer as Stripe.Customer;
        stripeAccount.paymentSources = [
            createdSource,
            ...currentCardSources
        ]

        return stripeAccount;
    }

    async subscribeToPlan(user: PaymentUser, plan: PaymentProduct): Promise<Partial<PaymentUserAccountsProperties>> {
        return {};
    }

    private _getStripeAccount(user: PaymentUser) {
        const paymentAccounts = user.payment?.accounts
        const stripeExistingAccount = (paymentAccounts && paymentAccounts.find(it => it.provider === this.provider)) as PaymentStripeAccount | undefined
        return stripeExistingAccount;
    }

    private async _createStripeAccount(user: PaymentUser): Promise<PaymentStripeAccount> {
        const customerResponse = await this.stripe.customers.create({email: user.email});
        const {lastResponse, ...customer} = customerResponse
        const stripeAccount: PaymentStripeAccount = {provider: this.provider, customer: customer, paymentSources: []};
        return stripeAccount;
    }

}