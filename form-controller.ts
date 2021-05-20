import {ReactiveController, ReactiveControllerHost} from "lit";
import * as s from "superstruct";
import objectPath from "object-path"
import {Dictionary} from "./types";

export type FormControllerOpts<T> = Partial<{
    onSubmit: (isFormValid: boolean) => void
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

class FormController<T = Dictionary<any>> implements ReactiveController {

    data = {} as Partial<T>;
    errors = {} as ErrorDictionary;
    submitted = false;

    status = buildStatusProxy();

    private host: ReactiveControllerHost;
    private opts: FormControllerOpts<T>;
    private schema?: s.Struct<T>;

    constructor(host: ReactiveControllerHost, schema?: s.Struct<T>, opts?: FormControllerOpts<T>) {
        this.host = host;
        this.schema = schema;
        this.opts = opts || {};
        host.addController(this);
    }

    private get hasErrors(): boolean {
        this.validate();
        return Object.keys(this.errors).length > 0
    }

    reset = () => {
        this.errors = {};
        this.status = buildStatusProxy();
        this.data = {};
        this.host.requestUpdate();

        if (this.opts.debug) {
            console.groupCollapsed("FormController:", "Reset called");
            console.log("controller", this);
            console.groupEnd();
        }
    }

    setData = (nextData: Partial<T>) => {
        this.data = nextData;
        this.validate();
        this.host.requestUpdate();
    }

    listen = (e: Event) => {
        const elm = e.target as HTMLInputElement | null;

        if (elm) {
            const nextValue = elm.value;
            const nextData = {...this.data};
            objectPath.set(nextData as any, elm.name, nextValue);
            this.status[elm.name] = {pristine: false, dirty: [undefined, null, false, ""].indexOf(elm.value) > -1};
            this.setData(nextData);

            if (this.opts.debug) {
                console.groupCollapsed("FormController:", nextValue);
                console.log("controller", this);
                console.log("host", this.host);
                console.log("listenerAttachedOn", e.currentTarget);
                console.log("eventOrigin", e.target);
                console.log("controllerData", this.data);
                console.groupEnd()
            }
        }
    }

    submitListener = (e: Event) => {
        e.preventDefault();
        this.submitted = true;
        this.host.requestUpdate();

        const isValid = !this.hasErrors;

        if (this.opts.debug) {
            console.groupCollapsed("FormController:", "Form submission triggered");
            console.log("controller", this);
            console.groupEnd();
        }

        this.opts.onSubmit?.(isValid);
    }

    hostDisconnected(): void {
        //TODO: Implement it;
        console.warn("Need to implement it");
    }

    private validate() {
        const data = this.data
        if (this.schema) {
            const [error] = s.validate(data, this.schema);
            if (error) {
                const errors = {} as ErrorDictionary;
                for (let failure of error.failures()) {
                    errors[failure.path.join(".")] = failure;
                }
                this.errors = errors;
            } else {
                this.errors = {};
            }
        }
    }

}

export {FormController}