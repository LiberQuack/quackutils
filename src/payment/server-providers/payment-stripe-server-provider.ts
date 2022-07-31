import {
    AbstractPaymentServerProvider,
    PaymentProviderCheckoutProductsResult,
    PaymentProviderCheckoutResult
} from "./abstract-payment-server-provider.js";
import {
    PaymentCalculatedCheckout,
    PaymentCompletedCheckout,
    PaymentEnforceProviderBase,
    PaymentProduct,
    PaymentUser
} from "../types.js";
import {Stripe} from "stripe";
import {Undefinable} from "../../_/types.js";
import {PaymentStripeProviderData} from "../payment-stripe-types.js";

export type PaymentStripeAccount = PaymentEnforceProviderBase<{
    provider: "stripe",
    customer: Stripe.Customer
    paymentSources: Array<Stripe.Card>
}>

//Should reuse something from client provider
export class PaymentStripeServerProvider extends AbstractPaymentServerProvider<PaymentStripeProviderData> {

    stripe: Stripe
    provider: "stripe" = "stripe";

    constructor(apiKey: string) {
        super()
        this.stripe = new Stripe(apiKey, {apiVersion: "2020-08-27"})
    }

    async prepareCheckout(user: PaymentUser, calculatedCheckout: PaymentCalculatedCheckout<PaymentStripeProviderData>): Promise<PaymentCalculatedCheckout<PaymentStripeProviderData>> {
        const paymentIntent = await this.stripe.paymentIntents.create({
            amount: calculatedCheckout.total,
            currency: calculatedCheckout.currency,
            payment_method_options: {
                card: {
                    request_three_d_secure: "any"
                }
            }
        });

        const nextCalculatedCheckout:PaymentCalculatedCheckout<PaymentStripeProviderData> = {
            externalData: {
                provider: "stripe",
                data: {
                    clientSecret: paymentIntent.client_secret
                }
            },
            ...calculatedCheckout,
        }

        return nextCalculatedCheckout;
    }

    async readWebhookCustomer(event: Stripe.Event): Promise<{id: string} | {email: string} | void> {
        let stripeCustomerId: Undefinable<string>;
        let eventData = event?.data?.object as any;
        let customer: Undefinable<Stripe.Customer>;

        if (event.account) {
            stripeCustomerId = event.account
        } else if (eventData && eventData.customer) {
            stripeCustomerId = eventData.customer.id || eventData.customer;
            customer = typeof eventData.customer !== "string" && eventData.customer;
        }

        if (stripeCustomerId) {
            let customerObj = customer || await this.stripe.customers.retrieve(stripeCustomerId);
            const email = "email" in customerObj && customerObj.email;
            if (email) {
                return {email}
            }
        }
    }

    async supportsWebhook(event: any): Promise<boolean> {
        switch (event?.type) {
            case "invoice.payment_succeeded":
                return true
            default:
                return false
        }
    }

    async readWebhookCheckout(user: PaymentUser, event: Stripe.Event): Promise<{providerCheckoutId: string} | void> {
        switch (event.type) {
            case 'invoice.payment_succeeded':
                const invoice = event.data.object as Stripe.Invoice;
                const subId = (invoice.subscription as any)?.id || invoice.subscription;
                if (subId) {
                    return {providerCheckoutId: subId};
                }
            default:
                console.log(this.readWebhookCheckout, `Unhandled event type ${event.type}`);
        }
    }

    async handleWebhook(user: PaymentUser, checkout: PaymentCompletedCheckout<PaymentStripeProviderData>, webhookData: any): Promise<PaymentProviderCheckoutResult<PaymentStripeProviderData> | void> {
        let eventType = webhookData.type as Stripe.WebhookEndpointCreateParams.EnabledEvent;

        switch (eventType) {

            case "invoice.payment_succeeded":
                const invoice = webhookData.data.object as Stripe.Invoice;
                const subscriptionId = (invoice.subscription as any)?.id || invoice.subscription as string;
                const subscription = await this.stripe.subscriptions.retrieve(subscriptionId);
                if (!subscription) throw "No subscription found"
                return this.buildCheckoutResult(checkout, subscription, [], checkout.items.map(it => it.product))

            default:
                console.log(this.handleWebhook, `Stripe event ${eventType} ignored`);
        }
    }

