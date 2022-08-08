import {ArrayType, Narrow} from "../utils.js";
import type {PaymentExternalProductData} from "./server-providers/abstract-payment-server-provider.js";

export type PaymentProviderMinimalProperties = { provider: string };
export type PaymentEnforceProviderBase<T extends PaymentProviderMinimalProperties> = T
export type PaymentUserAccount = PaymentProviderMinimalProperties

/**
 * TODO: Delete it, was replaced by PaymentCheckoutExecution
 * @Deprecated
 */
export type PaymentUserData = {
    /**
     * Convinience property for accessing the last checkout
     */
    lastCheckout?: PaymentCheckoutExecution;

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
    getId(): string;
    email?: string;
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

    productIds: string[];
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

    getId(): string

    /**
     * Human-readable product name
     */
    title: string;

    /**
     * Array of prices, purpose is to be able to charge
     * in different currencies
     */
    prices:Array<{
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
        currency: string;
    }>

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
    externalPaymentData?: Array<PaymentProviderData>;
}

/**
 * It's a container for holding provider data
 */
export type PaymentProviderData = {
    provider: string;
    data: any
};

/**
 * If multiple optional fields are used at once
 * the total discount is going be the sum of all discounts
 */
export type PaymentCoupon = {
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
    userId: string;
    coupon_codes?: PaymentCoupon["code"][];

    /**
     * items represent the products you have in your database,
     * after you call paymentClient.calculate(partialCheckout),
     * these each entry will be populated
     */
    items: Array<{
        productId: string;
        quantity: number;
    }>

    /**
     * inlineItems represent non pre-registered products,
     * ideally when you call paymentClient.calculate(partialCheckout),
     * the api will do the necessary work, for example, creating these products
     */
    inlineItems?: Array<Pick<PaymentProduct, "type" | "title"> & ArrayType<PaymentProduct["prices"]> & {
        quantity: number;
    }>}

/**
 * PaymentCalculatedCheckout is the calculated data, it's one step closed
 * from being sent to the payment provider for completing the purchase
 */
export type PaymentCalculatedCheckout = PaymentProviderMinimalProperties & {
    coupon_codes?: PaymentCoupon["code"][];
    userId: string;

    /**
     * externalData should persist some communication data between the provider and the api,
     * also could be useful on client side
     *
     * For more, see PaymentProviderData
     */
    externalData?: PaymentProviderData

    /**
     * Some providers need to have products registered on their system,
     * if that's the case, the generated data, like, product id on their system
     * should be placed in this field
     *
     * That field should be populated only once, when the provider generates that data
     */
    externalProductData?: Array<PaymentExternalProductData>

    /**
     * clientData is a field for sharing information
     * only on client side, may hold references and
     * complex data
     *
     * Should not be sent back to the server
     */
    clientData?: any

    /**
     * External id for retrieving data from payment provider
     *
     * Some providers will generate externalId during calculateCheckout,
     * if that's not the case, set it to false
     */
    externalId?: string | false;

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
         * Indicates if this product item comes from an inline source,
         * Check more on PaymentPartialCheckout["inlineItems"]
         */
        inline?: boolean;

        /**
         * Product Id
         */
        productId: string;

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

        /**
         * This is the currency
         */
        currency: string
    }>
}

/**
 * PaymentCompletedCheckout as the name says, represents a completed checkout
 */
export type PaymentCheckoutExecution = PaymentCalculatedCheckout & {
    success: boolean;

    /**
     * Human readable error, should be easy and understandable
     * for your final user
     */
    errorMessage?: string;

    /**
     * Subscription details, keep in mind that every time
     * it's renewed, the system should understand it as a
     * new checkout entry
     */
    subscription?: PaymentUserSubscriptionProperties

    /**
     * Check PaymentCalculatedCheckout["externalId"]
     */
    externalId: string | false;

    //Use when checkout is cancelled | means payment was refunded
    cancelReason?: string;
    cancelRequestDate?: Date;
}

export type NarrowCalculatedCheckout<T extends {provider: string, externalData: any, clientData: any}> = Narrow<PaymentCalculatedCheckout, {
    provider: T["provider"],
    externalData: Narrow<PaymentProviderData, { provider: T["provider"], data: T["externalData"] }>
    clientData?: T["clientData"]
}>;

export type NarrowCompletedCheckout<T extends {provider: string, externalData: any, clientData: any}> = Narrow<PaymentCheckoutExecution, {
    provider: T["provider"],
    externalData: Narrow<PaymentProviderData, { provider: T["provider"], data: T["externalData"] }>
    clientData?: T["clientData"]
}>;