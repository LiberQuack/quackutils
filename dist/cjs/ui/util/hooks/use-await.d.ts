import { Undefinable } from "../../../_/types";
declare type useAwaitReturnType<T extends ((...args: any[]) => Promise<R>), R> = {
    run: T;
    result: Undefinable<R>;
    loading: boolean;
    err: undefined | Error;
};
declare type useAwaitType<T extends ((...args: any[]) => Promise<R>), R> = useAwaitReturnType<T, R>;
/**
 *
 * @param job Async function to be executed
 * @param cb Callback executed everytime the stats change
 */
export declare function useAwait<R, T extends ((...args: any[]) => Promise<R>)>(job: T, cb?: (stats: useAwaitReturnType<T, R>) => void): useAwaitType<T, R>;
export {};
