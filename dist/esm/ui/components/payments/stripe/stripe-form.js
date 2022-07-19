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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaXBlLWZvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvdWkvY29tcG9uZW50cy9wYXltZW50cy9zdHJpcGUvc3RyaXBlLWZvcm0udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sa0JBQWtCLENBQUE7QUFJekIsT0FBTyxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUVuRCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFDdkQsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUVsQyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDL0MsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBRXRDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRztJQUNmLEdBQUcsRUFBRSxDQUFDLEdBQUcsSUFBVyxFQUFFLEVBQUUsQ0FBQyxJQUFJO0NBQ2hDLENBQUE7QUFpQkQsR0FBRyxDQUFBLGdDQUFnQyxDQUFBO0FBQ25DLE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBdUIsVUFBVSxLQUFLO0lBQ3pELE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFtQyxDQUFDLENBQUM7SUFFOUQsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQzlCLElBQUksU0FBUyxDQUFDLE9BQU8sRUFBRTtZQUNuQixNQUFNLEVBQUMsWUFBWSxFQUFFLGNBQWMsRUFBQyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUM7WUFDekQsTUFBTSxvQkFBb0IsR0FBRyxjQUFjLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLGNBQWMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFMUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFO2dCQUN2QixNQUFNLGlCQUFpQixDQUFBO2FBQzFCO1lBRUQsTUFBTSxXQUFXLEdBQUcsTUFBTSxZQUFZLENBQUMsV0FBVyxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFFekUsSUFBSSxXQUFXLENBQUMsS0FBSyxFQUFFO2dCQUNuQixNQUFNLGNBQWMsR0FBNkQsSUFBSSxXQUFXLENBQUMsZUFBZSxFQUFFLEVBQUMsTUFBTSxFQUFFLEVBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxLQUFLLEVBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztnQkFDdkssSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQTthQUNyQztZQUVELElBQUksV0FBVyxDQUFDLEtBQUssRUFBRTtnQkFDbkIsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUE7Z0JBQy9CLE1BQU0sV0FBVyxDQUFDLEtBQUssQ0FBQzthQUMzQjtTQUNKO0lBQ0wsQ0FBQyxFQUNDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDUCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDWixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxFQUFDLEdBQUcsSUFBSSxFQUFDLEVBQUMsQ0FBQztTQUN0RDtJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRVAsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ2pDLE1BQU0sWUFBWSxHQUFHLE1BQU0sTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDdkQsTUFBTSxNQUFNLEdBQUcsTUFBTSxZQUFZLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUVwRSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsTUFBTSx1QkFBdUIsQ0FBQztTQUNqQztRQUVELE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUV6QyxTQUFTLENBQUMsT0FBTyxHQUFHO1lBQ2hCLFlBQVksRUFBRSxNQUFNO1lBQ3BCLGNBQWMsRUFBRSxjQUFjO1lBQzlCLFNBQVMsRUFBRSxTQUFTO1NBQ3ZCLENBQUM7UUFFRixJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUM7SUFDbkMsQ0FBQyxDQUFDLENBQUM7SUFFSCxTQUFTLENBQUMsR0FBRyxFQUFFO1FBQ1gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUU7WUFDcEIsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ2xCO0lBQ0wsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ1gsQ0FBQyxDQUFBO0FBRUQsY0FBYyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLFVBQVUsRUFBRTtJQUN2RCxZQUFZLEVBQUUsS0FBSztJQUNuQixXQUFXLEVBQUUsYUFBYSxDQUFDLFFBQVE7SUFDbkMsa0JBQWtCLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBUTtDQUNuRCxDQUFDLENBQUMsQ0FBQSJ9