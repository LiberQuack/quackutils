import {PaymentAccountProvider, SubscriptionProvider} from "./types";
import {PaymentUser} from "../types";

//TODO: Implement real class
export class PaypalPaymentProvider implements PaymentAccountProvider<{ createCard: "xisto" }>, SubscriptionProvider {

    provider:"paypal" = "paypal";

    async createCard(user: PaymentUser, data: { createCard: "xisto" }): Promise<{ cardResult: "onion", provider: "paypal" }> {
        return { cardResult: "onion", provider: "paypal" }
    }

}