import {PaymentAccountProvider, SubscriptionProvider} from "./types";
import {PaymentProduct, PaymentUser, PaymentUserAccountsProperties} from "../types";

type PaymentPayPalAccount = { cardResult: "onion", provider: "paypal" };

//TODO: Implement real class
export class PaypalPaymentProvider implements PaymentAccountProvider, SubscriptionProvider {

    provider:"paypal" = "paypal";

    async createCard(user: PaymentUser, data: { createCard: "xisto" }): Promise<PaymentPayPalAccount> {
        return { cardResult: "onion", provider: "paypal" }
    }

    async updateDefaultCard(user: PaymentUser, cardIdentifier: string): Promise<PaymentPayPalAccount> {
        return { cardResult: "onion", provider: "paypal" }
    }

    subscribeToPlan(user: PaymentUser, plan: PaymentProduct): Promise<Partial<PaymentUserAccountsProperties>> {
        return Promise.resolve({});
    }

}