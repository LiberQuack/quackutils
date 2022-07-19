import "./stripe-context";
import { useEffect, useRef } from "haunted/lib/core";
import { useAwait } from "../../../util/hooks/use-await";
import { component } from "haunted";
import { StripeContext } from "./stripe-context";
import { css } from "../../../util/css";
export const fmt = {
    err: (...args) => args
};
css `stripe-form { display: block }`;
export const StripeForm = function (props) {
    const stripeRef = useRef(null);
    const useSubmit = useAwait(async () => {
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
    const stripeCb = useAwait(async () => {
        const stripeImport = await import('@stripe/stripe-js');
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
    useEffect(() => {
        if (!stripeRef.current) {
            stripeCb.run();
        }
    }, []);
};
customElements.define("stripe-form", component(StripeForm, {
    useShadowDOM: false,
    baseElement: StripeContext.Provider,
    observedAttributes: ["stripe-public-key"]
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaXBlLWZvcm0uanN4Iiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3VpL2NvbXBvbmVudHMvcGF5bWVudHMvc3RyaXBlL3N0cmlwZS1mb3JtLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGtCQUFrQixDQUFBO0FBSXpCLE9BQU8sRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFFbkQsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFFbEMsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUV0QyxNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUc7SUFDZixHQUFHLEVBQUUsQ0FBQyxHQUFHLElBQVcsRUFBRSxFQUFFLENBQUMsSUFBSTtDQUNoQyxDQUFBO0FBaUJELEdBQUcsQ0FBQSxnQ0FBZ0MsQ0FBQTtBQUNuQyxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQXVCLFVBQVUsS0FBSztJQUN6RCxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBbUMsQ0FBQyxDQUFDO0lBRTlELE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxLQUFLLElBQUksRUFBRTtRQUM5QixJQUFJLFNBQVMsQ0FBQyxPQUFPLEVBQUU7WUFDbkIsTUFBTSxFQUFDLFlBQVksRUFBRSxjQUFjLEVBQUMsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDO1lBQ3pELE1BQU0sb0JBQW9CLEdBQUcsY0FBYyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsSUFBSSxjQUFjLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRTFHLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtnQkFDdkIsTUFBTSxpQkFBaUIsQ0FBQTthQUMxQjtZQUVELE1BQU0sV0FBVyxHQUFHLE1BQU0sWUFBWSxDQUFDLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBRXpFLElBQUksV0FBVyxDQUFDLEtBQUssRUFBRTtnQkFDbkIsTUFBTSxjQUFjLEdBQTZELElBQUksV0FBVyxDQUFDLGVBQWUsRUFBRSxFQUFDLE1BQU0sRUFBRSxFQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsS0FBSyxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7Z0JBQ3ZLLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUE7YUFDckM7WUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLEVBQUU7Z0JBQ25CLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFBO2dCQUMvQixNQUFNLFdBQVcsQ0FBQyxLQUFLLENBQUM7YUFDM0I7U0FDSjtJQUNMLENBQUMsRUFDQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ1AsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1osSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFBQyxHQUFHLElBQUksRUFBQyxFQUFDLENBQUM7U0FDdEQ7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVQLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLElBQUksRUFBRTtRQUNqQyxNQUFNLFlBQVksR0FBRyxNQUFNLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3ZELE1BQU0sTUFBTSxHQUFHLE1BQU0sWUFBWSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFcEUsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNULE1BQU0sdUJBQXVCLENBQUM7U0FDakM7UUFFRCxNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFekMsU0FBUyxDQUFDLE9BQU8sR0FBRztZQUNoQixZQUFZLEVBQUUsTUFBTTtZQUNwQixjQUFjLEVBQUUsY0FBYztZQUM5QixTQUFTLEVBQUUsU0FBUztTQUN2QixDQUFDO1FBRUYsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDO0lBQ25DLENBQUMsQ0FBQyxDQUFDO0lBRUgsU0FBUyxDQUFDLEdBQUcsRUFBRTtRQUNYLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFO1lBQ3BCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUNsQjtJQUNMLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNYLENBQUMsQ0FBQTtBQUVELGNBQWMsQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxVQUFVLEVBQUU7SUFDdkQsWUFBWSxFQUFFLEtBQUs7SUFDbkIsV0FBVyxFQUFFLGFBQWEsQ0FBQyxRQUFRO0lBQ25DLGtCQUFrQixFQUFFLENBQUMsbUJBQW1CLENBQVE7Q0FDbkQsQ0FBQyxDQUFDLENBQUEifQ==