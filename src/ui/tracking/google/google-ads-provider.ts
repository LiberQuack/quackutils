import {TRACKING_PURCHASE_CHECKOUT, TRACKING_PURCHASE_JOURNEY, TrackingManagerProvider} from "../tracking-types";
import {Dictionary} from "../../../_/types";
import {PaymentCalculatedCheckout, PaymentProduct, PaymentCompletedCheckout} from "../../../payment/types";
import {GoogleTrackingBaseOpts} from "./google-tracking-types";
import {assureGtag} from "./google-tracking-utils";
import {FINANCASH_TRACKING_EVENTS} from "../../../../src/app/tracking/financash-tracking-types";

export abstract class GoogleAdsProvider<CE> implements TrackingManagerProvider<CE> {

    protected opts: GoogleTrackingBaseOpts;

    constructor(opts: GoogleAdsProvider<CE>["opts"]) {
        this.opts = opts;
        assureGtag(opts);
        gtag('config', opts.clientId);
    }

    getName(): string {
        return "google-ads";
    }

    abstract trackUser(userId: string): void;

    abstract trackEvent(eventName: CE, value?: string | number | boolean | Dictionary<any>): void;
    abstract trackPageView(pathTemplate: string, fullPath: string, pageTitle: string): void;
    abstract trackPurchaseCheckout(eventName: TRACKING_PURCHASE_CHECKOUT, checkout: PaymentCompletedCheckout | PaymentCalculatedCheckout, opts?: { err?: Error }): void;
    abstract trackPurchaseJourney(eventName: TRACKING_PURCHASE_JOURNEY, products: PaymentProduct[], opts?: { paymentProvider?: string }): void;
    abstract trackUserOff(): void;
}