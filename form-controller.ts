import {ReactiveController, ReactiveControllerHost} from "lit";
import * as s from "superstruct";
import objectPath from "object-path"
import {Dictionary} from "./types";
import * as utilityType from "utility-types";
import {debug} from "../bullapp-api/src/utils/log";
import * as util from "util";

export type FormControllerOpts<T = any> = Partial<{
    initialRawData: Partial<T>,
    onSubmit: (isFormValid: boolean, form: FormController<T>) => undefined | Promise<void>
    debug: boolean;
}>

type ErrorDictionary = Dictionary<s.Failure>;

type FieldStatus = {
    pristine: boolean,
    dirty: boolean,
};

function buildStatusProxy() {
    return new Proxy({} as Dictionary<FieldStatus>, {
        get(target: Dictionary<FieldStatus>, p: string | symbol, receiver: any): FieldStatus {
            const status = target[p as any];
            return status ? status : {dirty: false, pristine: true}
        },
        set(target: Dictionary<FieldStatus>, p: string | symbol, value: any, receiver: any): boolean {
            target[p as any] = value;
            return true;
        }
    })
}

//TODO: It would be interesting if we had an api like useAwait
// const callback = useAwait(() => throw "Error message")
// <span>{callback.err}</span>
export class FormController<T extends Dictionary<any>> implements ReactiveController {

    data?: T
    rawData: Partial<T>;

    errors = {} as ErrorDictionary;
    submitAttempted = false;
    isSubmitting = false

    status = buildStatusProxy();

    private host: ReactiveControllerHost;
    private opts: FormControllerOpts;
    private schema?: s.Struct<T>;

    constructor(host: ReactiveControllerHost, schema?: s.Struct<T>, opts?: FormControllerOpts) {
        this.host = host;
        this.schema = schema;
        this.opts = opts || {};
        this.rawData = this.opts.initialRawData ?? {};
        host.addController(this);
    }

    private get hasErrors(): boolean {
        this.validate();
        return Object.keys(this.errors).length > 0
    }

    reset = () => {
        this.errors = {};
        this.status = buildStatusProxy();
        this.rawData = {};
        this.host.requestUpdate();

        if (this.opts.debug) {
            console.groupCollapsed("FormController:", "Reset called");
            console.log("controller", this);
            console.groupEnd();
        }
    }

    setSchema(schema?: s.Struct<T>) {
        if (schema) {
            this.schema = schema;
            this.validate();
        } else {
            this.errors = {}
        }

        this.host.requestUpdate();
    }

    setData = (nextData: Partial<T>) => {
        this.rawData = nextData;
        this.validate();
        this.host.requestUpdate();
    }

    //TODO: Maybe listen could have param name:string
    fieldListener = (e: Event) => {
        const elm = e.target as HTMLInputElement | null;

        if (elm) {
            let nextValue = this.castValue(elm);
            const nextData = {...this.rawData};
            objectPath.set(nextData as any, elm.name, nextValue);
            this.status[elm.name] = {pristine: false, dirty: [undefined, null, false, ""].indexOf(elm.value) > -1};
            this.setData(nextData);

            if (this.opts.debug) {
                console.groupCollapsed("FormController:", nextValue);
                console.log("controller", this);
                console.log("host", this.host);
                console.log("listenerAttachedOn", e.currentTarget);
                console.log("eventOrigin", e.target);
                console.log("controllerData", this.rawData);
                console.groupEnd()
            }
        }
    }

    private castValue(elm: HTMLInputElement) {
        let type = elm.type;

        switch (type) {
            case "number":
                return elm.value.length && Number(elm.value)
            case "checkbox":
                return elm.checked;
            default:
                return elm.value;
        }
    }

    submitListener = async (e: Event) => {
        e.preventDefault();
        this.submitAttempted = true;
        this.isSubmitting = Boolean(this.opts.onSubmit);
        this.host.requestUpdate();

        this.validate();
        const isValid = !this.hasErrors;

        if (this.opts.debug) {
            console.groupCollapsed("FormController:", "Form submission triggered");
            console.log("controller", this);
            console.groupEnd();
        }

        this.opts.onSubmit && this.opts.onSubmit(isValid, this)?.finally(() => {
            this.isSubmitting = false;
            this.host.requestUpdate();
        })
    }

    hostDisconnected(): void {
        //TODO: Implement it;
        console.warn("Need to implement it");
    }

    private validate() {
        const {rawData} = this

        if (this.schema) {
            const [error, data] = s.validate(rawData, this.schema);

            if (error) {
                const errors = {} as ErrorDictionary;
                for (let failure of error.failures()) {
                    errors[failure.path.join(".")] = failure;
                }
                this.errors = errors;
                this.data = undefined
            } else {
                this.errors = {};
                this.data = data;
            }
        }
    }

}