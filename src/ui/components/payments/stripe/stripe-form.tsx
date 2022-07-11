import "./stripe-context"

import StripeTypes from "@stripe/stripe-js";
import {CustomElement, CustomEventType} from "../../../ui-types";
import {useEffect, useLayoutEffect, useRef, useState} from "haunted/lib/core";
import {Nullable} from "../../../../_/types";
import {useAwait} from "../../../util/hooks/use-await";
import {dictionaryMap, listToDictionary} from "../../../../_/dictionary";
import {component} from "haunted";
import {html} from "lit";
import {switcher} from "../../../util/switch";
import {StripeRef} from "./types";
import {StripeContext} from "./stripe-context";
import {css} from "../../../util/css";

const fmt = {
    err: (...args: any[]) => args
}

export type StripeCardformEvents = {
    onformready: (e: CustomEvent) => void,
    onelementready: (e: CustomEvent<{ elementType: string }>) => void,
    onsendcardtoken: (e: CustomEvent<{ token: StripeTypes.Token }>) => void,
};

export type StripeCardFormType = CustomElement<{ forceLoading?: boolean, btnContent?: any, stripePublicKey: string, value: StripeRef}, Partial<StripeCardformEvents>>;

export const StripeForm: StripeCardFormType = function (props) {

    useLayoutEffect(() => {
        css`
            stripe-form { display: block }
        `
    }, [])

    const [formReady, setFormReady] = useState(false);

    const stripeRef = useRef(null as Nullable<StripeRef>);

    const stripeCb = useAwait(async () => {
        const stripeImport = await import('@stripe/stripe-js');
        const stripe = await stripeImport.loadStripe(props.stripePublicKey);

        if (!stripe) {
            throw "Could not load stripe";
        }

        const stripeElements = stripe.elements();

        const elementsConfig = [
            {name: "cardNumber"},
            {name: "cardExpiry"},
            {name: "cardCvc", opts: {placeholder: "000"}}
        ];

        let readyCount = 0;
        const stripeElms = elementsConfig.map(cfg => {
            const stripeElm = stripeElements.create(cfg.name as any, cfg.opts);
            const container = document.createElement("div");

            stripeElm.mount(container);

            stripeElm.on("ready", (e) => {
                readyCount += 1;
                let onElementReadyEvent: CustomEventType<StripeCardformEvents, "onelementready"> = new CustomEvent("elementready", {detail: e, bubbles: true});
                this.dispatchEvent(onElementReadyEvent);

                if (readyCount === elementsConfig.length) {
                    let onFormReady: CustomEventType<StripeCardformEvents, "onformready"> = new CustomEvent("formready", {bubbles: true});
                    setFormReady(true)
                    this.dispatchEvent(onFormReady);
                }
            })

            return {...cfg, stripeElm, container}
        })

        const htmlDict = dictionaryMap(listToDictionary(stripeElms, "name"), (key, value) => {
            value.stripeElm.mount(value.container);
            return [key, value.container];
        });

        stripeRef.current = {
            stripeClient: stripe,
            stripeElements: stripeElements,
            stripeElementInstances: stripeElms.map(it => it.stripeElm),
            html: htmlDict as any
        };

        this.value = stripeRef.current;
    });

    useEffect(() => {
        stripeCb.run();
    }, []);

    const onSubmit = useAwait(async () => {
            if (formReady && stripeRef.current) {
                const {stripeClient, stripeElements} = stripeRef.current;
                const tokenResult = await stripeClient?.createToken(stripeElements.getElement("cardNumber")!);

                if (tokenResult.token) {
                    const sendTokenEvent: CustomEventType<StripeCardformEvents, "onsendcardtoken"> = new CustomEvent("sendcardtoken", {detail: {token: tokenResult.token}, bubbles: true});
                    this.dispatchEvent(sendTokenEvent)
                }

                if (tokenResult.error) {
                    console.warn(tokenResult.error)
                    throw tokenResult.error;
                }
            }
        }
    );

    return html`
        <div style="position: relative;">

                ${!onSubmit.err ? undefined : html`
                    <div class="t-danger" style="margin-bottom: 1.5em">
                        ${fmt.err(onSubmit.err)}
                    </div>
                `}
    
                <ButtonElement onclick=${onSubmit.run} .content=${(
                    <div>
                        {switcher(
                            {case: onSubmit.loading || props.forceLoading, then: "Cadastrando..."},
                            {case: true, then: props.btnContent ?? "Cadastrar"},
                        )}
                    </div>
                )}/>

        </div>
    `
}

let potato = component(StripeForm, {useShadowDOM: false, baseElement: StripeContext.Provider});
customElements.define("stripe-form", potato)

declare global {
    interface HTMLElementTagNameMap {
        'stripe-form': StripeCardFormType
    }
}