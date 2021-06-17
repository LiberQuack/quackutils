export type Dictionary<T> = {
    [x: string]: T;
};

export function listToDictionary<T>(list: T[], key: keyof T): Dictionary<T> {
    return list.reduce((acc, item) => {
        return {...acc, [item[key] as any]: item}
    }, {});
}

export function dictionaryToList<T>(dict: Dictionary<T>): T[] {
    return Object.keys(dict).map(key => dict[key]);
}

export function dictionaryEach<T,Y>(dict: Dictionary<T>, acc: Y, reducer: (acc:Y, item:T) => Y): Y {
    const result = Object.keys(dict).reduce((reducAcc, key) => {
        return reducer(reducAcc, dict[key]);
    }, acc);
    return result;
}