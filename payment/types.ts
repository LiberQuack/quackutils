import {SubscriptionManager} from "./subscription";

export interface UserPaymentProperties {
    _id: string;

    paymentData?: {
        lastCCard?: string
    }
}

export interface PaymentPlan {
    getId(): string;

    price: number;

    providers: [{
        provider: "stripe";
        providerPlanId: string;
    }]
}

export interface UserSubscriptionProperties extends UserPaymentProperties {
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