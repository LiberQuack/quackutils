import {Dictionary} from "./types";
import {promises} from "dns";
import {Unionize, UnionToIntersection} from "utility-types";
import {AugmentedRequired} from "utility-types/dist/mapped-types";

export function listToDictionary<T>(list: T[], key: keyof T): Dictionary<T> {
    return list.reduce((acc, item) => {
        return {...acc, [item[key] as any]: item}
    }, {});
}

export function dictionaryToList<T>(dict: Dictionary<T>): T[] {
    return Object.keys(dict).map(key => dict[key]!);
}

export function dictionaryForEach<T>(dict: Dictionary<T>, cb: (entry: T) => void) {
    Object.keys(dict).forEach(key => {
        cb(dict[key]);
    })
}

export function dictionaryTransformEntries<T extends object, ER, TT extends AugmentedRequired<T>>(dict: T, transformer: (item: TT[keyof TT]) => ER): {[P in keyof T]: ER} {
    const keys = Object.keys(dict) as (keyof T)[];

    return keys.reduce((acc, key: keyof T) => {
        const entry = dict[key];
        acc[key] = transformer(entry as any) as ER;
        return acc;
    }, {} as { [P in keyof T]: ER });
}

/**
 * @example
 *     let list = [{gender: M, id: 1}, {gender: M, id: 2}, {gender: F, id: 3}]
 *     listToDictionaryAcc(list, "gender")
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
 * @example
 *     let list = [
 *         {a: 5},
 *         {a: 5},
 *         {b: 10},
 *     ]

 *     listToDictionaryMergedKeys(list) // {a: [5,5], b:[10]}
 *
 * @param list
 */
export function listToDictionaryMergedKeys<T, U = UnionToIntersection<T>, Result = Partial<{[P in keyof U]: U[keyof U][]}>>(list: T[]): Result {
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
 * @example
 *
 *     let dict = {a: 10, b: 20}
 *     dictionaryAcc(dict, 0, (acc, value: number) => acc + value) //30
 *
 * @param dict
 * @param acc
 * @param reducer
 */
export function dictionaryAcc<T,Y>(dict: Dictionary<T>, acc: Y, reducer: (acc:Y, item:T) => Y): Y {
    const result = Object.keys(dict).reduce((reducAcc, key) => {
        return reducer(reducAcc, dict[key]!);
    }, acc);
    return result;
}