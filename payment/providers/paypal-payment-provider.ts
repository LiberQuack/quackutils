import {PaymentAccountProvider, SubscriptionProvider} from "./types";
import {UserPaymentAccount} from "../types";

//TODO: Implement real class
export class PaypalPaymentProvider implements PaymentAccountProvider<{ createCard: "xisto" }>, SubscriptionProvider {

    provider:"paypal" = "paypal";

    async createCard(user: UserPaymentAccount, data: { createCard: "xisto" }): Promise<{ cardResult: "onion", provider: "paypal" }> {
        return user.payment
    }

}