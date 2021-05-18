import {ReactiveController, ReactiveControllerHost} from "lit";
import * as s from "superstruct";
import objectPath from "object-path"
import {Dictionary} from "./dictionary";

export type FormControllerOpts = Partial<{
    onSubmit: (valid: boolean) => void;
    debug: boolean;
}>

type ErrorDictionary = Dictionary<s.Failure>;

type FieldStatus = {
    pristine: boolean,
    dirty: boolean,
};

class FormController implements ReactiveController {

    data = {} as { [x: string]: any | undefined; };
    errors = {} as ErrorDictionary;
    submitted = false;

    status = new Proxy({} as Dictionary<FieldStatus>, {
        get(target: Dictionary<FieldStatus>, p: string | symbol, receiver: any): FieldStatus {
            const status = target[p as any];
            return status ? status : {dirty: false, pristine: true}
        },
        set(target: Dictionary<FieldStatus>, p: string | symbol, value: any, receiver: any): boolean {
            target[p as any] = value;
            return true;
        }
    });

    private host: ReactiveControllerHost;
    private opts: FormControllerOpts;
    private schema?: s.Struct;

    constructor(host: ReactiveControllerHost, schema: s.Struct<any>, opts?: FormControllerOpts) {
        this.host = host;
        this.schema = schema;
        this.opts = opts || {};
        host.addController(this);
    }

    private get hasErrors(): boolean {
        this.validate();
        return Object.keys(this.errors).length > 0
    }

    setData = (nextData: { [x: string]: any }) => {
        this.data = nextData;
        this.validate();
        this.host.requestUpdate();
    }

    listen = (e: Event) => {
        const elm = e.target as HTMLInputElement | null;

        if (elm) {
            const nextValue = elm.value;
            const nextData = {...this.data};
            objectPath.set(nextData, elm.name, nextValue);
            this.status[elm.name] = {pristine: false, dirty: [undefined, null, false, ""].indexOf(elm.value) > -1};
            this.setData(nextData);

            if (this.opts.debug) {
                console.groupCollapsed("FormController", nextValue);
                console.log("host", this);
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
        this.opts.onSubmit?.(!this.hasErrors);
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