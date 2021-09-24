import {PaymentManager} from "./payment-manager";
import {PromiseType, ValuesType} from "utility-types";
import {PaymentAccountProvider} from "./manager-providers/types";

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

/**
 * Consider renaming it to PaymentProduct and add field type="plan"|"product"
 */
export type PaymentProduct = {
    _id: string;
    price: number;
    type: "product" | "plan"
    providersData: Array<{
        provider: "stripe";
        providerPlanId: string;
    }>
}

/**
 * If multiple optional fields are used at once
 * the total discount is gonna be the sum of all discounts
 */
export type PaymentCoupon = {
    _id: string,
    code: string;
    expiresAt?: Date;
    maxUsageCount?: number;

    /**
     * Applied on subtotal, it should be >0 and <=1
     *
     * subtotal: 100
     * pct_off: 0.5
     * discount = 50
     */
    pctOff?: number;

    /**
     * Applied on subtotal, it should be >0
     *
     * subtotal: 100
     * value_off: 1.99
     * discount = 1.99
     */
    valueOff?: number;

    /**
     * Applied on items only
     */
    items?: Array<{
        /**
         * product_id for applying the discount
         */
        productId: string,
        pctOff?: number;
        valueOff?: number;
    }>
}

export type PaymentCheckout = {
    _id?: string;
    err?: any;

    coupon_code?: PaymentCoupon["code"];
    userId: PaymentUser["_id"];

    subtotal: number;
    tax: number;
    total: number;

    pctOff: number;
    valueOff: number;

    items: Array<{
        productId: PaymentProduct["_id"];
        product?: PaymentProduct
        type: PaymentProduct["type"];
        pctOff?: number;
        valueOff?: number;
        price: number;
        total: number;
    }>
}

//Utility
export type ProviderName<PM extends PaymentManager<any, any, any>> = ValuesType<PM["providers"]>["provider"]
export type CreateCardData<PM extends PaymentManager<any, any, any>> = Parameters<Extract<ValuesType<PM["providers"]>, PaymentAccountProvider>["createCard"]>[1]
export type CreateCardResults<PM extends PaymentManager<any, any, any>> = PromiseType<ReturnType<Extract<ValuesType<PM["providers"]>, PaymentAccountProvider>["createCard"]>>