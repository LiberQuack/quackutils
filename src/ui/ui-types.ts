import {Assign} from "utility-types";

interface CustomElementProps {
    id$?: string;
    class$?: HTMLElement["className"];
    style$?: string;
}

type CustomEvents = {[x:string]: (e: CustomEvent) => void}

type This<P extends object = {}> = Assign<HTMLElement, P>;
export type Props<P extends object = {}, E extends CustomEvents = {}> = Assign<Partial<HTMLElement & CustomElementProps>, P & E>;
export type ControlProps<P extends object = {}> = Assign<{ name: string, label: any, value?: any, errMsg?: any }, P>;

export type CustomElementDefinition<P extends object= {}, E extends CustomEvents = {}> = (this: This<P>, props: Props<P, E>) => any
export type CustomElement<P extends object = {}> = Assign<HTMLElement, P>
export type CustomControlElement<P extends object= {}, E extends CustomEvents = {}> = (this: This<ControlProps<P>>, props: Props<ControlProps<P>, E>) => any

export type CustomEventType<T extends CustomEvents, K extends keyof T> = (Parameters<T[K]>[0])
export type CustomEventListener<N extends CustomEvents, K extends keyof N> = (e: CustomEventType<N, K>) => void

declare global {
    type CustomEventListener = (e: CustomEvent) => void;

    interface Window {
        addEventListener<N extends CustomEvents, K extends keyof N>(type: K, listener: N[K], options?: boolean | AddEventListenerOptions): void;
    }
}
