///<reference types="gtag.js"/>

import {State} from "../state";
import {addLinkClickListener, RouteStateType} from "../router";
import {Dictionary, Undefinable} from "../types";
import {dictionaryMap} from "../dictionary";

export interface TrackingManagerProvider {
    trackPage(pathTemplate: string, fullPath: string): void;

    trackEvent(subject: string, action: string, value?: string | number | boolean | Dictionary<any>): void

    identifyUser(userId: string): void;

    unIdentifyUser(): void;

    getName(): string,
}

export class GoogleAnalyticsProvider implements TrackingManagerProvider {

    private opts: {
        clientId: string;
        debug?: boolean,
        fixedDimensions?: Dictionary<string>
    };

    constructor(opts: GoogleAnalyticsProvider["opts"]) {
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
            scriptElm.src = `https://www.googletagmanager.com/gtag/js?id=${opts.clientId}`;
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

        gtag('config', opts.clientId, {
            send_page_view: false,
            debug_mode: /localhost|127.0.0.1/.test(location.origin),
            ...fixedDimensions
        });

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

    trackPage(pathTemplate: string, fullPath: string): void {
        gtag('event', 'page_view', {
            page_title: document.title,
            page_location: fullPath,
            page_path: pathTemplate,
        });
    }

    trackEvent(subject: string, action: string, value?: string | number | boolean | Dictionary<any>): void {
        let trackingProperties: { eventCategory: string; eventAction: string, eventValue?: number, eventLabel?: string } = {
            eventCategory: subject,
            eventAction: action,
        };

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

        //TODO: Incompatible with ecommerce purchase stuff
        gtag("event", `${subject}-${action}`, trackingProperties);
    }
}

export class TrackingManager implements Omit<TrackingManagerProvider, "getName"> {

    private inited?: boolean;
    private providers: (() => TrackingManagerProvider)[];
    private providersInited: TrackingManagerProvider[] = [];
    private router?: State<RouteStateType>;

    private _log: boolean;
    private queue = [] as (() => void)[];

    constructor(providers: (() => TrackingManagerProvider)[], opts?: { log: boolean }) {
        this.providers = providers;
        this._log = Boolean(opts?.log);
    }

    init() {
        if (this.inited) return;
        this.inited = true;

        this.providersInited = this.providers.map(it => it());

        this.queue.forEach(it => it());
        this.queue = [];

        this.trackEvent("tracking", "init");
        this.trackPerformance();
        this.trackExternalLinks()

        if (this.router) {
            this.router.subscribe((prev, current) => {
                const {pathTemplate, fullPath} = current.state
                this.trackPage(pathTemplate, fullPath);
            })
        }
    }

    //Maybe public in the future
    private trackPerformance() {
        if ("getEntriesByType" in performance) {
            const timing = performance.getEntriesByType("navigation")[0] as Undefinable<PerformanceNavigationTiming>;
            if (timing) {
                this.trackEvent("performance", "measured", {
                    domInteractive: Math.round(timing.domInteractive),
                    now: Math.round(performance.now())
                });
            }
        }
    }

    /**
     * This method allows you to <b>manually</b> send a page view event.
     *
     * If you want to listen and track every route change, lookfor the <b>trackRouting()</b> method
     *
     * @param pathTemplate
     * @param fullPath
     */
    trackPage(pathTemplate: string, fullPath: string): void {
        const providers = this.providersInited.map(provider => {
            provider.trackPage(pathTemplate, fullPath);
            return provider.getName();
        });

        if (this._log) {
            this.log("tracking page", providers, {pathTemplate, fullPath});
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

    trackEvent(subject: string, action: string, value?: string | number | boolean | Dictionary<any>): void {
        if (!this.inited) {
            this.queue.push(() => this.trackEvent(subject, action, value));
            return;
        }

        const providers = this.providersInited.map(it => {
            it.trackEvent(subject, action, value);
            return it.getName();
        });

        if (this._log) {
            this.log("tracking event", providers, {subject, action, value});
        }
    }

    identifyUser(userId: string): void {
        if (!this.inited) {
            this.queue.push(() => this.identifyUser(userId));
            return;
        }

        const providers = this.providersInited.map(provider => {
            provider.identifyUser(userId);
            return provider.getName();
        });

        if (this._log) {
            this.log("identifying user", providers, userId);
        }
    }

    unIdentifyUser(): void {
        if (!this.inited) {
            this.queue.push(() => this.unIdentifyUser());
            return;
        }

        const providers = this.providersInited.map(provider => {
            provider.unIdentifyUser();
            return provider.getName();
        });

        if (this._log) {
            this.log("un-identifying user", providers);
        }
    }

    private trackExternalLinks(): void {
        addLinkClickListener((event, elm, {isOutbound}) => {
            if (isOutbound) {
                this.trackEvent("link", "visit-external-page", elm.href)
            }
        })
    }

    private log(...args: any[]) {
        console.log("Tracking:", new Date().toLocaleTimeString(), ...args)
    }
}