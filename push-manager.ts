import PushNotifications, {Data, Settings} from 'node-pushnotifications';
import type {NotificationSubscription} from "./pwa-manager";

export class PushManager {

    private provider: PushNotifications;

    constructor(settings: Settings) {
        this.provider = new PushNotifications(settings)
    }

    async sendNotification(recipients: (Omit<NotificationSubscription, "type">)[], message: Data): Promise<PushNotifications.Result[]> {
        const results = await this.provider.send(recipients, message);
        const failures = results.filter(it => it.failure > 0);
        const failureCount = failures.reduce((acc, item) => acc + item.failure, 0);

        if (failureCount > 0) {
            console.log(this.sendNotification, `Failure count ${failureCount}`)
        }

        return results;
    }

}