    async updateDefaultCard(user: PaymentUser, cardIdentifier: string): Promise<PaymentStripeAccount> {
        const stripeAccount = this._getStripeAccount(user);
        if (!stripeAccount) {
            throw `User ${user} doesn't have a stripe account`;
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

    async checkout(user: PaymentUser, checkoutObj: PaymentCalculatedCheckout<PaymentStripeProviderData>): Promise<PaymentProviderCheckoutResult<PaymentStripeProviderData>> {
        const hasOnlyPlans = checkoutObj.items.every(it => it.type === "plan");
        if (!hasOnlyPlans) throw `This payment provider (${this.provider}) does not support "product" checkout`

        //this.ensureStripeAccount(user, checkoutObj);

        const stripeAccount = this._getStripeAccount(user);
        if (!stripeAccount) throw "Error, probably user has no credit card attached"

        //Handle second round trip (when 3D)
        let roundTripResult = await this.handleRoundTrip(checkoutObj);
        if (roundTripResult) return roundTripResult;

        //Reverts plan cancellation
        let revertResult = await this.revertSubscriptionCancellation(user, checkoutObj);
        if (revertResult) return revertResult;

        return await this.createSubscription(checkoutObj, stripeAccount);
    }

    private async handleRoundTrip(checkoutObj: PaymentCalculatedCheckout<PaymentStripeProviderData>): Promise<PaymentProviderCheckoutResult<PaymentStripeProviderData> | void> {
        if ("externalData" in checkoutObj) {
            const paymentIntent = checkoutObj.externalData?.data?.paymentIntentResult;

            if (paymentIntent?.status === "succeeded") {
                const paymentIntentId = paymentIntent.id;
                const paymentIntentExpanded = await this.stripe.paymentIntents.retrieve(paymentIntentId, {expand: ["invoice", "invoice.subscription"]});
                const subscription = (paymentIntentExpanded?.invoice as any)?.subscription as Stripe.Subscription;
                return this.buildCheckoutResult(checkoutObj, subscription, [], checkoutObj.items.map(it => it.product));
            }

            throw "Unexpected stripe status"
        }
    }

    protected async revertSubscriptionCancellation(user: PaymentUser, checkoutObj: PaymentCalculatedCheckout<PaymentStripeProviderData>): Promise<PaymentProviderCheckoutResult<PaymentStripeProviderData> | void> {
        const subscription = user.payment?.subscription;

        if (subscription) {
            const {nextBill, planningCancelDate} = subscription;
            const cancellationInFuture = nextBill.getTime() > new Date().getTime() && planningCancelDate;

            const checkoutProductIds = checkoutObj.items.map(it => it.productId);
            const sameLength = checkoutProductIds.length === subscription.productIds.length;
            const nextCheckoutSameItems = sameLength && checkoutProductIds.every(it => subscription.productIds.indexOf(it) > -1);

            if (cancellationInFuture && nextCheckoutSameItems) {
                const subscriptionResult = await this.stripe.subscriptions.update(subscription.externalId, {
                    cancel_at_period_end: false
                });

                return this.buildCheckoutResult(checkoutObj, subscriptionResult, [], checkoutObj.items.map(it => it.product))
            }
        }
    }

    async cancelCheckout(user: PaymentUser, checkoutObj: PaymentCompletedCheckout<PaymentStripeProviderData>): Promise<PaymentProviderCheckoutResult<PaymentStripeProviderData>> {
        const subscription = checkoutObj.externalData?.data?.subscription;

        if (!subscription?.id) throw "Expected field id on stripe subscription"

        const subscriptionCanceled = await this.stripe.subscriptions.update(subscription.id, {cancel_at_period_end: true});
        return this.buildCheckoutResult(checkoutObj, subscriptionCanceled, [], checkoutObj.items.map(it => it.product));
    }

    private async createSubscription(checkoutObj: PaymentCalculatedCheckout<PaymentStripeProviderData>, stripeAccount: PaymentStripeAccount): Promise<PaymentProviderCheckoutResult<PaymentStripeProviderData>> {
        const ensuredProducts = await this.ensureStripeProducts(checkoutObj.items.map(it => it.product));
        const products = ensuredProducts.products;

        const items: Stripe.SubscriptionCreateParams.Item[] = await Promise.all(checkoutObj.items.map(async checkoutItem => {
            const product = products.find(it => it.getId() === checkoutItem.product.getId())!;

            const item: Stripe.SubscriptionCreateParams.Item = {
                quantity: checkoutItem.quantity,
                price_data: {
                    product: product.code,
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

        const paymentProviderCheckoutResult: PaymentProviderCheckoutResult<PaymentStripeProviderData> = this.buildCheckoutResult(checkoutObj, subscription, ensuredProducts.generatedData, products);
        return paymentProviderCheckoutResult
    }

    protected buildCheckoutResult(checkoutObj: PaymentCalculatedCheckout<PaymentStripeProviderData>, subscription: Stripe.Subscription, providerProducts: PaymentProviderCheckoutProductsResult[], products: PaymentProduct[]): PaymentProviderCheckoutResult<PaymentStripeProviderData> {
        const cancelAt = subscription.cancel_at !== null ? new Date(subscription.cancel_at * 1000) : undefined;

        const checkoutResult:PaymentProviderCheckoutResult<PaymentStripeProviderData> = {
            checkout: {
                ...checkoutObj,
                externalId: subscription.id,
                externalData: {
                    provider: "stripe",
                    data: {
                        subscription: subscription
                    }
                },
                success: subscription.status === "active",
                period: new Date(subscription.current_period_start * 1000),
            },
            products: providerProducts,
            subscription: {
                provider: this.provider,
                externalId: subscription.id,
                productIds: products.map(it => it.getId()),
                nextBill: new Date(subscription.current_period_end * 1000),
                planningCancelDate: cancelAt,
            }
        };

        return checkoutResult;
    }

    private async ensureStripeProducts(products: PaymentProduct[]): Promise<{ products: PaymentProduct[], generatedData: PaymentProviderCheckoutProductsResult[] }> {
        let ensuredProducts = [] as PaymentProduct[];
        let generatedStripeData = [] as PaymentProviderCheckoutProductsResult[];

        for (let product of products) {
            const paymentDataList = product.externalPaymentProviderData || []

            if (paymentDataList.find(it => it.provider === this.provider)) {
                ensuredProducts.push(product)
            } else {
                const stripeProduct = await this.stripe.products.create({id: product.code, name: product.code});
                const paymentData = {data: stripeProduct, provider: this.provider};
                generatedStripeData.push({productObj: product, providerData: paymentData})
                ensuredProducts.push({...product, externalPaymentProviderData: [...paymentDataList, paymentData]})
            }
        }

        return {
            products: ensuredProducts,
            generatedData: generatedStripeData
        }
    }

    private _getStripeAccount(user: PaymentUser) {
        const paymentAccounts = user.payment?.externalProviderAccounts
        const stripeExistingAccount = (paymentAccounts && paymentAccounts.find(it => it.provider === this.provider)) as PaymentStripeAccount | undefined
        return stripeExistingAccount;
    }

    private async _createStripeAccount(user: PaymentUser): Promise<PaymentStripeAccount> {
        const customerResponse = await this.stripe.customers.create({email: user.getId()});
        const {lastResponse, ...customer} = customerResponse
        const stripeAccount: PaymentStripeAccount = {provider: this.provider, customer: customer, paymentSources: []};
        return stripeAccount;
    }

}