import {Dictionary} from "../../../_/types";
import {dictionaryMap} from "../../../_/dictionary";
import {GtagProduct, TRACKING_PURCHASE, TRACKING_PURCHASE_CHECKOUT, TRACKING_PURCHASE_JOURNEY, TrackingManagerProvider} from "../tracking-types";
import {PaymentCalculatedCheckout, PaymentProduct, PaymentCompletedCheckout} from "../../../payment/types";
import {GoogleTrackingBaseOpts} from "./google-tracking-types";
import {assureGtag} from "./google-tracking-utils";

const eventNamesTranslation: Record<TRACKING_PURCHASE_JOURNEY | TRACKING_PURCHASE_CHECKOUT, string> = {
    /**
     * Event with GA support out of the box
     */
    "cart-add-item": "add_to_cart",
    "cart-remove-item": "remove_from_cart",
    "payment-method-changed": "add_payment_info",
    "payment-method-registered": "add_payment_info",
    "purchase-started": "begin_checkout",
    "purchase-completed": "purchase",

    /**
     * Custom events, GA do not handle these events automatically
     */
    "purchase-failed": "purchase-failed"
}

//TODO: Need to revisit currency field logic and reconsider
// - When it's about adding a product to cart, we are relying on fallbackCurrency... but ideally we should supply it
// on demand, when the user is adding the product we probably already know the currency. Maybe it's a design problem stuff
// the trackPurchaseJourney relays on PaymentProduct, it could be a mistake meaning on frontend, since the user first insteracts
// with a product, we should use a PaymentCheckout type, instead of creating it only during checkout page
//
//TODO: Consider separating google ads code into it's on class
export class GoogleAnalyticsProvider implements TrackingManagerProvider {

    protected opts: GoogleTrackingBaseOpts;

    constructor(opts: GoogleAnalyticsProvider["opts"]) {
        this.opts = opts

        assureGtag(this.opts);

        let fixedDimensions = this.opts.fixedDimensions && {
            custom_map: dictionaryMap(this.opts.fixedDimensions, (k, v, i) => [`dimension${i + 1}`, k]),
            ...dictionaryMap(this.opts.fixedDimensions, (k, v, i) => [k, v]),
        };

        gtag('config', opts.clientId, {
            send_page_view: false,
            debug_mode: /localhost|127.0.0.1/.test(location.origin),
            ...fixedDimensions
        });
    }

    getName(): string {
        return "google-analytics";
    }

    trackUser(userId: string) {
        gtag('set', 'user_properties', {'user_id': userId, 'crm_id': userId});
    }

    trackUserOff() {
        gtag('set', 'user_properties', {'user_id': null, 'crm_id': null});
    }

    trackPageView(pathTemplate: string, fullPath: string): void {
        gtag('event', 'page_view', {
            page_title: document.title,
            page_location: fullPath,
            page_path: pathTemplate,
        });
    }

    trackEvent(eventName: string, value?: string | number | boolean | Dictionary<any>): void {
        let trackingProperties: { eventValue?: number, eventLabel?: string } = {};

        switch (typeof value) {
            case "number":
                trackingProperties.eventValue = value;
                break;
            case "boolean":
                trackingProperties.eventValue = value ? 1 : 0;
                break;
            case "string":
                trackingProperties.eventLabel = value;
                trackingProperties.eventValue = 1;
                break;
            case "object":
                trackingProperties = {
                    ...trackingProperties,
                    ...value
                }
            default:
                trackingProperties.eventValue = 1;
        }

        gtag("event", eventName, trackingProperties);
    }

    //TODO: In the future trackPurchaseJourney and trackPurchaseCheckout
    // should merge in one method relying on PaymentCheckout type,
    // then the application also should use PaymentCheckout as fast as possible,
    // instead of creating PaymentCheckout only in the end of the flow
    // PS: There's a card created for it -> https://www.notion.so/8cef0d90b6d64353b5a366bde7828c31?v=79e4dbdbc57346eba76212ee6fbac8cd&p=c56672afd07d4df5b7ec38a3712c5346
    // ...
    // Apparently the merge would work pretty well, because in the end we should try sending as much data
    // as possible to google, so it should not be a problem, for example, sending a coupon field on events
    // about payment method

    //https://developers.google.com/analytics/devguides/collection/ga4/ecommerce
    //https://developers.google.com/analytics/devguides/collection/ga4/reference/events
    trackPurchaseJourney(eventName: TRACKING_PURCHASE_JOURNEY, products: PaymentProduct[], opts?: { paymentProvider?: string }): void {
        const trackingProducts = products.map(it => this.translateProductData(it));

        const trackingData = {
            event_mapped_from: eventName,
            currency: trackingProducts[0]?.currency || this.opts.fallbackCurrency,
            value: trackingProducts.reduce((a,b) => a + b.price, 0),
            items: trackingProducts,
            payment_type: opts?.paymentProvider
            //coupon: tracked only in trackPurchaseCheckout
        }

        this.trackEvent(this.translateEvent(eventName), trackingData)
    }

    //https://developers.google.com/analytics/devguides/collection/ga4/ecommerce
    //https://developers.google.com/analytics/devguides/collection/ga4/reference/events#purchase
    trackPurchaseCheckout(eventName: TRACKING_PURCHASE_CHECKOUT, checkout: PaymentCalculatedCheckout | PaymentCompletedCheckout, opts?: {err?: Error}): void {
        const trackingProducts = checkout.items.map(it =>
            this.translateProductData(it.product, {
                quantity: it.quantity,
                discount: it.valueOff
            })
        );

        let err = opts?.err;
        const trackingData = {
            event_mapped_from: eventName,
            currency: trackingProducts[0]?.currency || this.opts.fallbackCurrency,
            value: checkout.total,
            items: trackingProducts,
            transaction_id: checkout._id,
            coupon: checkout.coupon_codes,
            tax: checkout.tax,
            shipping: checkout.shipping,
            err: err,
        }

        this.trackEvent(this.translateEvent(eventName), trackingData);
    }

    private translateProductData(product: PaymentProduct, opts?: {
        coupon?: string;
        discount?: number;
        quantity?: number}) {
        const {fallbackCurrency, productTrackerEnhancer} = this.opts;

        const gtagProduct: GtagProduct = {
            item_id: product._id,
            item_name: product.title,
            price: product.price,
            currency: fallbackCurrency, //TODO: if product provide currency use it first, otherwise fallback to this.opts.fallbackCurrency
            ...opts
        };

        const gtagProductEnhancement = productTrackerEnhancer && productTrackerEnhancer(product);

        return {...gtagProduct, ...gtagProductEnhancement}
    }

    private translateEvent(rawTrackingManagerEventName: TRACKING_PURCHASE) {
        let translation = eventNamesTranslation[rawTrackingManagerEventName];

        if (!translation) {
            console.warn(`Tracking manager event ${rawTrackingManagerEventName} is not mapped to Google Analytics `)
        }

        return translation ?? rawTrackingManagerEventName;
    }

}