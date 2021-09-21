import Stripe from "stripe";

export type ProviderMinimalProperties = { provider: string };
export type EnforcePaymentProviderBase<T extends ProviderMinimalProperties> = T

export type UserPaymentAccount = {
    _id: string;
    email: string;

    payment?: Partial<UserPaymentAccountProperties>
}

export type UserPaymentAccountProperties = {
    providerInUse: string,
    accounts: EnforcePaymentProviderBase<ProviderMinimalProperties>[]
};

export type PaymentPlan = {
    _id: string;
    price: number;
    providersData: Array<{
        provider: "stripe";
        providerPlanId: string;
    }>
}

export type UserSubscriptionProperties = UserPaymentAccount & {
    currentSubscription?: {
        planId: string;
        subscriptionId: string,
        nextBill: Date | null;
        cancellationDate: Date | null;
        downgradeFromPlan: string;
        downgradePeriodEnd: Date | null;

        provider: string;
        providerCustomerId: string;
    }
}