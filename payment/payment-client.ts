import {PaymentCheckout, PaymentPartialCheckout, PaymentUserData} from "./types";
import {PaymentProviderCheckout} from "./manager-providers/types";
import {PaymentClientProvider} from "./client-providers/payment-client-provider";

/**
 * PaymentClient is the class for executing the checkout on front-end
 */
export abstract class PaymentClient {

    private providers: PaymentClientProvider[];

    constructor(providers: PaymentClientProvider[]) {
        this.providers = providers;
    }

    /**
     * Here you should send the checkout to the server
     *
     * @param checkout
     */
    protected abstract sendCheckout(checkout: PaymentCheckout | PaymentProviderCheckout): Promise<PaymentUserData>

    async checkout(checkout: PaymentCheckout): Promise<PaymentUserData> {
        const providerInstance = this.providers.find(it => it.provider === checkout.provider);

        if (!providerInstance) {
            throw `There's no provider ${checkout.provider} available, try one of [${this.providers.map(it => it.provider)}]`
        }

        let currentRoundTrip = 0;
        let maxRoundTrips = providerInstance.maxRoundTrips() ?? 0;

        let paymentData: PaymentUserData;
        while (currentRoundTrip <= maxRoundTrips) {
            const providerCheckout = await providerInstance.checkout(paymentData!?.lastCheckout ?? checkout);
            paymentData = await this.sendCheckout(providerCheckout);

            if (paymentData.lastCheckout?.success) {
                return paymentData;
            }

            currentRoundTrip++;
        }

        throw "maxRoundTrip reached";
    }

    protected abstract sendCancelCheckout(checkout: PaymentProviderCheckout, reason: string): Promise<PaymentUserData>;

    async cancelCheckout(checkout: PaymentProviderCheckout, reason: string): Promise<PaymentUserData> {
        if (!checkout._id) throw "Expected checkout id"

        return this.sendCancelCheckout(checkout, reason)
    }
}