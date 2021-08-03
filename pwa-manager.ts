import {BeforeInstallPromptEvent} from "./types";
import {State} from "./state";
import {inlineErr} from "./inline-error";
import toUint8Array from 'urlb64touint8array';
import {apiClient} from "../src/app/api-client";

export class PwaManager {

    readonly state = new State("pwa", {
        preventedNativePrompt: false,
        isInstalled: "unsure" as "unsure" | "yes" | "no",
        isOnline: true as boolean,
        swRegistered: false as boolean,
        permissions: {
            notification: "default" as PERMISSION
        }
    })

    private deferredEvent?: BeforeInstallPromptEvent
    private swRegistration?: ServiceWorkerRegistration;

    constructor(
        private opts?: Partial<PwaManagerOpts>
    ) {
    }

    start() {
        console.log("Pwa-Manager: Starting");

        this.handleServiceWorker();
        this.handleNetwork();
        this.handleRelatedApps();
        this.readPermissions();

        window.addEventListener("beforeinstallprompt", (e:BeforeInstallPromptEvent) => {
            console.log("Pwa-Manager: beforeinstallprompt event triggered")
            e.preventDefault();
            this.deferredEvent = e;
            this.state.update(s => {s.preventedNativePrompt = true});
        });
    }

    async requestNotificationPermission(onAccepted: (subscription: NotificationSubscription, rawSubscription: PushSubscriptionJSON) => void): Promise<PERMISSION | undefined> {
        if ("Notification" in window) {
            const [notificationResult] = await inlineErr(Notification.requestPermission());

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

                    let subscriptionParsed: NotificationSubscription = {
                        type: "web",
                        endpoint: pushSubscriptionJSON.endpoint,
                        keys: {
                            p256dh: pushSubscriptionJSON.keys.p256dh,
                            auth: pushSubscriptionJSON.keys.auth
                        }
                    };

                    onAccepted(subscriptionParsed, pushSubscriptionJSON);
                    return notificationResult
                }
            }
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
    async promptInstall(fallback: () => void): Promise<"accepted" | "dismissed" | "unknown"> {
        if (this.deferredEvent) {
            await this.deferredEvent.prompt();
            const promptResult = await this.deferredEvent.userChoice;
            this.deferredEvent = undefined;

            if (promptResult.outcome === "accepted") {
                this.state.update(s => {
                    s.isInstalled = "yes";
                });
            }

            console.log("Pwa-Manager: Prompt result", promptResult.outcome);
            return promptResult.outcome;
        } else {
            fallback();
            return "unknown"
        }
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