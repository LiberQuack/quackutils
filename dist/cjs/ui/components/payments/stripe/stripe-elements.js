define(["require", "exports", "haunted/lib/core", "./stripe-context", "haunted", "../../../util/css", "./stripe-form", "lit"], function (require, exports, core_1, stripe_context_1, haunted_1, css_1, stripe_form_1, lit_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StripeSubmit = exports.StripeSubmitErr = exports.StripeCardExpiry = exports.StripeCardCvc = exports.StripeCardNumber = exports.StripeCard = void 0;
    function defineComponent(tagName, func) {
        (0, css_1.css) `${tagName} {display: block}`;
        customElements.define(tagName, (0, haunted_1.component)(func, { useShadowDOM: false }));
        return func;
    }
    function defineStripeInputElm(tagName, type, opts) {
        const StripeInputElm = function () {
            const stripeContext = (0, core_1.useContext)(stripe_context_1.StripeContext);
            const [stripeElm, setStripeElm] = (0, core_1.useState)(null);
            (0, core_1.useEffect)(() => {
                if (stripeContext) {
                    setStripeElm(buildStripeElement(this, stripeContext, type, opts));
                }
            }, [stripeContext]);
            return stripeElm;
        };
        return defineComponent(tagName, StripeInputElm);
    }
    function buildStripeElement(host, stripeRef, type, opts) {
        const stripeElm = stripeRef.stripeElements.create(type, opts);
        const container = document.createElement("div");
        stripeElm.mount(container);
        stripeElm.on("ready", (e) => {
            let onElementReadyEvent = new CustomEvent("elementready", { detail: e, bubbles: true });
            host.dispatchEvent(onElementReadyEvent);
        });
        return container;
    }
    exports.StripeCard = defineStripeInputElm("stripe-card", "card");
    exports.StripeCardNumber = defineStripeInputElm("stripe-card-number", "cardNumber");
    exports.StripeCardCvc = defineStripeInputElm("stripe-card-cvc", "cardCvc");
    exports.StripeCardExpiry = defineStripeInputElm("stripe-card-expiry", "cardExpiry");
    exports.StripeSubmitErr = defineComponent("stripe-submit-error", function () {
        const stripeContext = (0, core_1.useContext)(stripe_context_1.StripeContext);
        const err = stripeContext?.useSubmit?.err;
        if (!err) {
            return undefined;
        }
        return (0, lit_1.html) `${stripe_form_1.fmt.err(err)}`;
    });
    exports.StripeSubmit = defineComponent("stripe-submit", function () {
        const stripeContext = (0, core_1.useContext)(stripe_context_1.StripeContext);
        const submitCb = stripeContext?.useSubmit?.run;
        (0, core_1.useEffect)(() => {
            if (submitCb) {
                this.addEventListener("click", submitCb);
                return () => this.removeEventListener("click", submitCb);
            }
        }, [submitCb]);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaXBlLWVsZW1lbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3VpL2NvbXBvbmVudHMvcGF5bWVudHMvc3RyaXBlL3N0cmlwZS1lbGVtZW50cy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztJQVlBLFNBQVMsZUFBZSxDQUFDLE9BQWUsRUFBRSxJQUE2QjtRQUNuRSxJQUFBLFNBQUcsRUFBQSxHQUFHLE9BQU8sbUJBQW1CLENBQUE7UUFDaEMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsSUFBQSxtQkFBUyxFQUFDLElBQUksRUFBRSxFQUFDLFlBQVksRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkUsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFNBQVMsb0JBQW9CLENBQUMsT0FBZSxFQUFFLElBQWUsRUFBRSxJQUFVO1FBRXRFLE1BQU0sY0FBYyxHQUE0QjtZQUM1QyxNQUFNLGFBQWEsR0FBRyxJQUFBLGlCQUFVLEVBQUMsOEJBQWEsQ0FBQyxDQUFDO1lBQ2hELE1BQU0sQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLEdBQUcsSUFBQSxlQUFRLEVBQUMsSUFBNkIsQ0FBQyxDQUFDO1lBRTFFLElBQUEsZ0JBQVMsRUFBQyxHQUFHLEVBQUU7Z0JBQ1gsSUFBSSxhQUFhLEVBQUU7b0JBQ2YsWUFBWSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7aUJBQ3JFO1lBQ0wsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQTtZQUVuQixPQUFPLFNBQVMsQ0FBQTtRQUNwQixDQUFDLENBQUM7UUFFRixPQUFPLGVBQWUsQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUE7SUFDbkQsQ0FBQztJQUVELFNBQVMsa0JBQWtCLENBQUMsSUFBaUIsRUFBRSxTQUE0QixFQUFFLElBQWUsRUFBRSxJQUFTO1FBQ25HLE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyRSxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hELFNBQVMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFM0IsU0FBUyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUN4QixJQUFJLG1CQUFtQixHQUE0RCxJQUFJLFdBQVcsQ0FBQyxjQUFjLEVBQUUsRUFBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1lBQy9JLElBQUksQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUM1QyxDQUFDLENBQUMsQ0FBQTtRQUVGLE9BQU8sU0FBUyxDQUFBO0lBQ3BCLENBQUM7SUFFWSxRQUFBLFVBQVUsR0FBRyxvQkFBb0IsQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDekQsUUFBQSxnQkFBZ0IsR0FBRyxvQkFBb0IsQ0FBQyxvQkFBb0IsRUFBRSxZQUFZLENBQUMsQ0FBQTtJQUMzRSxRQUFBLGFBQWEsR0FBRyxvQkFBb0IsQ0FBQyxpQkFBaUIsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNuRSxRQUFBLGdCQUFnQixHQUFHLG9CQUFvQixDQUFDLG9CQUFvQixFQUFFLFlBQVksQ0FBQyxDQUFDO0lBRTVFLFFBQUEsZUFBZSxHQUFHLGVBQWUsQ0FBQyxxQkFBcUIsRUFBRTtRQUNsRSxNQUFNLGFBQWEsR0FBRyxJQUFBLGlCQUFVLEVBQUMsOEJBQWEsQ0FBQyxDQUFDO1FBQ2hELE1BQU0sR0FBRyxHQUFHLGFBQWEsRUFBRSxTQUFTLEVBQUUsR0FBRyxDQUFDO1FBRTFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDTixPQUFPLFNBQVMsQ0FBQTtTQUNuQjtRQUVELE9BQU8sSUFBQSxVQUFJLEVBQUEsR0FBRyxpQkFBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFBO0lBQ2hDLENBQUMsQ0FBQyxDQUFBO0lBRVcsUUFBQSxZQUFZLEdBQUcsZUFBZSxDQUFDLGVBQWUsRUFBRTtRQUN6RCxNQUFNLGFBQWEsR0FBRyxJQUFBLGlCQUFVLEVBQUMsOEJBQWEsQ0FBQyxDQUFDO1FBQ2hELE1BQU0sUUFBUSxHQUFHLGFBQWEsRUFBRSxTQUFTLEVBQUUsR0FBRyxDQUFDO1FBRS9DLElBQUEsZ0JBQVMsRUFBQyxHQUFHLEVBQUU7WUFDWCxJQUFJLFFBQVEsRUFBRTtnQkFDVixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUN6QyxPQUFPLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDNUQ7UUFDTCxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFBO0lBQ2xCLENBQUMsQ0FBQyxDQUFBIn0=