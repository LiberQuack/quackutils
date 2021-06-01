import {BeforeInstallPromptEvent} from "./types";
import {State} from "./state";

export class PwaManager {

    readonly state = new State({
        preventedNativePrompt: false,
        isInstalled: "unsure" as "unsure" | "yes" | "no",
    })

    private deferredEvent?: BeforeInstallPromptEvent

    start() {
        console.log("Pwa-Manager: Starting");

        navigator.getInstalledRelatedApps().then(results => {
            const currentHost = location.host
            const isInstalled = results.find(it => it.url.indexOf(currentHost) > -1);

            this.state.update(s => {
                s.isInstalled = isInstalled ? "yes" : "no";
            })
        })

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

export const pwaManagerInstance = new PwaManager();