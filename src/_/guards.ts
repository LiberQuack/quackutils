import {Falsy} from "utility-types";

export function isNotFalsy<T>(data: T): data is Exclude<T, Falsy> {
    return Boolean(data)
}