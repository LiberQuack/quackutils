import { Assign } from "utility-types";
declare global {
    type CustomEventListener = (e: CustomEvent) => void;
    interface Window {
        addEventListener(type: string, listener: CustomEventListener, options?: boolean | AddEventListenerOptions): void;
    }
}
interface CustomElementProps {
    id$?: string;
    class$?: HTMLElement["className"];
    style$?: string;
}
declare type Events = {
    [x: string]: (e: CustomEvent) => void;
};
declare type This<P extends object = {}> = Assign<HTMLElement, P>;
export declare type Props<P extends object = {}, E extends Events = {}> = Assign<Partial<HTMLElement & CustomElementProps>, P & E>;
export declare type ControlProps<P extends object = {}> = Assign<{
    name: string;
    label: any;
    value?: any;
    errMsg?: any;
}, P>;
export declare type CustomElementDefinition<P extends object = {}, E extends Events = {}> = (this: This<P>, props: Props<P, E>) => any;
export declare type CustomElement<P extends object = {}> = Assign<HTMLElement, P>;
export declare type CustomControlElement<P extends object = {}, E extends Events = {}> = (this: This<ControlProps<P>>, props: Props<ControlProps<P>, E>) => any;
export declare type CustomEventType<T extends Events, K extends keyof T> = (Parameters<T[K]>[0]);
export {};
