import {useState} from "haunted/lib/core";
import {inlineErr} from "../../../inline-error";

export function useAwait<T extends ((...args: any[]) => Promise<any>)>(cb: T): {run: T, loading: boolean, err: undefined | Error} {
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(undefined as undefined | Error);

    const run = (async (...args) => {
        setLoading(true);
        const [result, err] = await inlineErr(cb(...args));
        setErr(err);
        setLoading(false);
        return result;
    }) as T;

    return {
        loading,
        run,
        err
    }
}