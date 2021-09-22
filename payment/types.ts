import {PaymentManager} from "./payment-manager";
import {PromiseType, ValuesType} from "utility-types";
import {PaymentAccountProvider} from "./providers/types";

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

//Utility
export type ProviderName<PM extends PaymentManager<any, any, any>> = ValuesType<PM["providers"]>["provider"]
export type CreateCardData<PM extends PaymentManager<any, any, any>> = Parameters<Extract<ValuesType<PM["providers"]>, PaymentAccountProvider<any>>["createCard"]>[1]
export type CreateCardResults<PM extends PaymentManager<any, any, any>> = PromiseType<ReturnType<Extract<ValuesType<PM["providers"]>, PaymentAccountProvider<any>>["createCard"]>>