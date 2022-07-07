export declare function inlineErr<T = any>(arg: Promise<T> | T, preventLog?: boolean): Promise<[T | undefined, Error?]>;
