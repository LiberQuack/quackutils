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