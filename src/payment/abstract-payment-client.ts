import {PaymentCalculatedCheckout, PaymentCompletedCheckout, PaymentPartialCheckout, PaymentProviderData, PaymentProviderMinimalProperties, PaymentUserData} from "./types.js";
import {AbstractPaymentClientProvider, ProviderClientProviderData} from "./client-providers/abstract-payment-client-provider.js";
import {Narrow} from "../utils.js";
import {inlineErr} from "../app/inline-error.js";
import {PromiseType} from "utility-types";

type NarrowedCalculetedCheckout<P extends AbstractPaymentClientProvider = any, PN extends P["provider"] = any> = Narrow<PaymentCalculatedCheckout, {
    provider: PN,
    externalData: Narrow<PaymentProviderData, { provider: PN, data: ProviderClientProviderData<Extract<P, {provider: PN}>> }>
}>;

/**
 * PaymentClient is the class for executing the checkout on front-end
 */
export abstract class AbstractPaymentClient<P extends AbstractPaymentClientProvider = any> {

    private inited = false
    providers: P[] = [];
    providersInitializers: (() => P)[];

    constructor(providers: (() => P)[]) {
        this.providersInitializers = providers;
    }

    init(): void {
        if (this.inited) return
        this.providers = this.providersInitializers.map(it => it());
        this.inited = true
    }

    async buildUi<PN extends P["provider"]>(calculatedCheckout: NarrowedCalculetedCheckout<P, PN>, opts: Parameters<Extract<P, {provider: PN}>["buildUi"]>[1] & {
        onSuccess: (checkout: PaymentCompletedCheckout) => void,
        onError: (err:Error, checkout?: PaymentCompletedCheckout) => void
    }): Promise<PromiseType<ReturnType<Extract<P, { provider: PN }>["buildUi"]>>> {
        this.checkInited();
        const provider = this.getProvider(calculatedCheckout);

        return provider.buildUi(calculatedCheckout, opts, async (calculatedCheckout) => {
            const [paymentUserData, err] = await inlineErr(this.checkout(calculatedCheckout));

            if (paymentUserData?.lastCheckout?.success) {
                opts.onSuccess(paymentUserData.lastCheckout);
            } else {
                opts.onError(err ?? "Unexpected error", paymentUserData?.lastCheckout);
            }
        });
    }


    async calculateCheckout<PN extends P["provider"]>(checkout: Narrow<PaymentPartialCheckout, {provider: PN}>): Promise<NarrowedCalculetedCheckout<P, PN>> {
        const calculatedCheckout = this.sendCalculateCheckout(checkout);
        return calculatedCheckout as any;
    }

    async checkout(checkout: PaymentCalculatedCheckout): Promise<PaymentUserData> {
        this.checkInited();

        const providerInstance = this.getProvider(checkout);

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

    private getProvider<C extends PaymentProviderMinimalProperties>(checkout: C): Extract<P, { provider: typeof checkout}> {
        const providerInstance = this.providers.find(it => it.provider === checkout.provider);
        if (!providerInstance) {
            throw `There's no provider ${checkout.provider} available, try one of [${this.providers.map(it => it.provider)}]`
        }
        return providerInstance as Extract<P, { provider: typeof checkout}>;
    }

    private checkInited() {
        if (!this.inited) throw "Payment client instance has still not been initiated"
    }

    async cancelCheckout(checkout: PaymentCompletedCheckout, reason: string): Promise<PaymentUserData> {
        const nextCheckout = {...checkout, reason}
        return this.sendCancelCheckout(checkout)
    }

    /**
     * Here you should send the checkout to the server
     *
     * @param checkout
     */
    protected abstract sendCheckout(checkout: PaymentCalculatedCheckout): Promise<PaymentUserData>

    /**
     * Implement this method and send your partial checkout to the server,
     * then you will have ensured prices from your api
     *
     * @param checkout
     * @protected
     */
    protected abstract sendCalculateCheckout(checkout: PaymentPartialCheckout): Promise<PaymentCalculatedCheckout>

    protected abstract sendCancelCheckout(checkout: PaymentCompletedCheckout): Promise<PaymentUserData>;

}