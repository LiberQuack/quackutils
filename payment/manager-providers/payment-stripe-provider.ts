import {PaymentAccountProvider, PaymentProvider, PaymentProviderCheckoutProductsResult, PaymentProviderCheckoutResult} from "./types";
import {PaymentCheckout, PaymentEnforceProviderBase, PaymentProduct, PaymentUser, PaymentUserSubscriptionProperties} from "../types";
import {Stripe} from "stripe";

export type PaymentStripeAccount = PaymentEnforceProviderBase<{
    provider: "stripe",
    customer: Stripe.Customer
    paymentSources: Array<Stripe.Card>
}>

export class PaymentStripeProvider implements PaymentAccountProvider<PaymentStripeAccount, Stripe.Token>, PaymentProvider {

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

    async checkout(user: PaymentUser, checkoutObj: PaymentCheckout): Promise<PaymentProviderCheckoutResult> {
        const hasOnlyPlans = checkoutObj.items.every(it => it.type === "plan");
        if (!hasOnlyPlans) throw `This payment provider (${this.provider}) does not support "product" checkout`

        const stripeAccount = this._getStripeAccount(user);
        if (!stripeAccount) throw "Error, probably user has no credit card attached"

        const ensuredProducts = await this.ensureStripeProducts(checkoutObj.items.map(it => it.product));
        const products = ensuredProducts.products;

        const items: Stripe.SubscriptionCreateParams.Item[] = await Promise.all(checkoutObj.items.map(async checkoutItem => {
            const product = products.find(it => it._id === checkoutItem.product._id)!;

            const item: Stripe.SubscriptionCreateParams.Item = {
                quantity: checkoutItem.quantity,
                price_data: {
                    product: product._id,
                    currency: "BRL", //TODO: Need to make it dynamic, maybe more methods should be abstract in interface
                    unit_amount: Math.floor(product.price * 100),
                    recurring: {
                        interval: "month",
                    }
                }
            };

            return item;
        }));

        const subscription = await this.stripe.subscriptions.create({
            customer: stripeAccount.customer.id,
            items: items,
            expand: ["latest_invoice", "latest_invoice.payment_intent"]
        });


        return {
            checkout: {...checkoutObj, providerData: subscription},
            products: ensuredProducts.generatedData,
            subscription: {
                provider: this.provider,
                productIds: products.map(it => it._id),
                nextBill: new Date(subscription.current_period_end * 1000),
            }
        }
    }

    private async ensureStripeProducts(products: PaymentProduct[]): Promise<{ products: PaymentProduct[], generatedData: PaymentProviderCheckoutProductsResult[] }> {
        let ensuredProducts = [] as PaymentProduct[];
        let generatedStripeData = [] as PaymentProviderCheckoutProductsResult[];

        for (let product of products) {
            const paymentDataList = product.payment || []

            if (paymentDataList.find(it => it.provider === this.provider)) {
                ensuredProducts.push(product)
            } else {
                const stripeProduct = await this.stripe.products.create({id: product._id, name: product.title});
                const paymentData = {data: stripeProduct, provider: this.provider};
                generatedStripeData.push({productObj: product, providerData: paymentData})
                ensuredProducts.push({...product, payment: [...paymentDataList, paymentData]})
            }
        }

        return {
            products: ensuredProducts,
            generatedData: generatedStripeData
        }
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