import {AbstractPaymentServer} from "./abstract-payment-server";
import {ValuesType} from "utility-types";
import {PaymentAccountProvider, PaymentProviderCheckout} from "./manager-providers/types";
import type {ObjectId as ObjectID} from "mongodb";

export type PaymentProviderMinimalProperties = { provider: string };
export type PaymentEnforceProviderBase<T extends PaymentProviderMinimalProperties> = T
export type PaymentUserAccount = PaymentProviderMinimalProperties

export type PaymentUserData = {
    lastCheckout?: PaymentProviderCheckout;
    accounts?: PaymentUserAccount[];
    subscription?: PaymentUserSubscriptionProperties;
};

export type PaymentUser = {
    _id: string;
    email: string;

    payment?: PaymentUserData
}

export type PaymentUserSubscriptionProperties = {
    provider: string;
    providerId: string;
    productIds: PaymentProduct["_id"][];
    nextBill: Date;
    planningCancelDate?: Date;
    planningDowngradeToPlan?: string;
    planningDowngradeDate?: Date;
};

/**
 * Consider renaming it to PaymentProduct and add field type="plan"|"product"
 */
export type PaymentProduct = {
    _id: string;
    title: string;
    price: number;
    code: string;
    type: "product" | "plan"
    payment?: Array<PaymentProductProviderData>
}

export type PaymentProductProviderData = {
    provider: string;
    data: any
};

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

export type PaymentPartialCheckout = PaymentProviderMinimalProperties & {
    err?: any;

    userId: PaymentUser["_id"];
    coupon_code?: PaymentCoupon["code"];

    items: Array<{
        productId: PaymentProduct["_id"];
        quantity: number;
    }>
}

export type PaymentCheckout = PaymentProviderMinimalProperties & {
    _id?: ObjectID;

    coupon_code?: PaymentCoupon["code"];
    userId: PaymentUser["_id"];

    subtotal: number;
    shipping: number;
    tax: number;
    total: number;

    pctOff: number;
    valueOff: number;

    items: Array<{
        productId: PaymentProduct["_id"];
        quantity: number,
        product: PaymentProduct;
        type: PaymentProduct["type"];
        pctOff: number;
        valueOff: number;
        price: number;
        total: number;
    }>
}

//Utility
export type ProviderName<PM extends AbstractPaymentServer<any, any, any>> = ValuesType<PM["providers"]>["provider"]
export type CreateCardData<PM extends AbstractPaymentServer<any, any, any>> = Parameters<Extract<ValuesType<PM["providers"]>, PaymentAccountProvider>["createCard"]>[1]