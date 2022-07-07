//Original src -> https://github.com/parse-community/Parse-SDK-JS/blob/master/src/decode.js
export function decode<T = any>(value: T): T {
    if (value === null || typeof value !== 'object' || value instanceof Date) {
        return value;
    }

    if (Array.isArray(value)) {
        const dup = [] as any[];
        value.forEach((v, i) => {
            dup[i] = decode(v);
        });
        return dup as any;
    }

    if ((value as any).__type === 'Date') {
        return new Date((value as any).iso) as any;
    }

    const copy = {} as Record<any, any>;

    for (const k in value) {
        copy[k === "objectId" ? "_id" : k] = decode(value[k]);
    }

    return copy;
}