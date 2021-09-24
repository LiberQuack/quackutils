import {PaymentManager} from "./payment-manager";
import {PromiseType, ValuesType} from "utility-types";
import {PaymentAccountProvider} from "./providers/types";

export type PaymentProviderMinimalProperties = { provider: string };
export type PaymentEnforceProviderBase<T extends PaymentProviderMinimalProperties> = T

export type PaymentUser = {
    _id: string;
    email: string;

    payment?: Partial<PaymentUserAccountsProperties>
}

export type PaymentUserAccountsProperties = {
    providerInUse: string,
    accounts: PaymentEnforceProviderBase<PaymentProviderMinimalProperties>[]
};

export type PaymentProduct = {
    _id: string;
    price: number;
    type: "product" | "plan"
    providersData: Array<{
        provider: "stripe";
        providerPlanId: string;
    }>
}

export type PaymentUserSubscriptionProperties = PaymentUser & {
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

//Utility
export type ProviderName<PM extends PaymentManager<any, any, any>> = ValuesType<PM["providers"]>["provider"]
export type CreateCardData<PM extends PaymentManager<any, any, any>> = Parameters<Extract<ValuesType<PM["providers"]>, PaymentAccountProvider<any>>["createCard"]>[1]
export type CreateCardResults<PM extends PaymentManager<any, any, any>> = PromiseType<ReturnType<Extract<ValuesType<PM["providers"]>, PaymentAccountProvider<any>>["createCard"]>>