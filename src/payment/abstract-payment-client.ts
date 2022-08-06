import {inlineErr} from "../app/inline-error.js";
import type {PromiseType} from "utility-types";
import type {PaymentCalculatedCheckout, PaymentCheckoutExecution, PaymentPartialCheckout, PaymentProviderData, PaymentProviderMinimalProperties, PaymentUserData} from "./types.js";
import type {AbstractPaymentClientProvider, ProviderClientProviderData} from "./client-providers/abstract-payment-client-provider.js";
import type {Narrow} from "../utils.js";
import type {Undefinable} from "../_/types.js";

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
        onSuccess: (checkout: PaymentCheckoutExecution) => void,
        onError: (err:Error, checkout?: PaymentCheckoutExecution) => void
    }): Promise<PromiseType<ReturnType<Extract<P, { provider: PN }>["buildUi"]>>> {
        this.checkInited();
        const provider = this.getProvider(calculatedCheckout);

        return provider.buildUi(calculatedCheckout, opts, async (calculatedCheckout) => {
            const [paymentUserData, err] = await inlineErr(this.checkout(calculatedCheckout));

            if (paymentUserData?.success) {
                opts.onSuccess(paymentUserData);
            } else {
                opts.onError(err ?? "Unexpected error", paymentUserData);
            }
        });
    }


    async calculateCheckout<PN extends P["provider"]>(checkout: Narrow<PaymentPartialCheckout, {provider: PN}>): Promise<NarrowedCalculetedCheckout<P, PN>> {
        const calculatedCheckout = this.sendCalculateCheckout(checkout);
        return calculatedCheckout as any;
    }

    async checkout(checkout: PaymentCalculatedCheckout): Promise<PaymentCheckoutExecution> {
        this.checkInited();
        const providerInstance = this.getProvider(checkout);

        let currentRoundTrip = 0;
        let maxRoundTrips = providerInstance.maxRoundTrips() ?? 0;
        let lastExecution: Undefinable<PaymentCheckoutExecution>;

        while (currentRoundTrip < maxRoundTrips) {
            const providerCheckout = await providerInstance.checkout(lastExecution ?? checkout);
            lastExecution = await this.sendCheckout(providerCheckout);

            if (lastExecution?.success) {
                return lastExecution;
            }

            currentRoundTrip++;
        }

        throw "Payment failed, try other payment method\nor contact support";
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

    async cancelCheckout(checkout: PaymentCheckoutExecution, reason: string): Promise<PaymentUserData> {
        const nextCheckout = {...checkout, reason}
        return this.sendCancelCheckout(checkout)
    }

    /**
     * Here you should send the checkout to the server
     *
     * @param checkout
     */
    protected abstract sendCheckout(checkout: PaymentCalculatedCheckout): Promise<PaymentCheckoutExecution>

    /**
     * Implement this method and send your partial checkout to the server,
     * then you will have ensured prices from your api
     *
     * @param checkout
     * @protected
     */
    protected abstract sendCalculateCheckout(checkout: PaymentPartialCheckout): Promise<PaymentCalculatedCheckout>

    protected abstract sendCancelCheckout(checkout: PaymentCheckoutExecution): Promise<PaymentUserData>;

}