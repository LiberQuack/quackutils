import {Assign} from "utility-types";
import {Narrow} from "../utils.js";

type TypedCustomEvent<N extends string, T> = Narrow<CustomEvent, { type: N, detail?: T }>;

export function CreateCustomEvent<N extends string, T>(type: N, eventInit?: CustomEventInit<T>): TypedCustomEvent<N, T>  {
    return new window.CustomEvent(type, eventInit) as TypedCustomEvent<N, T>;
}

type CustomEvents = { [x:string]: any };

type EventDispatcher<E extends CustomEvents = {}> = { dispatchEvent<K extends Extract<keyof E, string>>(event: TypedCustomEvent<K, E[K]>): boolean};

export type EventListener<E extends CustomEvents = {}> = {
    addEventListener<K extends Extract<keyof E, string>>(type: K, listener: (e: Narrow<CustomEvent, { detail: E[K] }>) => void, options?: boolean | AddEventListenerOptions): void
}

export type CustomElement<P extends object = {}, E extends CustomEvents = {}> = Assign<HTMLElement, P & EventDispatcher<E>>;
export type CustomElementDefinition<P extends object= {}, E extends CustomEvents = {}> = (this: CustomElement<P, E>, props: P) => any

export type ControlProps<P extends object = {}> = Assign<{ name: string, label: any, value?: any, errMsg?: any }, P>;