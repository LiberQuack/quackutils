import {SubscriptionManager} from "./subscription";

export type UserPaymentProperties = {
    _id: string;

    paymentData?: {
        defaultCCard?: string
    }
}

export type PaymentPlan = {
    _id: string;
    price: number;
    providersData: Array<{
        provider: "stripe";
        providerPlanId: string;
    }>
}

export type UserSubscriptionProperties = UserPaymentProperties & {
    currentSubscription?: {
        planId: string;
        subscriptionId: string,
        nextBill: Date | null;
        cancellationDate: Date | null;
        downgradeFromPlan: string;
        downgradePeriodEnd: Date | null;

        provider: "stripe";
        providerCustomerId: string;
    }
}

export type StripeConfig = {
    provider: "stripe",
    apiKey: string,
}
export type ProviderConfig = StripeConfig
export type InitializedProviders<U extends UserSubscriptionProperties, P extends PaymentPlan, C extends ProviderConfig[]> = ReturnType<SubscriptionManager<U, P, C>["providerInitializer"]>;