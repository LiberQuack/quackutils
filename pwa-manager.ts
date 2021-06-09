import {BeforeInstallPromptEvent} from "./types";
import {State} from "./state";
import {inlineErr} from "./inline-error";

type PwaManagerOpts = {
    healthUrl: string,

    /*** Value is expressed in seconds */
    healthCheckInterval: number;
}

export class PwaManager {

    readonly state = new State("pwa", {
        preventedNativePrompt: false,
        isInstalled: "unsure" as "unsure" | "yes" | "no",
        isOnline: true
    })

    constructor(
        private opts?: Partial<PwaManagerOpts>
    ) {
    }

    private deferredEvent?: BeforeInstallPromptEvent

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

    start() {
        console.log("Pwa-Manager: Starting");

        this.updateNetworkStatus();
        window.addEventListener("online", () => this.updateNetworkStatus());
        window.addEventListener("offline", () => this.updateNetworkStatus());


        if (this.opts?.healthCheckInterval) {
            setInterval(() => this.updateNetworkStatus(), this.opts.healthCheckInterval * 1000)
        }

        navigator.getInstalledRelatedApps().then(results => {
            const currentHost = location.host
            const isInstalled = results.find(it => it.url.indexOf(currentHost) > -1);
            const installedText = isInstalled ? "yes" : "no";

            console.log("Pwa-Manager: App is installed?", installedText);

            this.state.update(s => {
                s.isInstalled = installedText;
            })
        });

        window.addEventListener("beforeinstallprompt", (e) => {
            console.log("Pwa-Manager: beforeinstallprompt event triggered")
            e.preventDefault();
            this.deferredEvent = e;
            setTimeout(() => {
                this.state.update(s => {
                    s.preventedNativePrompt = true;
                })
            }, 500)
;
        });
    }

    /**
     * When fallback is run, prompt result will be Promise<"unknown">
     *
     * @param fallback
     */
    async prompt(fallback: () => void): Promise<"accepted" | "dismissed" | "unknown"> {
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