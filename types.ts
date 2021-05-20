export type Dictionary<T> = {
    [x: string]: T;
};

export type UnPartial<T> = T extends Partial<infer U> ? U : never