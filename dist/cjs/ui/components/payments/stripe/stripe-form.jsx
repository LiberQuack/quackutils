var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
define(["require", "exports", "haunted/lib/core", "../../../util/hooks/use-await", "haunted", "./stripe-context", "../../../util/css", "./stripe-context"], function (require, exports, core_1, use_await_1, haunted_1, stripe_context_1, css_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StripeForm = exports.fmt = void 0;
    exports.fmt = {
        err: (...args) => args
    };
    (0, css_1.css) `stripe-form { display: block }`;
    const StripeForm = function (props) {
        const stripeRef = (0, core_1.useRef)(null);
        const useSubmit = (0, use_await_1.useAwait)(async () => {
            if (stripeRef.current) {
                const { stripeClient, stripeElements } = stripeRef.current;
                const stripeTokenizableElm = stripeElements.getElement("cardNumber") || stripeElements.getElement("card");
                if (!stripeTokenizableElm) {
                    throw "Input not found";
                }
                const tokenResult = await stripeClient.createToken(stripeTokenizableElm);
                if (tokenResult.token) {
                    const sendTokenEvent = new CustomEvent("sendcardtoken", { detail: { token: tokenResult.token }, bubbles: true });
                    this.dispatchEvent(sendTokenEvent);
                }
                if (tokenResult.error) {
                    console.warn(tokenResult.error);
                    throw tokenResult.error;
                }
            }
        }, (data) => {
            if (this.value) {
                this.value = { ...this.value, useSubmit: { ...data } };
            }
        });
        const stripeCb = (0, use_await_1.useAwait)(async () => {
            const stripeImport = await new Promise((resolve_1, reject_1) => { require(['@stripe/stripe-js'], resolve_1, reject_1); }).then(__importStar);
            const stripe = await stripeImport.loadStripe(props.stripePublicKey);
            if (!stripe) {
                throw "Could not load stripe";
            }
            const stripeElements = stripe.elements();
            stripeRef.current = {
                stripeClient: stripe,
                stripeElements: stripeElements,
                useSubmit: useSubmit
            };
            this.value = stripeRef.current;
        });
        (0, core_1.useEffect)(() => {
            if (!stripeRef.current) {
                stripeCb.run();
            }
        }, []);
    };
    exports.StripeForm = StripeForm;
    customElements.define("stripe-form", (0, haunted_1.component)(exports.StripeForm, {
        useShadowDOM: false,
        baseElement: stripe_context_1.StripeContext.Provider,
        observedAttributes: ["stripe-public-key"]
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaXBlLWZvcm0uanN4Iiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3VpL2NvbXBvbmVudHMvcGF5bWVudHMvc3RyaXBlL3N0cmlwZS1mb3JtLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFZYSxRQUFBLEdBQUcsR0FBRztRQUNmLEdBQUcsRUFBRSxDQUFDLEdBQUcsSUFBVyxFQUFFLEVBQUUsQ0FBQyxJQUFJO0tBQ2hDLENBQUE7SUFpQkQsSUFBQSxTQUFHLEVBQUEsZ0NBQWdDLENBQUE7SUFDNUIsTUFBTSxVQUFVLEdBQXVCLFVBQVUsS0FBSztRQUN6RCxNQUFNLFNBQVMsR0FBRyxJQUFBLGFBQU0sRUFBQyxJQUFtQyxDQUFDLENBQUM7UUFFOUQsTUFBTSxTQUFTLEdBQUcsSUFBQSxvQkFBUSxFQUFDLEtBQUssSUFBSSxFQUFFO1lBQzlCLElBQUksU0FBUyxDQUFDLE9BQU8sRUFBRTtnQkFDbkIsTUFBTSxFQUFDLFlBQVksRUFBRSxjQUFjLEVBQUMsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDO2dCQUN6RCxNQUFNLG9CQUFvQixHQUFHLGNBQWMsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLElBQUksY0FBYyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFFMUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFO29CQUN2QixNQUFNLGlCQUFpQixDQUFBO2lCQUMxQjtnQkFFRCxNQUFNLFdBQVcsR0FBRyxNQUFNLFlBQVksQ0FBQyxXQUFXLENBQUMsb0JBQW9CLENBQUMsQ0FBQztnQkFFekUsSUFBSSxXQUFXLENBQUMsS0FBSyxFQUFFO29CQUNuQixNQUFNLGNBQWMsR0FBNkQsSUFBSSxXQUFXLENBQUMsZUFBZSxFQUFFLEVBQUMsTUFBTSxFQUFFLEVBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxLQUFLLEVBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztvQkFDdkssSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQTtpQkFDckM7Z0JBRUQsSUFBSSxXQUFXLENBQUMsS0FBSyxFQUFFO29CQUNuQixPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtvQkFDL0IsTUFBTSxXQUFXLENBQUMsS0FBSyxDQUFDO2lCQUMzQjthQUNKO1FBQ0wsQ0FBQyxFQUNDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDUCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFBQyxHQUFHLElBQUksRUFBQyxFQUFDLENBQUM7YUFDdEQ7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVQLE1BQU0sUUFBUSxHQUFHLElBQUEsb0JBQVEsRUFBQyxLQUFLLElBQUksRUFBRTtZQUNqQyxNQUFNLFlBQVksR0FBRyxzREFBYSxtQkFBbUIsOENBQUMsQ0FBQztZQUN2RCxNQUFNLE1BQU0sR0FBRyxNQUFNLFlBQVksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBRXBFLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1QsTUFBTSx1QkFBdUIsQ0FBQzthQUNqQztZQUVELE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUV6QyxTQUFTLENBQUMsT0FBTyxHQUFHO2dCQUNoQixZQUFZLEVBQUUsTUFBTTtnQkFDcEIsY0FBYyxFQUFFLGNBQWM7Z0JBQzlCLFNBQVMsRUFBRSxTQUFTO2FBQ3ZCLENBQUM7WUFFRixJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFBLGdCQUFTLEVBQUMsR0FBRyxFQUFFO1lBQ1gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3BCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQzthQUNsQjtRQUNMLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNYLENBQUMsQ0FBQTtJQXZEWSxRQUFBLFVBQVUsY0F1RHRCO0lBRUQsY0FBYyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsSUFBQSxtQkFBUyxFQUFDLGtCQUFVLEVBQUU7UUFDdkQsWUFBWSxFQUFFLEtBQUs7UUFDbkIsV0FBVyxFQUFFLDhCQUFhLENBQUMsUUFBUTtRQUNuQyxrQkFBa0IsRUFBRSxDQUFDLG1CQUFtQixDQUFRO0tBQ25ELENBQUMsQ0FBQyxDQUFBIn0=