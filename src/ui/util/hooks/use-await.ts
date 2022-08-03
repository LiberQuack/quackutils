import {useState} from "haunted/lib/core.js";
import {inlineErr} from "../../../app/inline-error.js";
import {Undefinable} from "../../../_/types.js";

type useAwaitReturnType<T extends ((...args: any[]) => Promise<R>), R> = { run: T, result: Undefinable<R>, loading: boolean, err: undefined | Error };
type useAwaitType<T extends ((...args: any[]) => Promise<R>), R> = useAwaitReturnType<T, R>;

/**
 *
 * @param job Async function to be executed
 * @param cb Callback executed everytime the stats change
 */
export function useAwait<R, T extends ((...args: any[]) => Promise<R>)>(job: T, cb?: (stats: useAwaitReturnType<T, R>) => void): useAwaitType<T, R> {
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(undefined as undefined | Error);
    const [result, setResult] = useState(undefined as Undefinable<R>);

    const run = (async (...args) => {
        if (!loading) {
            setLoading(true);
            setErr(undefined as any);
            const [result, err] = await inlineErr(job(...args));
            setErr(err as any);
            setResult(result as any);
            setLoading(false);
            return result;
        }
    }) as T;

    const awaitStats: useAwaitReturnType<T, R> = {
        run,
        loading,
        result: result as Undefinable<R>,
        err
    };

    if (cb) {
        cb(awaitStats);
    }

    return awaitStats;
}