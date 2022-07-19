import { CustomElement, CustomElementDefinition } from "../../ui-types";
declare type IncrementNumberType = {
    from: string;
    to: string;
    bezier: string;
    secondsDuration: string;
    maxDecimals: string;
    minDecimals: string;
    once: boolean | string;
};
export declare const IncrementNumber: CustomElementDefinition<IncrementNumberType>;
declare global {
    interface HTMLElementTagNameMap {
        "increment-number": CustomElement<IncrementNumberType>;
    }
}
export {};
