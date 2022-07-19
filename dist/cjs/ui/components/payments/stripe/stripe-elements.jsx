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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaXBlLWVsZW1lbnRzLmpzeCIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy91aS9jb21wb25lbnRzL3BheW1lbnRzL3N0cmlwZS9zdHJpcGUtZWxlbWVudHMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7SUFZQSxTQUFTLGVBQWUsQ0FBQyxPQUFlLEVBQUUsSUFBNkI7UUFDbkUsSUFBQSxTQUFHLEVBQUEsR0FBRyxPQUFPLG1CQUFtQixDQUFBO1FBQ2hDLGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLElBQUEsbUJBQVMsRUFBQyxJQUFJLEVBQUUsRUFBQyxZQUFZLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZFLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxTQUFTLG9CQUFvQixDQUFDLE9BQWUsRUFBRSxJQUFlLEVBQUUsSUFBVTtRQUV0RSxNQUFNLGNBQWMsR0FBNEI7WUFDNUMsTUFBTSxhQUFhLEdBQUcsSUFBQSxpQkFBVSxFQUFDLDhCQUFhLENBQUMsQ0FBQztZQUNoRCxNQUFNLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxHQUFHLElBQUEsZUFBUSxFQUFDLElBQTZCLENBQUMsQ0FBQztZQUUxRSxJQUFBLGdCQUFTLEVBQUMsR0FBRyxFQUFFO2dCQUNYLElBQUksYUFBYSxFQUFFO29CQUNmLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2lCQUNyRTtZQUNMLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUE7WUFFbkIsT0FBTyxTQUFTLENBQUE7UUFDcEIsQ0FBQyxDQUFDO1FBRUYsT0FBTyxlQUFlLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFBO0lBQ25ELENBQUM7SUFFRCxTQUFTLGtCQUFrQixDQUFDLElBQWlCLEVBQUUsU0FBNEIsRUFBRSxJQUFlLEVBQUUsSUFBUztRQUNuRyxNQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckUsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoRCxTQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTNCLFNBQVMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDeEIsSUFBSSxtQkFBbUIsR0FBNEQsSUFBSSxXQUFXLENBQUMsY0FBYyxFQUFFLEVBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztZQUMvSSxJQUFJLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDNUMsQ0FBQyxDQUFDLENBQUE7UUFFRixPQUFPLFNBQVMsQ0FBQTtJQUNwQixDQUFDO0lBRVksUUFBQSxVQUFVLEdBQUcsb0JBQW9CLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3pELFFBQUEsZ0JBQWdCLEdBQUcsb0JBQW9CLENBQUMsb0JBQW9CLEVBQUUsWUFBWSxDQUFDLENBQUE7SUFDM0UsUUFBQSxhQUFhLEdBQUcsb0JBQW9CLENBQUMsaUJBQWlCLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDbkUsUUFBQSxnQkFBZ0IsR0FBRyxvQkFBb0IsQ0FBQyxvQkFBb0IsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUU1RSxRQUFBLGVBQWUsR0FBRyxlQUFlLENBQUMscUJBQXFCLEVBQUU7UUFDbEUsTUFBTSxhQUFhLEdBQUcsSUFBQSxpQkFBVSxFQUFDLDhCQUFhLENBQUMsQ0FBQztRQUNoRCxNQUFNLEdBQUcsR0FBRyxhQUFhLEVBQUUsU0FBUyxFQUFFLEdBQUcsQ0FBQztRQUUxQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ04sT0FBTyxTQUFTLENBQUE7U0FDbkI7UUFFRCxPQUFPLElBQUEsVUFBSSxFQUFBLEdBQUcsaUJBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQTtJQUNoQyxDQUFDLENBQUMsQ0FBQTtJQUVXLFFBQUEsWUFBWSxHQUFHLGVBQWUsQ0FBQyxlQUFlLEVBQUU7UUFDekQsTUFBTSxhQUFhLEdBQUcsSUFBQSxpQkFBVSxFQUFDLDhCQUFhLENBQUMsQ0FBQztRQUNoRCxNQUFNLFFBQVEsR0FBRyxhQUFhLEVBQUUsU0FBUyxFQUFFLEdBQUcsQ0FBQztRQUUvQyxJQUFBLGdCQUFTLEVBQUMsR0FBRyxFQUFFO1lBQ1gsSUFBSSxRQUFRLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDekMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQzVEO1FBQ0wsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQTtJQUNsQixDQUFDLENBQUMsQ0FBQSJ9