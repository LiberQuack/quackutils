import {PaymentPlan, ProviderMinimalProperties, UserSubscriptionProperties} from "./types";
import {PaymentManager} from "./payment-manager";

/**
 * For now stripe is the only supported provider, but this code is half prepared for next providers
 */
const PROVIDER = "stripe";

export class SubscriptionManager<U extends UserSubscriptionProperties, P extends PaymentPlan, C extends ProviderMinimalProperties[]> extends PaymentManager<U, P, C> {

    subscribe(provider: "provider", nextPlan: P, currentPlan: P | undefined, user: U, opts: { forceCCard?: boolean, save: (partialUser: U) => Promise<void> }) {
        // console.log(`Starting subscription for user ${user.getId()} with plan ${nextPlan.getId()}`);
        //
        // const currentSubscription = user.currentSubscription;
        // const isFreePlan = nextPlan.price === 0;
        // const stripeCustomerId = currentSubscription && currentSubscription.providerCustomerId;
        // const stripePlanId = nextPlan.providers.find(it => it.provider === PROVIDER)?.providerPlanId;
        //
        // if (!stripePlanId) {
        //     throw `Plan ${nextPlan.getId()} needs to be registered in external provider ${PROVIDER}`;
        // }
        //
        // if (isFreePlan && !opts?.forceCCard) {
        //     await saveBillingInfo(user, nextPlan, user?.currentSubscription?.nextBill ?? null);
        //     return {clientSecret: "", requireConfirmation: false, subscriptionId: "", success: true, status: "success", provider: PROVIDER};
        // }
        //
        // /**
        //  * Here it's expected stripe customer id because the user need to have registered the ccard
        //  */
        // if (!stripeCustomerId || !stripePlanId) {
        //     throw "Unexpected error, Try entering a new credit card or contact support"
        // }
        //
        // const subscriptionsResponse = await getSubscription(stripeCustomerId);
        //
        // let hasSubscription = Boolean(subscriptionsResponse);
        //
        // const isUpgrade = currentPlan ? nextPlan.price > currentPlan.price : true;
        // const isDowngradeCancel = currentSubscription?.downgradeFromPlan && currentSubscription?.downgradePeriodEnd > new Date() && nextPlan.getId() === currentSubscription?.planId;
        // const cancellationDate = currentSubscription?.cancellationDate;
        //
        // const subscription = hasSubscription ?
        //     await updateSubscription(subscriptionsResponse, stripePlanId, isUpgrade, isDowngradeCancel) :
        //     await createSubscription(stripeCustomerId, stripePlanId, cancellationDate && cancellationDate > new Date() ? cancellationDate : undefined);
        //
        // const paymentIntent = subscription.latest_invoice.payment_intent || {};
        //
        // const subscriptionId = subscription.id;
        // const status = subscription.status;
        // const success = status === "active" || status === "trialing";
        // const requireConfirmation = status === "incomplete" || status === "past_due";
        // const periodEnd = new Date(subscription.current_period_end * 1000);
        // const clientSecret = paymentIntent.client_secret;
        //
        // if (!requireConfirmation) {
        //     await saveBillingInfo(user, nextPlan, periodEnd);
        // }
        //
        // console.log(`Successfully subscribed user ${user.getId()} to ${nextPlan.getId()} with stripeSubscriptionId ${subscriptionId}`);
        //
        // return {clientSecret, requireConfirmation, subscriptionId, success, status};
    }

    cancelPlan() {

    }

    subscribeConfirm() {

    }

    verifyBillings() {

    }

}

export async function saveBillingInfo(user: UserSubscriptionProperties, nextPlan: PaymentPlan, periodEnd: Date | null) {
    // if (!user || !nextPlan) {
    //     throw "Unexpected error, could not find one or more of these items {user, plan, periodEnd}"
    // }
    //
    // const currentPlan = await getCurrentPlan(user);
    // const isDowngrade = currentPlan && nextPlan.get("price") < currentPlan.get("price");
    //
    // const subscription: typeof user.currentSubscription = {
    //     planId: nextPlan.getId(),
    //     nextBill: periodEnd,
    //     cancellationDate: null,
    //     downgradeFromPlan: isDowngrade ? currentPlan : null,
    //     downgradePeriodEnd: isDowngrade ? periodEnd : null,
    //     provider: PROVIDER,
    //     providerCustomerId: "",
    // };
    //
    // await user.save(null, {useMasterKey: true});
}

