import {GoogleTrackingBaseOpts} from "./google-tracking-types";

export function assureGtag(opts: GoogleTrackingBaseOpts) {
    if (window.gtag!) {
        return;
    }

    //Init gtag placeholder while script is not loaded
    window.gtag = function () {(window as any).dataLayer.push(arguments)};
    (window as any).dataLayer = (window as any).dataLayer || [];
    window.gtag('js', new Date());

    //Set debug mode
    const isLocal = /localhost|127.0.0.1/.test(location.origin);
    const debugOptionPassed = "debug" in opts;
    const debug = debugOptionPassed ? Boolean(opts?.debug) : isLocal;
    if (!debugOptionPassed && isLocal) {
        gtag("set", {debug_mode: debug});
        console.log(
            "GoogleAnalyticsProvider: automatically entered in debug mode due localhost",
            "https://analytics.google.com/analytics/web/#/m/p281276571/debugview/overview"
        )
    }

    //Async load gtag script
    const scriptElm = document.createElement("script");
    scriptElm.src = `https://www.googletagmanager.com/gtag/js?id=${opts.clientId}`;
    document.body.appendChild(scriptElm);
}