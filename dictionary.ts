import {Dictionary} from "./types";

export function listToDictionary<T>(list: T[], key: keyof T): Dictionary<T> {
    return list.reduce((acc, item) => {
        return {...acc, [item[key] as any]: item}
    }, {});
}

export function dictionaryToList<T>(dict: Dictionary<T>): T[] {
    return Object.keys(dict).map(key => dict[key]!);
}

export function listToDictionaryAcc<T>(list: T[], key: keyof T): Dictionary<T[]> {
    let acc = {} as any;

    for (let item of list) {
        let previousValue = acc[item[key] as any] as T[] | undefined
        acc[item[key] as any] = previousValue ? [...previousValue, item] : [item]
    }

    return acc;
}

export function dictionaryAcc<T,Y>(dict: Dictionary<T>, acc: Y, reducer: (acc:Y, item:T) => Y): Y {
    const result = Object.keys(dict).reduce((reducAcc, key) => {
        return reducer(reducAcc, dict[key]!);
    }, acc);
    return result;
}