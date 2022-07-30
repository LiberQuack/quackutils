import {PaymentCalculatedCheckout, PaymentPartialCheckout, PaymentProviderData, PaymentCompletedCheckout, PaymentUserData} from "./types.js";
import {AbstractPaymentClientProvider} from "./client-providers/abstract-payment-client-provider.js";
import {State} from "../app/state/index.js";
import {ProviderClientData} from "./client-providers/payment-stripe-client-provider.js";

const paymentClientInitialState:PaymentProviderData<any> | {} = {};

/**
 * PaymentClient is the class for executing the checkout on front-end
 */
export abstract class AbstractPaymentClient {

    private static state = new State("payment-client", paymentClientInitialState);

    private inited = false
    private providers: AbstractPaymentClientProvider<unknown>[] = [];
    private providersInitializers: (() => AbstractPaymentClientProvider<unknown>)[];

    constructor(providers: (() => AbstractPaymentClientProvider<unknown>)[]) {
        this.providersInitializers = providers;
    }

    init(): void {
        if (this.inited) return
        this.providers = this.providersInitializers.map(it => it());
        this.inited = true
    }

    /**
     * Here you should send the checkout to the server
     *
     * @param checkout
     */
    protected abstract sendCheckout(checkout: PaymentCalculatedCheckout<unknown>): Promise<PaymentUserData>

    /**
     * Implement this method and send your partial checkout to the server,
     * then you will have ensured prices from your api
     *
     * @param checkout
     * @protected
     */
    protected abstract sendCalculateCheckout(checkout: PaymentPartialCheckout): Promise<PaymentCalculatedCheckout<unknown>>

    protected abstract sendCancelCheckout(checkout: PaymentCompletedCheckout<unknown>): Promise<PaymentUserData>;

    async calculateCheckout(checkout: PaymentPartialCheckout): Promise<PaymentCalculatedCheckout<unknown>> {
        return this.sendCalculateCheckout(checkout);
    }

    async checkout(checkout: PaymentCalculatedCheckout<unknown>): Promise<PaymentUserData> {
        if (!this.inited) throw "Payment client instance has still not been initiated"

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

    async cancelCheckout(checkout: PaymentCompletedCheckout<unknown>, reason: string): Promise<PaymentUserData> {
        const nextCheckout = {...checkout, reason}
        return this.sendCancelCheckout(checkout)
    }

    /**
     * Use this method for subscribing to latest provider data,
     * so after calculateCheckout, your elements can listen to it,
     *
     * For example <stripe-form> is always subscribed to 'stripe' provider data
     * and when identifying a intentToken, <stripe-form> will recreate the ui
     * using that information
     *
     * See more about PaymentStripeProviderData type and <stripe-form> element
     *
     * @param provider
     * @param cb
     */
    static subcribeProviderData<P extends AbstractPaymentClientProvider<unknown>>(provider: P["provider"], cb: (arg: ProviderClientData<P>) => void) {
        const unsubscribe = AbstractPaymentClient.state.subscribe((prev, {isUpdating, state}) => {
            if (prev?.isUpdating && !isUpdating && "provider" in state && state.provider === provider) {
                cb(state.data);
            }
        })

        return unsubscribe;
    }
}