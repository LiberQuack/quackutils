/// <reference lib="dom"/>

import {BeforeInstallPromptEvent, Undefinable} from "./types";
import {State} from "./state";
import {inlineErr} from "./inline-error";
import toUint8Array from 'urlb64touint8array';

type PwaPromptResult = "accepted" | "dismissed" | "unknown";

export class PwaManager {

    readonly state = new State("pwa", {
        preventedNativePrompt: false,
        isInstalled: "unsure" as "unsure" | "yes" | "no",
        promptingInstall: false as boolean,
        promptingNotification: false as boolean,
        promptingInstallResult: undefined as Undefinable<PwaPromptResult>,
        isOnline: true as boolean,
        swRegistered: false as boolean,
        permissions: {
            notification: "default" as PERMISSION
        },
        displayMode: undefined as Undefinable<"standalone" | "fullscreen" | "browser">
    })

    private deferredEvent?: BeforeInstallPromptEvent
    private swRegistration?: ServiceWorkerRegistration;

    constructor(
        private opts?: Partial<PwaManagerOpts>
    ) { }

    init() {
        console.log("Pwa-Manager: Starting");

        inlineErr(this.handleServiceWorker());
        inlineErr(this.handleNetwork());
        inlineErr(this.handleRelatedApps());
        inlineErr(this.readPermissions());
        inlineErr(this.startDisplayModeDetector());

        window.addEventListener("beforeinstallprompt", (e:BeforeInstallPromptEvent) => {
            console.log("Pwa-Manager: beforeinstallprompt event triggered")
            e.preventDefault();
            this.deferredEvent = e;
            this.state.update(s => {s.preventedNativePrompt = true});
        });
    }

    startDisplayModeDetector() {
        const standaloneMatcher = window.matchMedia('(display-mode: standalone)');
        const fullScreenMatcher = window.matchMedia('(display-mode: fullscreen)');

        const writeState = () => {
            const displayModeType =
                standaloneMatcher.matches ? "standalone" :
                    fullScreenMatcher.matches ? "fullscreen" : "browser"

            this.state.update(s => {
                s.displayMode = displayModeType
            });
        };

        writeState();
        standaloneMatcher.addEventListener("change", writeState);
        fullScreenMatcher.addEventListener("change", writeState);
    }

    async requestNotificationPermission(onAccepted: (subscription: NotificationSubscription, rawSubscription: PushSubscriptionJSON) => void): Promise<PERMISSION | undefined> {
        if ("Notification" in window) {
            this.state.update((s) => {s.promptingNotification = true});

            const [res] = await inlineErr((async (): Promise<PERMISSION | undefined> => {
                const notificationResult = await Notification.requestPermission()

                if (notificationResult) {
                    await this.state.update(s => {s.permissions.notification = notificationResult});
                    console.log("Pwa-Manager: Notification permission is", notificationResult)

                    if (notificationResult === "granted" && this.swRegistration && this.opts?.serverPushKey) {
                        const [subscriptionResult] = await inlineErr(this.swRegistration.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: toUint8Array(this.opts.serverPushKey)
                        }));

                        const pushSubscriptionJSON = subscriptionResult && subscriptionResult.toJSON();

                        if (!pushSubscriptionJSON || !pushSubscriptionJSON.endpoint) {
                            console.warn("Pwa-Manager: Could not subscribe to push notification");
                            return;
                        }

                        let keys = pushSubscriptionJSON.keys!;

                        let subscriptionParsed: NotificationSubscription = {
                            type: "web",
                            endpoint: pushSubscriptionJSON.endpoint,
                            keys: {
                                p256dh: keys.p256dh!,
                                auth: keys.auth!
                            }
                        };

                        onAccepted(subscriptionParsed, pushSubscriptionJSON);
                        return notificationResult
                    }
                }
            })());

            this.state.update((s) => {s.promptingNotification = false});
            return res
        }
    }

    private async handleRelatedApps() {
        const results = await navigator.getInstalledRelatedApps();
        const currentHost = location.host
        const isInstalled = results.find(it => it.url.indexOf(currentHost) > -1);
        const installedText = isInstalled ? "yes" : "no";

        console.log("Pwa-Manager: App is installed?", installedText);

        await this.state.update(s => {
            s.isInstalled = installedText;
        });
    }

    private async handleServiceWorker() {
        if (this.opts?.sw) {
            const [registration] = await inlineErr(this.opts.sw());
            if (registration) {
                this.swRegistration = registration;
                await this.state.update(s => {
                    s.swRegistered = true;
                })
            }
        }
    }

    private async updateNetworkStatus() {
        console.log("Pwa-Manager: Checking networking connectivity");

        const preventServerTest = !this.opts?.healthUrl;
        const isOnline = navigator.onLine && (preventServerTest || await this.testServerIsReachable());

        this.state.update(s => {
            s.isOnline = isOnline;
        })
    }

    private async testServerIsReachable(): Promise<boolean> {
        const healthUrl = this.opts?.healthUrl;

        if (healthUrl) {
            const [resp] = await inlineErr(fetch(healthUrl, {mode: 'no-cors'}));
            return Boolean(resp)
        } else {
            console.warn("Pwa-Manager: No healthUrl was provided for testing server reachability");
            return false
        }
    }

    private async handleNetwork() {
        this.updateNetworkStatus();
        window.addEventListener("online", () => this.updateNetworkStatus());
        window.addEventListener("offline", () => this.updateNetworkStatus());
        if (this.opts?.healthCheckInterval) {
            setInterval(() => this.updateNetworkStatus(), this.opts.healthCheckInterval * 1000)
        }
    }

    private readPermissions() {
        //TODO: Need to think about persistency... Safari do not allow permission reading
    }

    /**
     * When fallback is run, prompt result will be Promise<"unknown">
     *
     * @param fallback
     */
    async promptInstall(fallback: () => void): Promise<PwaPromptResult> {
        this.state.update((s) => {s.promptingInstall = true});

        const [res, err] = await inlineErr((async (): Promise<PwaPromptResult> => {
            if (this.deferredEvent) {
                await this.deferredEvent.prompt();
                const promptResult = await this.deferredEvent.userChoice;
                this.deferredEvent = undefined;

                this.state.update(s => {
                    s.promptingInstallResult = promptResult.outcome

                    if (promptResult.outcome === "accepted") {
                        s.isInstalled = "yes";
                    }
                });

                console.log("Pwa-Manager: Prompt result", promptResult.outcome);
                return promptResult.outcome;
            } else {
                fallback();
                return "unknown"
            }
        })());

        this.state.update((s) => {s.promptingInstall = false});
        return res || "unknown"
    }
}

type PERMISSION = "default" | "denied" | "granted";

type PwaManagerOpts = {
    sw: () => Promise<ServiceWorkerRegistration>,
    serverPushKey: string;
    healthUrl: string,

    /*** Value is expressed in seconds */
    healthCheckInterval: number;
}

export type NotificationSubscription = {
    type: "web" | "android" | "ios"
    endpoint: string;
    keys: {
        p256dh: string;
        auth: string;
    }
};