export type ArrayType<T> = T extends Array<infer U> ? U : never

export type Narrow<T, W extends Partial<{[K in keyof T]: T[K]}>> =
    T extends object ? Omit<T, keyof W> & W :
    Extract<T, W>