import StripeTypes from "@stripe/stripe-js";
import {CustomElement, CustomEventType} from "../../ui-types";
import {useEffect, useRef, useState} from "haunted/lib/core";
import {Nullable} from "../../../../types";
import {useAwait} from "../../util/hooks/use-await";
import {dictionaryTransformEntries, listToDictionary} from "../../../../dictionary";
import {CardElement} from "../../../../src/ui/components/card";
import {ControlText} from "../../../../src/ui/components/controls/control-text";
import {fmt} from "../../../../src/ui/util/formatters";
import {ButtonElement} from "../../../../src/ui/components/button-element";
import {switcher} from "../../util/switch";

export type StripeCardformEvents = {
    onformready: (e: CustomEvent) => void,
    onelementready: (e: CustomEvent<{ elementType: string }>) => void,
    onsendcardtoken: (e: CustomEvent<{ token: StripeTypes.Token }>) => void,
};

export const StripeCardform: CustomElement<{ forceLoading?: boolean, btnContent?: any, stripePublicKey: string }, Partial<StripeCardformEvents>> = function (props) {

    const [formReady, setFormReady] = useState(false);

    const stripeRef = useRef(null as Nullable<{
        stripeClient: StripeTypes.Stripe,
        stripeElements: StripeTypes.StripeElements,
        stripeElementInstances: StripeTypes.StripeElementBase[],
        html: {
            cardNumber: HTMLElement,
            cardExpiry: HTMLElement,
            cardCvc: HTMLElement,
        }
    }>);

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

        const htmlDict = dictionaryTransformEntries(listToDictionary(stripeElms, "name"), (key, value) => {
            value.stripeElm.mount(value.container);
            return value.container;
        });

        stripeRef.current = {
            stripeClient: stripe,
            stripeElements: stripeElements,
            stripeElementInstances: stripeElms.map(it => it.stripeElm),
            html: htmlDict as any
        };
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

    return <>
        <div style$="position: relative;">
            <ControlText name="cardNumber" label="Número do Cartão" inputElm={stripeRef.current?.html?.cardNumber}/>

            <div style$="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 1.5em">
                <ControlText name="cardExpiry" label="Expiração" style$="flex-grow: 1;" inputElm={stripeRef.current?.html?.cardExpiry}/>
                <ControlText name="cardCvc" label="CVC" style$="flex-grow: 1;" inputElm={stripeRef.current?.html?.cardCvc}/>
            </div>

            {!onSubmit.err ? undefined : (
                <div class$="t-danger" style$="margin-bottom: 1.5em">
                    {fmt.err(onSubmit.err)}
                </div>
            )}

            <ButtonElement onclick={onSubmit.run} content={(
                <div>
                    {switcher(
                        {case: onSubmit.loading || props.forceLoading, then: "Cadastrando..."},
                        {case: true, then: props.btnContent ?? "Cadastrar"},
                    )}
                </div>
            )}/>

        </div>
    </>;
}