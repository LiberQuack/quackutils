///<reference types="gtag.js"/>

import {State} from "../../state";
import {addLinkClickListener, RouteStateType} from "../../router";
import {Dictionary, Undefinable} from "../../types";
import {PaymentCheckout, PaymentProduct} from "../../payment/types";
import {TRACKING_PURCHASE_CHECKOUT, TRACKING_PURCHASE_JOURNEY, TrackingManagerProvider, TrackingManagerType} from "./tracking-types";
import {PaymentProviderCheckout} from "../../payment/manager-providers/types";

type TrackingManagerOpts = {
    log?: boolean,
    customPageTracking?: (args: Parameters<TrackingManagerType["trackPageView"]>) => Parameters<TrackingManagerType["trackPageView"]>
};

export class TrackingManager implements TrackingManagerType {

    private inited?: boolean;
    private providers: (() => TrackingManagerProvider)[];
    private providersInited: TrackingManagerProvider[] = [];
    private router?: State<RouteStateType>;
    private queue = [] as (() => void)[];

    constructor(providers: (() => TrackingManagerProvider)[], private opts?: TrackingManagerOpts) {
        this.providers = providers;
    }

    init() {
        if (this.inited) return;
        this.inited = true;

        this.providersInited = this.providers.map(it => it());

        this.queue.forEach(it => it());
        this.queue = [];

        this.trackEvent("tracking-init");
        this.trackPerformance();
        this.trackOutboundLinks()

        if (this.router) {
            this.router.subscribe((prev, current) => {
                const {pathTemplate, fullPath} = current.state
                this.trackPageView(pathTemplate, fullPath, document.title);
            })
        }
    }

    /**
     * Listen and send page view for all routes.
     *
     * @example usage
     * trackingManager.trackRouting(myRouterState);
     * trackingManager.init()
     *
     * @param router
     */
    trackRouting(router: State<RouteStateType>): void {
        this.router = router;
    }

    /**
     * This method allows you to <b>manually</b> send a page view event.
     *
     * If you want to listen and track every route change, lookfor the <b>trackRouting()</b> method
     *
     * @param pathTemplate
     * @param fullPath
     */
    trackPageView(pathTemplate: string, fullPath: string, title: string): void {
        const args = arguments as unknown as Parameters<TrackingManagerType["trackPageView"]>;
        this.cycleProviders("trackPageView", this.opts?.customPageTracking ? this.opts.customPageTracking(args) : args)
    }

    trackEvent(eventName: string, value?: string | number | boolean | Dictionary<any>): void {
        this.cycleProviders("trackEvent", [eventName, value]);
    }

    trackPurchaseJourney(eventName: TRACKING_PURCHASE_JOURNEY, products: PaymentProduct[], opts?: { paymentProvider?: string, qty?:number }): void {
        this.cycleProviders("trackPurchaseJourney", [eventName, products, opts])
    }

    trackPurchaseCheckout(eventName: TRACKING_PURCHASE_CHECKOUT, checkout: PaymentProviderCheckout | PaymentCheckout, opts?: {err?: Error}): void {
        const enhancedOpts = opts?.err !== undefined ? {...opts, err: this.wrapError(opts.err)} : opts;
        this.cycleProviders("trackPurchaseCheckout", [eventName, checkout, enhancedOpts]);
    }

    identifyUser(userId: string): void {
        this.cycleProviders("identifyUser", [userId]);
    }

    unIdentifyUser(): void {
        this.cycleProviders("unIdentifyUser", []);
    }

    private wrapError(err: Error): Error {
        const message =  [
            err?.message,
            "Error stack: " + err?.stack
        ].join("\n");

        const wrappedError = new Error(message);
        (wrappedError as any).original = err;

        return wrappedError;
    }

    private cycleProviders<M extends keyof TrackingManagerType>(method: M, parameters: Parameters<TrackingManagerType[M]>) {
        const args = Array.from(parameters);

        if (!this.inited) {
            this.queue.push(() => (this[method] as any)(...args));
            return;
        }

        const providers = this.providersInited.map(it => {
            (it[method] as any)(...args);
            return it.getName();
        });

        if (this.opts?.log) {
            this.log(method, providers, args && args.filter(it => it !== undefined));
        }
    }

    private trackOutboundLinks(): void {
        addLinkClickListener((event, elm, {isOutbound}) => {
            if (isOutbound) {
                this.trackEvent("link-outbound-clicked", elm.href)
            }
        })
    }

    //Maybe public in the future
    private trackPerformance() {
        if ("getEntriesByType" in performance) {
            const timing = performance.getEntriesByType("navigation")[0] as Undefinable<PerformanceNavigationTiming>;
            if (timing) {
                this.trackEvent("performance-measured", {
                    domInteractive: Math.round(timing.domInteractive),
                    now: Math.round(performance.now())
                });
            }
        }
    }

    private log(...args: any[]) {
        console.log("Tracking:", new Date().toLocaleTimeString(), ...args)
    }
}