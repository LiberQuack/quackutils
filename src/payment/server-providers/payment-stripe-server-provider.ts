import {Stripe} from "stripe";
import {AbstractPaymentServerProvider, PaymentExternalProductData} from "./abstract-payment-server-provider.js";
import {PaymentCalculatedCheckout, PaymentCheckoutExecution, PaymentEnforceProviderBase, PaymentProduct, PaymentUser} from "../types.js";
import {Undefinable} from "../../_/types.js";
import {NarrowedStripeCalculatedCheckout, NarrowedStripeCompletedCheckout, PaymentStripeProviderData} from "../payment-stripe-types.js";
import {logger} from "../../logger.js";

export type PaymentStripeAccount = PaymentEnforceProviderBase<{
    provider: "stripe",
    customer: Stripe.Customer
    paymentSources: Array<Stripe.Card>
}>

type PaymentStripePreCaptureResult = {
    intentOpts?: Partial<Stripe.SetupIntentCreateParams>
};

type PaymentStripeProviderOpts = {
    customizePaymentIntent: (user: PaymentUser, checkout: NarrowedStripeCalculatedCheckout, card?:  Stripe.PaymentMethod.Card) => Promise<PaymentStripePreCaptureResult>,
    preCaptureCheck?: (user: PaymentUser, checkout: NarrowedStripeCalculatedCheckout, setupIntent: Stripe.SetupIntent) => Promise<void>
};

//Should reuse something from client provider
export class PaymentStripeServerProvider extends AbstractPaymentServerProvider<PaymentStripeProviderData> {

    stripe: Stripe
    provider: "stripe" = "stripe";

