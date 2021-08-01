import PushNotifications, {Data, Settings} from 'node-pushnotifications';


export class PushManager {

    private provider: PushNotifications;

    constructor(settings: Settings) {
        this.provider = new PushNotifications(settings)
    }

    async sendNotification(recipients: string[], message: Data): Promise<PushNotifications.Result[]> {
        return this.provider.send(recipients, message);
    }

}