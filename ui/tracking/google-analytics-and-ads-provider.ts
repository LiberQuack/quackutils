import {Dictionary} from "../../types";
import {dictionaryMap} from "../../dictionary";
import {GtagProduct, PURCHASE_COMPLETED, TRACKING_PURCHASE, TRACKING_PURCHASE_CHECKOUT, TRACKING_PURCHASE_JOURNEY, TrackingManagerProvider} from "./tracking-types";
import {PaymentProviderCheckout} from "../../payment/manager-providers/types";
import {PaymentCheckout, PaymentProduct} from "../../payment/types";

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
export class GoogleAnalyticsAndAdsProvider implements TrackingManagerProvider {

    private opts: {
        gaClientId: string;
        adsClientId?: string;

        /**
         * sendTo expects where to send the ads event,
         * usually they look like 'AW-979989861/5Ad8CPH_rZADEOXqpdMD'
         *
         * @example
         * {
         *     ads: {"purchase-completed": {
         *         sendTo: 'AW-979989861/5Ad8CPH_rZADEOXqpdMD'
         *     }}
         * }
         *
         */
        ads?: Record<PURCHASE_COMPLETED, {sendTo: string}>

        /**
         * 3 digits currency code
         * https://en.wikipedia.org/wiki/ISO_4217#Active_codes
         */
        fallbackCurrency: string,

        debug?: boolean,
        fixedDimensions?: Dictionary<string>,
        productTrackerEnhancer?: <P extends PaymentProduct>(product: P) => GtagProduct
    };

    constructor(opts: GoogleAnalyticsAndAdsProvider["opts"]) {
        this.opts = opts
        const isLocal = /localhost|127.0.0.1/.test(location.origin);
        const debugOptionPassed = "debug" in opts;
        const debug = debugOptionPassed ? Boolean(opts?.debug) : isLocal;

        if (!debugOptionPassed && isLocal) {
            console.log(
                "GoogleAnalyticsProvider: automatically entered in debug mode due localhost",
                "https://analytics.google.com/analytics/web/#/m/p281276571/debugview/overview"
            )
        }

        const win = window as any;
        win.gtag = win.gtag || (() => {
            const scriptElm = document.createElement("script");
            scriptElm.src = `https://www.googletagmanager.com/gtag/js?id=${opts.gaClientId}`;
            document.body.appendChild(scriptElm)
            win.dataLayer = win.dataLayer || [];
            return function () {
                win.dataLayer.push(arguments);
            }
        })();

        gtag('js', new Date());

        let fixedDimensions = this.opts.fixedDimensions && {
            custom_map: dictionaryMap(this.opts.fixedDimensions, (k, v, i) => [`dimension${i + 1}`, k]),
            ...dictionaryMap(this.opts.fixedDimensions, (k, v, i) => [k, v]),
        };

        gtag('config', opts.gaClientId, {
            send_page_view: false,
            debug_mode: /localhost|127.0.0.1/.test(location.origin),
            ...fixedDimensions
        });

        if (opts.adsClientId) {
            gtag('config', opts.adsClientId);
        }

        gtag("set", {debug_mode: debug});
    }

    getName(): string {
        return "google-analytics";
    }

    identifyUser(userId: string) {
        gtag('set', 'user_properties', {'user_id': userId, 'crm_id': userId});
    }

    unIdentifyUser() {
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

    private trackAdsEvent() {

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
    trackPurchaseCheckout(eventName: TRACKING_PURCHASE_CHECKOUT, checkout: PaymentCheckout | PaymentProviderCheckout, opts?: {err?: Error}): void {
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
            coupon: checkout.coupon_code,
            tax: checkout.tax,
            shipping: checkout.shipping,
            err: err,
        }

        this.trackEvent(this.translateEvent(eventName), trackingData);

        //TODO: Move to it's own method
        let {adsClientId, ads} = this.opts;
        if (
            adsClientId &&
            ads &&
            eventName === "purchase-completed" /*TS stuff... should not be needed ->*/ &&
            ads[eventName]
        ) {
            const adsConverionTarget = ads[eventName].sendTo;
            gtag('event', 'conversion', {
                'send_to': adsConverionTarget,
                'value': checkout.total,
                'currency': this.opts.fallbackCurrency,
                'transaction_id': checkout._id,
            });

            console.log("GoogleAnalyticsAndAdsProvider: ", `Sent conversion event "${eventName}" to ${adsConverionTarget}`);
        }
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