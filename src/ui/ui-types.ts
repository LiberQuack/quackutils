import {Assign} from "utility-types";

type TypedCustomEvent<N extends string, T> = Assign<CustomEvent, { type: N, detail?: T }>;

export function CreateCustomEvent<N extends string, T>(type: N, eventInit?: CustomEventInit<T>): TypedCustomEvent<N, T>  {
    return new window.CustomEvent(type, eventInit) as TypedCustomEvent<N, T>;
}

type CustomEvents = { [x:string]: any };
type EventDispatcher<E extends CustomEvents = {}> = { dispatchEvent<K extends Extract<keyof E, string>>(event: TypedCustomEvent<K, E[K]>): boolean};
export type CustomElementDefinition<P extends object= {}, E extends CustomEvents = {}> = (this: CustomElement<P, E>, props: P) => any
export type CustomElement<P extends object = {}, E extends CustomEvents = {}> = Assign<HTMLElement, P & EventDispatcher<E>>;

export type ControlProps<P extends object = {}> = Assign<{ name: string, label: any, value?: any, errMsg?: any }, P>;
export type CustomEventListener<K extends keyof E, E extends CustomEvents> = (e: TypedCustomEvent<Extract<keyof K, string>, E[K]>) => void

declare global {
    interface Window {
        addEventListener<N extends CustomEvents, K extends Extract<keyof N, string>>(type: K, listener: CustomEventListener<K,N>, options?: boolean | AddEventListenerOptions): void;
    }
}