    constructor(apiKey: string, public opts?: PaymentStripeProviderOpts) {
        super()
        this.stripe = new Stripe(apiKey, {apiVersion: "2020-08-27"})
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

    async handleWebhook(user: PaymentUser, checkout: NarrowedStripeCompletedCheckout, webhookData: any): Promise<PaymentCheckoutExecution | void> {
        let eventType = webhookData.type as Stripe.WebhookEndpointCreateParams.EnabledEvent;

        switch (eventType) {
            case "invoice.payment_succeeded":
                const invoice = webhookData.data.object as Stripe.Invoice;
                const paymentIntent = await this.retrievePaymentIntent(invoice.payment_intent)

                const subscriptionId = (invoice.subscription as any)?.id || invoice.subscription as string;
                const subscription = await this.stripe.subscriptions.retrieve(subscriptionId);

                return this.buildCheckoutResult(checkout, paymentIntent, subscription, [], checkout.items.map(it => it.product))
            default:
                console.log(this.handleWebhook, `Stripe event ${eventType} ignored`);
        }
    }

    private async retrievePaymentIntent(paymentIntent:  string | Stripe.PaymentIntent | Stripe.Invoice | null | undefined): Promise<Stripe.PaymentIntent> {
        if (!paymentIntent) {
            throw "Empty payment intent"
        }

        if (typeof paymentIntent === "string" && paymentIntent.startsWith("pi_")) {
            return this.stripe.paymentIntents.retrieve(paymentIntent)
        }

        if (typeof paymentIntent === "object" && paymentIntent.object === "payment_intent") {
            return paymentIntent
        }

        throw "Unexpected object"
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

    async prepareCheckout(step: "calc" | "execution", user: PaymentUser, calculatedCheckout: PaymentCalculatedCheckout, opts?: {
        paymentMethodId: Stripe.PaymentMethod["id"];
        setupIntentOptions?: Partial<Stripe.SetupIntentCreateParams>;
    }): Promise<NarrowedStripeCalculatedCheckout> {
        if (step === "calc") {
            return {
                ...calculatedCheckout,
                provider: "stripe",
                externalData: {
                    provider: "stripe",
                    data: {}
                }
            }
        }

        logger.info("stripe-server", "Preparing new checkout", opts ? "with custom payment intent params" : "");

        const stripeAccount = await this.ensureStripeAccount(user)
        if (!stripeAccount) throw `Error, did not find a stripe account for user ${JSON.stringify(user)}`

        const setupIntent = await this.stripe.setupIntents.create({
            customer: stripeAccount.customer.id,
            payment_method: opts?.paymentMethodId,
            usage: "off_session",
            ...opts?.setupIntentOptions,


            // amount: Math.round(calculatedCheckout.total * 100),
            // currency: calculatedCheckout.currency,
            // capture_method: "manual",
            // confirmation_method: "manual",
        });

        const preparedCheckout:NarrowedStripeCalculatedCheckout = {
            ...calculatedCheckout,
            provider: "stripe",
            externalId: setupIntent.id,
            externalData: {
                provider: "stripe",
                data: {
                    ...calculatedCheckout.externalData?.data,
                    setupIntentStatus: setupIntent.status,
                    clientSecret: setupIntent.client_secret,
                }
            }
        }

        return preparedCheckout;
    }

    async checkout(user: PaymentUser, checkoutObj: NarrowedStripeCalculatedCheckout | NarrowedStripeCompletedCheckout): Promise<PaymentCheckoutExecution> {
        logger.info("stripe-server", `Starting checkout for user ${checkoutObj.userId}`);

        if (!("externalData" in checkoutObj)) {
            throw "Expected externalData on checkout object";
        }

        if ("errorMessage" in checkoutObj) {
            if (!checkoutObj.externalId) throw "Unexpected error";
            const paymentIntent = await this.stripe.paymentIntents.cancel(checkoutObj.externalId);
            return this.buildCheckoutResult(checkoutObj, paymentIntent, undefined, [], [])
        }

        const onlyProducts = checkoutObj.items.map(it => it.type).every(it => it === "product")

        if (!onlyProducts) {
            throw "Subscriptions are not supported"
            //Reverts plan cancellation
            // let revertResult = await this.revertSubscriptionCancellation(user, checkoutObj);
            // if (revertResult) return revertResult;

            //TODO: Subscription logic should go to prepare method
            // const subscription = await this.createSubscription(checkoutObj, /*stripeAccount*/null as any);
            // if (subscription) return subscription
        }

        //If externalId is false, it's the first round trip
        if (checkoutObj.externalId === false) {
            const paymentMethodToken = checkoutObj.externalData?.data?.paymentMethodToken;
            if (!paymentMethodToken) throw "Expected transaction payment method token";
            if (!paymentMethodToken.card) throw "Expected token to be type card";

            const paymentMethod = await this.stripe.paymentMethods.create({type: "card", card: {token: paymentMethodToken.id}});
            if (!paymentMethod.card) throw "Expected card payment"

            const customization = await this.opts?.customizePaymentIntent?.(user, checkoutObj, paymentMethod.card);

            //TODO: prepareCheckout is creating payment intent, should extract it here
            checkoutObj = await this.prepareCheckout("execution", user, checkoutObj, {
                setupIntentOptions: {
                    ...customization?.intentOpts
                },
                paymentMethodId: paymentMethod.id,
            });
        }

        if (!checkoutObj.externalId) throw "Intent id not found"

        if (checkoutObj.externalId.startsWith("seti_")) {
            //TODO: prepareCheckout is creating payment intent above, find some way to reuse that
            let setupIntent = await this.stripe.setupIntents.retrieve(checkoutObj.externalId, {
                expand: ["payment_method", "latest_attempt"]
            });

            if (setupIntent?.status === "requires_confirmation") {
                setupIntent = await this.stripe.setupIntents.confirm(setupIntent.id);
            }

            if (setupIntent?.status === "requires_action") {
                return this.buildCheckoutResult(checkoutObj, setupIntent, undefined, [], []);
            }

            if (this.opts?.preCaptureCheck) {
                await this.opts.preCaptureCheck(user, checkoutObj, setupIntent);
            }

            if (setupIntent?.status === "succeeded") {
                let paymentIntent = await this.stripe.paymentIntents.create({
                    customer: setupIntent.customer ? this.getIdFromStringOrObject(setupIntent.customer) : undefined,
                    payment_method: setupIntent.payment_method ? this.getIdFromStringOrObject(setupIntent.payment_method) : undefined,
                    amount: Math.round(checkoutObj.total * 100),
                    currency: checkoutObj.currency,
                    confirm: true,
                    capture_method: "automatic",
                });

                return this.buildCheckoutResult(checkoutObj, paymentIntent, undefined, [], checkoutObj.items.map(it => it.product));
            }

            return this.buildCheckoutResult(checkoutObj, setupIntent, undefined, [], checkoutObj.items.map(it => it.product));
        }

        throw "Unexpected error";
    }

    protected async revertSubscriptionCancellation(user: PaymentUser, checkoutObj: NarrowedStripeCalculatedCheckout): Promise<PaymentCheckoutExecution | void> {
        const subscription = user.payment?.subscription;

        if (subscription) {
            const {nextBill, planningCancelDate} = subscription;
            const cancellationInFuture = nextBill.getTime() > new Date().getTime() && planningCancelDate;

            const checkoutProductIds = checkoutObj.items.map(it => it.productId);
            const sameLength = checkoutProductIds.length === subscription.productIds.length;
            const nextCheckoutSameItems = sameLength && checkoutProductIds.every(it => subscription.productIds.indexOf(it) > -1);

            if (cancellationInFuture && nextCheckoutSameItems) {
                const subscriptionResult = await this.stripe.subscriptions.update(subscription.externalId, {
                    cancel_at_period_end: false,
                    expand: ["latest_invoice", "latest_invoice.payment_intent"]
                });

                const paymentIntent = await this.retrievePaymentIntent(subscriptionResult.latest_invoice);
                if (!paymentIntent) throw "Unexpected empty payment intent"

                return this.buildCheckoutResult(checkoutObj, paymentIntent, subscriptionResult, [], checkoutObj.items.map(it => it.product))
            }
        }
    }

    async cancelCheckout(user: PaymentUser, checkoutObj: NarrowedStripeCompletedCheckout): Promise<PaymentCheckoutExecution> {
        const subscription = checkoutObj.externalData?.data?.subscription;
        if (!subscription?.id) throw "Expected field id on stripe subscription"

        const subscriptionCanceled = await this.stripe.subscriptions.update(subscription.id, {
            cancel_at_period_end: true,
            expand: ["latest_invoice", "latest_invoice.payment_intent"]
        });

        const paymentIntent = await this.retrievePaymentIntent(subscription.latest_invoice);
        return this.buildCheckoutResult(checkoutObj, paymentIntent, subscriptionCanceled, [], checkoutObj.items.map(it => it.product));
    }

    private async createSubscription(checkoutObj: NarrowedStripeCalculatedCheckout, stripeAccount: PaymentStripeAccount): Promise<PaymentCheckoutExecution> {
        const ensuredProducts = await this.ensureStripeProducts(checkoutObj.items.map(it => it.product));
        const products = ensuredProducts.products;

        const items: Stripe.SubscriptionCreateParams.Item[] = await Promise.all(checkoutObj.items.map(async checkoutItem => {
            const product = products.find(it => it.getId() === checkoutItem.product.getId())!;

            const item: Stripe.SubscriptionCreateParams.Item = {
                quantity: checkoutItem.quantity,
                price_data: {
                    product: product.code,
                    currency: checkoutItem.currency,
                    unit_amount: Math.floor(checkoutItem.total * 100),
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

        const paymentIntent = await this.retrievePaymentIntent(subscription.latest_invoice);

        const paymentProviderCheckoutResult: PaymentCheckoutExecution = this.buildCheckoutResult(checkoutObj, paymentIntent, subscription, ensuredProducts.generatedData, products);
        return paymentProviderCheckoutResult
    }

    protected buildCheckoutResult(checkoutObj: NarrowedStripeCalculatedCheckout | NarrowedStripeCompletedCheckout, intent: Stripe.PaymentIntent | Stripe.SetupIntent, subscription: Stripe.Subscription | undefined, providerProducts: PaymentExternalProductData[], products: PaymentProduct[]): NarrowedStripeCompletedCheckout {
        const success = intent.status === "succeeded" && intent.object === "payment_intent";
        const originalErrorMessage = "errorMessage" in checkoutObj ? checkoutObj.errorMessage : undefined;
        const serverErrorMessage = intent.object === "setup_intent" ? intent.last_setup_error?.message : intent.last_payment_error?.message;

        return {
            ...checkoutObj,
            externalId: intent.id,
            externalData: {
                ...checkoutObj.externalData,
                data: {
                    ...checkoutObj.externalData.data,
                    setupIntentStatus: intent.status,
                    clientSecret: intent.client_secret,
                    finalPaymentIntent: intent,
                }
            },
            externalProductData: providerProducts,
            success: success,
            errorMessage: success ? undefined : (originalErrorMessage || serverErrorMessage || "Unexpected payment error"),
            subscription: subscription && {
                provider: this.provider,
                externalId: subscription.id,
                productIds: products.map(it => it.getId()),
                nextBill: new Date(subscription.current_period_end * 1000),
                planningCancelDate: subscription.cancel_at !== null ? new Date(subscription.cancel_at * 1000) : undefined,
            }
        }
            ;
    }

    private async ensureStripeProducts(products: PaymentProduct[]): Promise<{ products: PaymentProduct[], generatedData: PaymentExternalProductData[] }> {
        let ensuredProducts = [] as PaymentProduct[];
        let generatedStripeData = [] as PaymentExternalProductData[];

        for (let product of products) {
            const paymentDataList = product.externalPaymentData || []

            if (paymentDataList.find(it => it.provider === this.provider)) {
                ensuredProducts.push(product)
            } else {
                const stripeProduct = await this.stripe.products.create({id: product.code, name: product.code});
                const paymentData = {data: stripeProduct, provider: this.provider};
                generatedStripeData.push({productId: product.getId(), providerData: paymentData})
                ensuredProducts.push({...product, externalPaymentData: [...paymentDataList, paymentData]})
            }
        }

        return {
            products: ensuredProducts,
            generatedData: generatedStripeData
        }
    }

    private ensureStripeAccount(user: PaymentUser) {
        const stripeAccount = this._getStripeAccount(user);
        if (!stripeAccount) return this._createStripeAccount(user)
    }

    private _getStripeAccount(user: PaymentUser) {
        const paymentAccounts = user.payment?.externalProviderAccounts
        const stripeExistingAccount = (paymentAccounts && paymentAccounts.find(it => it.provider === this.provider)) as PaymentStripeAccount | undefined
        return stripeExistingAccount;
    }

    private async _createStripeAccount(user: PaymentUser): Promise<PaymentStripeAccount> {
        const customerResponse = await this.stripe.customers.create({email: user.email, metadata: {userId: user.getId()}});
        const {lastResponse, ...customer} = customerResponse
        const stripeAccount: PaymentStripeAccount = {provider: this.provider, customer: customer, paymentSources: []};
        return stripeAccount;
    }

    private getIdFromStringOrObject<T extends (string| {id:string})>(object: T): string {
        return typeof object === "object" ? object.id : object;
    }

}