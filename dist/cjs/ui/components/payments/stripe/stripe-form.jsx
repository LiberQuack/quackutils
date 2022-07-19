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
    customElements.define("stripe-form", (0, haunted_1.component)(exports.StripeForm, { useShadowDOM: false, baseElement: stripe_context_1.StripeContext.Provider }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaXBlLWZvcm0uanN4Iiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3VpL2NvbXBvbmVudHMvcGF5bWVudHMvc3RyaXBlL3N0cmlwZS1mb3JtLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFZYSxRQUFBLEdBQUcsR0FBRztRQUNmLEdBQUcsRUFBRSxDQUFDLEdBQUcsSUFBVyxFQUFFLEVBQUUsQ0FBQyxJQUFJO0tBQ2hDLENBQUE7SUFVRCxJQUFBLFNBQUcsRUFBQSxnQ0FBZ0MsQ0FBQTtJQUM1QixNQUFNLFVBQVUsR0FBdUIsVUFBVSxLQUFLO1FBQ3pELE1BQU0sU0FBUyxHQUFHLElBQUEsYUFBTSxFQUFDLElBQW1DLENBQUMsQ0FBQztRQUU5RCxNQUFNLFNBQVMsR0FBRyxJQUFBLG9CQUFRLEVBQUMsS0FBSyxJQUFJLEVBQUU7WUFDOUIsSUFBSSxTQUFTLENBQUMsT0FBTyxFQUFFO2dCQUNuQixNQUFNLEVBQUMsWUFBWSxFQUFFLGNBQWMsRUFBQyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUM7Z0JBQ3pELE1BQU0sb0JBQW9CLEdBQUcsY0FBYyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsSUFBSSxjQUFjLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUUxRyxJQUFJLENBQUMsb0JBQW9CLEVBQUU7b0JBQ3ZCLE1BQU0saUJBQWlCLENBQUE7aUJBQzFCO2dCQUVELE1BQU0sV0FBVyxHQUFHLE1BQU0sWUFBWSxDQUFDLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2dCQUV6RSxJQUFJLFdBQVcsQ0FBQyxLQUFLLEVBQUU7b0JBQ25CLE1BQU0sY0FBYyxHQUE2RCxJQUFJLFdBQVcsQ0FBQyxlQUFlLEVBQUUsRUFBQyxNQUFNLEVBQUUsRUFBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLEtBQUssRUFBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO29CQUN2SyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFBO2lCQUNyQztnQkFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLEVBQUU7b0JBQ25CLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFBO29CQUMvQixNQUFNLFdBQVcsQ0FBQyxLQUFLLENBQUM7aUJBQzNCO2FBQ0o7UUFDTCxDQUFDLEVBQ0MsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNQLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDWixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxFQUFDLEdBQUcsSUFBSSxFQUFDLEVBQUMsQ0FBQzthQUN0RDtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRVAsTUFBTSxRQUFRLEdBQUcsSUFBQSxvQkFBUSxFQUFDLEtBQUssSUFBSSxFQUFFO1lBQ2pDLE1BQU0sWUFBWSxHQUFHLHNEQUFhLG1CQUFtQiw4Q0FBQyxDQUFDO1lBQ3ZELE1BQU0sTUFBTSxHQUFHLE1BQU0sWUFBWSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7WUFFcEUsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDVCxNQUFNLHVCQUF1QixDQUFDO2FBQ2pDO1lBRUQsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBRXpDLFNBQVMsQ0FBQyxPQUFPLEdBQUc7Z0JBQ2hCLFlBQVksRUFBRSxNQUFNO2dCQUNwQixjQUFjLEVBQUUsY0FBYztnQkFDOUIsU0FBUyxFQUFFLFNBQVM7YUFDdkIsQ0FBQztZQUVGLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztRQUVILElBQUEsZ0JBQVMsRUFBQyxHQUFHLEVBQUU7WUFDWCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRTtnQkFDcEIsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO2FBQ2xCO1FBQ0wsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1gsQ0FBQyxDQUFBO0lBdkRZLFFBQUEsVUFBVSxjQXVEdEI7SUFFRCxjQUFjLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxJQUFBLG1CQUFTLEVBQUMsa0JBQVUsRUFBRSxFQUFDLFlBQVksRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLDhCQUFhLENBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQyxDQUFBIn0=