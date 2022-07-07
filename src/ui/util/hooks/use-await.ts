import {useState} from "haunted/lib/core";
import {inlineErr} from "../../../_/inline-error";
import {Undefinable} from "../../../_/types";

export function useAwait<R, T extends ((...args: any[]) => Promise<R>)>(cb: T): {run: T, result: Undefinable<R>, loading: boolean, err: undefined | Error} {
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(undefined as undefined | Error);
    const [result, setResult] = useState(undefined as Undefinable<R>);

    const run = (async (...args) => {
        if (!loading) {
            setLoading(true);
            setErr(undefined);
            const [result, err] = await inlineErr(cb(...args));
            setErr(err);
            setResult(result as any);
            setLoading(false);
            return result;
        }
    }) as T;

    return {
        run,
        loading,
        result: result as Undefinable<R>,
        err
    }
}