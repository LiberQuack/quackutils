import {AbstractPaymentServer} from "./abstract-payment-server";
import {ValuesType} from "utility-types";
import {PaymentAccountProvider, PaymentProviderCheckout} from "./server-providers/types";
import type {ObjectId as ObjectID} from "mongodb";

export type PaymentProviderMinimalProperties = { provider: string };
export type PaymentEnforceProviderBase<T extends PaymentProviderMinimalProperties> = T
export type PaymentUserAccount = PaymentProviderMinimalProperties

/**
 * The idea is that you append these data to your user,
 * for example
 *
 * type MyUserType = PaymentUserData & {
 *     name:string
 * }
 */
export type PaymentUserData = {
    /**
     * Convinience property for accessing the last checkout
     */
    lastCheckout?: PaymentProviderCheckout;

    /**
     * Some payment providers, like stripe, may have important data
     * about our user, for example, registered cards
     */
    externalProviderAccounts?: PaymentUserAccount[];

    /**
     * Convinience property for accessing data about subscription
     */
    subscription?: PaymentUserSubscriptionProperties;
};

/**
 * The idea is that you append these data to your user,
 * for example
 *
 * type MyUserType = PaymentUser & {
 *     name:string
 * }
 */
export type PaymentUser = {
    _id: string;
    email: string;
    payment?: PaymentUserData
}

/**
 * Essencial data about subscriptions
 */
export type PaymentUserSubscriptionProperties = {
    provider: string;

    /**
     * Id of subscription registered on provider
     */
    externalId: string;

    productIds: PaymentProduct["_id"][];
    nextBill: Date;
    planningCancelDate?: Date;
    planningDowngradeToPlan?: string;
    planningDowngradeDate?: Date;
};

/**
 * The idea is that you append these data to your user,
 * for example
 *
 * type Product = PaymentProduct & {
 *     color: "
 * }
 */
export type PaymentProduct = {
    _id: string;

    /**
     * Human readable product name
     */
    title: string;

    /**
     * Product price
     */
    price: number;

    /**
     * Currency, when empty, api will use it's defualt currency
     *
     * If the checkout has different currencies, it will throw error,
     * or... Ideally will convert the prices for the currency with higher weight
     * the weight will be in total amount of checkout
     */
    currency?: string;

    /**
     * Indicate if this product was inlined in a checkout,
     * it means the product didn't exist prior the payment, meaning it was created on demand
     * during the payment
     *
     * Inline products give flexibility by allowing the frontend to create checkout with
     * dynamic prices, products and data
     */
    inline?: boolean;

    /**
     * Product code should be used instead of _id through the application,
     * it should be a string for example MY_PRODUCT_BLUE_VERSION
     *
     * _id may not be appropriate for building urls
     */
    code: string;

    /**
     * "product" - for one time payments
     * "plan" - used for recurring payments
     *
     * If a checkout has a plan included with product, the first payment will be
     * priced as <plan + products> and rest will be only <plan>
     */
    type: "product" | "plan";

    /**
     * When the product or plan is registered within our providers, the data will
     * be reflected in this property
     */
    externalPaymentData?: Array<PaymentProductProviderData>;
}

export type PaymentProductProviderData = {
    provider: string;
    data: any
};

/**
 * If multiple optional fields are used at once
 * the total discount is going be the sum of all discounts
 */
export type PaymentCoupon = {
    _id: string,
    code: string;
    expiresAt?: Date;
    maxUsageCount?: number;

    /**
     * Applied on subtotal, it should be >0 and <=1
     *
     * subtotal: 100
     * pct_off: 0.5
     * discount = 50
     */
    pctOff?: number;

    /**
     * Applied on subtotal, it should be >0
     *
     * subtotal: 100
     * value_off: 1.99
     * discount = 1.99
     */
    valueOff?: number;

    /**
     * Applied on items only
     */
    items?: Array<{
        /**
         * product_id for applying the discount
         */
        productId: string,

        /**
         * Applied on item price, it should be >0 and <=1
         *
         * item price: 100
         * pct_off: 0.5
         * discount = 50
         */
        pctOff?: number;

        /**
         * Applied on item price, it should be >0
         *
         * item price: 100
         * value_off: 1.99
         * discount = 1.99
         */
        valueOff?: number;
    }>
}

/**
 * PaymentPartialCheckout should be it's first state with basic information,
 * it should be sent to the api, for being enhanced and calculated
 *
 * @example
 * paymentClient.calculateCheckout(partialCheckout)
 */
export type PaymentPartialCheckout = PaymentProviderMinimalProperties & {
    err?: any;

    userId: PaymentUser["_id"];
    coupon_codes?: PaymentCoupon["code"][];

    /**
     * items represent the products you have in your database,
     * after you call paymentClient.calculate(partialCheckout),
     * these each entry will be populated
     */
    items: Array<{
        productId: PaymentProduct["_id"];
        quantity: number;
    }>

    /**
     * inlineItems represent non pre-registered products,
     * ideally when you call paymentClient.calculate(partialCheckout),
     * the api will do the necessary work, for example, creating these products
     */
    inlineItems: Array<Omit<PaymentProduct, "_id" | "code" | "inline" | "externalPaymentData">>
}

/**
 * PaymentCheckout is the calculated data, it's one step closed
 * from being sent to the payment provider for completing the purchase
 */
export type PaymentCheckout = PaymentProviderMinimalProperties & {
    _id?: ObjectID;

    coupon_code?: PaymentCoupon["code"];
    userId: PaymentUser["_id"];

    /**
     *
     */
    providerData?: PaymentProductProviderData

    /**
     * The sum of products and plans before any discounts
     */
    subtotal: number;

    /**
     * Applied on subtotal, it should be >0 and <=1
     *
     * subtotal: 100
     * pct_off: 0.5
     * discount = 50
     */
    pctOff: number;

    /**
     * Applied on subtotal, it should be >0
     *
     * subtotal: 100
     * value_off: 1.99
     * discount = 1.99
     */
    valueOff: number;

    /**
     * Shipping price
     */
    shipping: number;

    /**
     * Governamental taxes
     */
    tax: number;

    /**
     * This is the final price
     */
    total: number;

    /**
     * Currency, when empty, api will use it's defualt currency
     *
     * If the checkout has different currencies, it will throw error,
     * or... Ideally will convert the prices for the currency with higher weight
     * the weight will be in total amount of checkout
     */
    currency: string;

    items: Array<{
        /**
         * Product Id
         */
        productId: PaymentProduct["_id"];

        /**
         * Product data, it's a conviniance property
         * so you don't need to execute additional api calls
         */
        product: PaymentProduct;

        /**
         * Check PaymentProduct["type"] for more information
         */
        type: PaymentProduct["type"];

        /**
         * Quantity of this product during the checkout
         */
        quantity: number,

        /**
         * Applied on item, it should be >0 and <=1
         *
         * item: 100
         * pct_off: 0.5
         * discount = 50
         */
        pctOff: number;

        /**
         * Applied on item, it should be >0
         *
         * item: 100
         * value_off: 1.99
         * discount = 1.99
         */
        valueOff: number;

        /**
         * This is the final item price
         */
        total: number;
    }>
}

//Utility
export type ProviderName<PM extends AbstractPaymentServer<any, any, any>> = ValuesType<PM["providers"]>["provider"]
export type CreateCardData<PM extends AbstractPaymentServer<any, any, any>> = Parameters<Extract<ValuesType<PM["providers"]>, PaymentAccountProvider>["createCard"]>[1]