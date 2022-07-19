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
customElements.define("stripe-form", component(StripeForm, { useShadowDOM: false, baseElement: StripeContext.Provider }));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaXBlLWZvcm0uanN4Iiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3VpL2NvbXBvbmVudHMvcGF5bWVudHMvc3RyaXBlL3N0cmlwZS1mb3JtLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGtCQUFrQixDQUFBO0FBSXpCLE9BQU8sRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFFbkQsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFFbEMsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUV0QyxNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUc7SUFDZixHQUFHLEVBQUUsQ0FBQyxHQUFHLElBQVcsRUFBRSxFQUFFLENBQUMsSUFBSTtDQUNoQyxDQUFBO0FBVUQsR0FBRyxDQUFBLGdDQUFnQyxDQUFBO0FBQ25DLE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBdUIsVUFBVSxLQUFLO0lBQ3pELE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFtQyxDQUFDLENBQUM7SUFFOUQsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQzlCLElBQUksU0FBUyxDQUFDLE9BQU8sRUFBRTtZQUNuQixNQUFNLEVBQUMsWUFBWSxFQUFFLGNBQWMsRUFBQyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUM7WUFDekQsTUFBTSxvQkFBb0IsR0FBRyxjQUFjLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLGNBQWMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFMUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFO2dCQUN2QixNQUFNLGlCQUFpQixDQUFBO2FBQzFCO1lBRUQsTUFBTSxXQUFXLEdBQUcsTUFBTSxZQUFZLENBQUMsV0FBVyxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFFekUsSUFBSSxXQUFXLENBQUMsS0FBSyxFQUFFO2dCQUNuQixNQUFNLGNBQWMsR0FBNkQsSUFBSSxXQUFXLENBQUMsZUFBZSxFQUFFLEVBQUMsTUFBTSxFQUFFLEVBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxLQUFLLEVBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztnQkFDdkssSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQTthQUNyQztZQUVELElBQUksV0FBVyxDQUFDLEtBQUssRUFBRTtnQkFDbkIsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUE7Z0JBQy9CLE1BQU0sV0FBVyxDQUFDLEtBQUssQ0FBQzthQUMzQjtTQUNKO0lBQ0wsQ0FBQyxFQUNDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDUCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDWixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxFQUFDLEdBQUcsSUFBSSxFQUFDLEVBQUMsQ0FBQztTQUN0RDtJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRVAsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ2pDLE1BQU0sWUFBWSxHQUFHLE1BQU0sTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDdkQsTUFBTSxNQUFNLEdBQUcsTUFBTSxZQUFZLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUVwRSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsTUFBTSx1QkFBdUIsQ0FBQztTQUNqQztRQUVELE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUV6QyxTQUFTLENBQUMsT0FBTyxHQUFHO1lBQ2hCLFlBQVksRUFBRSxNQUFNO1lBQ3BCLGNBQWMsRUFBRSxjQUFjO1lBQzlCLFNBQVMsRUFBRSxTQUFTO1NBQ3ZCLENBQUM7UUFFRixJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUM7SUFDbkMsQ0FBQyxDQUFDLENBQUM7SUFFSCxTQUFTLENBQUMsR0FBRyxFQUFFO1FBQ1gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUU7WUFDcEIsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ2xCO0lBQ0wsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ1gsQ0FBQyxDQUFBO0FBRUQsY0FBYyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLFVBQVUsRUFBRSxFQUFDLFlBQVksRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLGFBQWEsQ0FBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDLENBQUEifQ==