import {PaymentCheckout, PaymentProduct} from "../../payment/types";
import {PaymentProviderCheckout} from "../../payment/manager-providers/types";
import {Dictionary} from "../../types";

export type TRACKING_PURCHASE_JOURNEY =
    CART_ADD_ITEM |
    CART_REMOVE_ITEM |
    PAYMENT_METHOD_REGISTERED |
    PAYMENT_METHOD_CHANGED

export type TRACKING_PURCHASE_CHECKOUT =
    PURCHASE_STARTED |
    PURCHASE_COMPLETED |
    PURCHASE_FAILED

/**
 * Use this event when user reaches the checkout page
 */
type PURCHASE_STARTED = "purchase-started"

/**
 * Use this event when user completes the checkout with success
 */
type PURCHASE_COMPLETED = "purchase-completed"

/**
 * Use this event when user submits a valid checkout form, but it fails for unexpected reasons like
 * server error or credit card problems
 */
type PURCHASE_FAILED = "purchase-failed"

/**
 * Use this event when user registers a new payment info...
 *
 * If during the checkout the user has a pre-selected or default payment method,
 * we DO NOT recommend sending this event
 */
type PAYMENT_METHOD_REGISTERED = "payment-method-registered"

/**
 * Use this event when user changes the default payment info
 */
type PAYMENT_METHOD_CHANGED = "payment-method-changed"

/**
 * Use this event when user adds a product/plan to cart
 */
type CART_ADD_ITEM = "cart-add-item"

/**
 * Use this event when user removes a product/plan from the cart
 */
type CART_REMOVE_ITEM = "cart-remove-item"

export interface TrackingManagerType {

    /**
     * Track page views
     *
     * @param pathTemplate
     * @param fullPath
     */
    trackPageView(pathTemplate: string, fullPath: string, pageTitle: string): void;


    /**
     * Track events preceding a purchase
     *
     * @param eventName
     * @param products
     * @param opts
     */
    trackPurchaseJourney(eventName: TRACKING_PURCHASE_JOURNEY, products: PaymentProduct[], opts?: { paymentProvider?: string}): void;

    /**
     * Track checkout flow
     *
     * @param eventName
     * @param checkout
     * @param opts
     */
    trackPurchaseCheckout(eventName: TRACKING_PURCHASE_CHECKOUT, checkout: PaymentProviderCheckout | PaymentCheckout, opts?: {err?: Error}): void;

    /**
     * Track events related to UX
     * @param eventName
     * @param value
     */
    trackEvent(eventName: string, value?: string | number | boolean | Dictionary<any>): void

    identifyUser(userId: string): void;

    unIdentifyUser(): void;
};

export interface TrackingManagerProvider extends TrackingManagerType {
    /**
     * Get provider name
     */
    getName(): string,
}


export type GtagProduct = {
    item_id: string;
    item_name: string;
    price: number;
    currency: string;
    quantity?: number;
    coupon?: string;
    discount?: number;
    index?: number;
    item_category?: string;
    item_category2?: string;
    item_category3?: string;
    item_category4?: string;
    item_category5?: string;
    item_brand?: string;
    location_id?: string;
    item_list_id?: string;
    affiliation?: string;
    item_list_name?: string;
    item_variant?: string
};