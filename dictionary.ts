/// <reference lib="ES2020"/>

import {Dictionary} from "./types";
import {UnionToIntersection} from "utility-types";
import {AugmentedRequired} from "utility-types/dist/mapped-types";

export function listToDictionary<T>(list: T[], key: keyof T): Dictionary<T> {
    return list.reduce((acc, item) => {
        return {...acc, [item[key] as any]: item}
    }, {});
}

export function dictionaryToList<T>(dict: Dictionary<T>): T[] {
    return Object.keys(dict).map(key => dict[key]!);
}

export function dictionaryForEach<T>(dict: Dictionary<T>, cb: (entry: T, key: string) => void) {
    Object.keys(dict).forEach(key => {
        cb(dict[key]!, key);
    })
}

/**
 * Returns a list for each entry
 *
 * @example
 *     dictionaryMap({a: 1, b: 2}, (value, key) => value + key)
 *     // ["a1", "b2"]
 *
 * @param dict
 * @param cb
 */
export function dictionaryMapList<T, R>(dict: Dictionary<T>, cb: (key: string, value: T, index: number) => R) {
    return Object.keys(dict).map((key, index) => {
        return cb(key, dict[key]!, index);
    })
}

/**
 * Generates a new dictionary from the original
 *
 * @example
 *     dictionaryMap({a: 1, b: 2}, (key, value) => [value, key])
 *     // {1: "a", 2: "b"}
 *
 * @param dict
 * @param cb
 */
export function dictionaryMap<T, R = any>(dict: Dictionary<T>, cb: (key: string, value: T, index: number) => [string, R]): Dictionary<R> {
    const entries = dictionaryMapList(dict, cb)
    return Object.fromEntries(entries)
}

/**
 * Create a new object from dictionary, where values as transformed like
 *
 * @example
 *     dictionaryTransformEntries({a: 1, b: 2}, (k, v) => v * 2)
 *     // {a: 2, b: 4}
 *
 * @param dict
 * @param transformer
 */
//TODO: Should be dictionaryTransformValues
export function dictionaryTransformEntries<T extends object, ER, TT extends AugmentedRequired<T>>(dict: T, transformer: (key: keyof T, value: TT[keyof TT], index: number) => ER): {[P in keyof T]: ER} {
    const keys = Object.keys(dict) as (keyof T)[];

    return keys.reduce((acc, key: keyof T, i) => {
        const entry = dict[key];
        acc[key] = transformer(key, entry as any, i) as ER;
        return acc;
    }, {} as { [P in keyof T]: ER });
}

/**
 * Reduce values of the dictionary
 *
 * @example key
 *     let list = [{gender: M, id: 1}, {gender: M, id: 2}, {gender: F, id: 3}]
 *     listToDictionaryAcc(list, "gender")
 *
 *     // Result:
 *     // {
 *     //     M: [
 *     //            {gender: M, id: 1},
 *     //            {gender: M, id: 2}
 *     //         ],
 *     //     F: [
 *     //            {gender: F, id: 3}
 *     //        ]
 *     // }
 *
 * @param list
 * @param key
 */
export function listToDictionaryAcc<T>(list: T[], key: keyof T): Dictionary<T[]> {
    let acc = {} as any;

    for (let item of list) {
        let previousValue = acc[item[key] as any] as T[] | undefined
        acc[item[key] as any] = previousValue ? [...previousValue, item] : [item]
    }

    return acc;
}

/**
 * Reduce values of the dictionary
 *
 *
 * @example predicate
 *     let list = [{gender: M, id: 1}, {gender: M, id: 2}, {gender: F, id: 3}]
 *     let predicate = (item) => item.id % 2
 *     listToDictionaryPartitioner(["even","odd"], list, predicate)
 *
 *     // Result:
 *     // {
 *     //     "even": [
 *     //            {gender: M, id: 1},
 *     //            {gender: M, id: 2}
 *     //         ],
 *     //     "odd": [
 *     //            {gender: F, id: 3}
 *     //        ]
 *     // }
 *
 * @param list
 * @param partitions
 * @param predicate
 */
export function listToDictionaryPartitioner<T, R extends string>(list: T[], partitions: R[], predicate: ((item: T) => number)): Record<R | "undefined", T[]> {
    let acc = partitions.reduce((a, b) => {
        a[b] = [];
        return a;
    }, {} as Record<R | "undefined", T[]>)

    for (let item of list) {
        let group = partitions[predicate(item)] as R ?? "undefined"
        let previousValue = acc[group] as T[] | undefined
        acc[group] = previousValue ? [...previousValue, item] : [item]
    }

    return acc;
}


/**
 * Accumulate dictionary list, resulting a new dictionary of lists
 * @example
 *     let list = [
 *         {a: 5},
 *         {a: 5},
 *         {b: 10},
 *     ]

 *     listToDictionaryMergedKeys(list)
 *     // {a: [5,5], b:[10]}
 *
 * @param list
 */
export function listToDictionaryMergedKeys<T, U = UnionToIntersection<T>, Result = {[P in keyof U]: U[keyof U][]}>(list: T[]): Result {
    let acc = {} as Result

    for (let obj of list) {
        const properties = Object.keys(obj);

        properties.forEach((property) => {
            const keyAcc = (acc[property as keyof Result] || []) as U[keyof U][];
            const value = obj[property as keyof T];
            const nextAcc = [...keyAcc, value] as unknown as Result[keyof Result];
            acc[property as keyof Result] = nextAcc;
        });
    }

    return acc;
}

/**
 * Reduce dictionary values
 * @example
 *     let dict = {a: 10, b: 20}
 *     dictionaryAcc(dict, 0, (acc, value: number, key: string) => acc + value)
 *     //30
 *
 * @param dict
 * @param acc
 * @param reducer
 */
export function dictionaryAcc<T,Y>(dict: Dictionary<T>, acc: Y, reducer: (acc:Y, item:T, key: string) => Y): Y {
    const result = Object.keys(dict).reduce((reducAcc, key) => {
        return reducer(reducAcc, dict[key]!, key);
    }, acc);
    return result;
}