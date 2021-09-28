//Original src -> https://github.com/parse-community/Parse-SDK-JS/blob/master/src/encode.js
export function encode(value: any): any {
    if (Object.prototype.toString.call(value) === '[object Date]') {
        if (isNaN(value)) {
            throw new Error('Tried to encode an invalid date.');
        }
        return { __type: 'Date', iso: (value as any).toJSON() };
    }

    if (
        Object.prototype.toString.call(value) === '[object RegExp]' &&
        typeof value.source === 'string'
    ) {
        return value.source;
    }

    if (Array.isArray(value)) {
        return value.map(v => {
            return encode(v);
        });
    }

    if (value && typeof value === 'object') {
        const output = {} as Record<any, any>;
        for (const k in value) {
            output[k] = encode(value[k]);
        }
        return output;
    }

    return value;
}