export async function inlineErr<T = any>(arg: Promise<T> | T, preventLog?: boolean): Promise<[T | undefined, Error?]> {
    try {
        return [await arg];
    } catch (err) {
        if (!preventLog) {
            console.error(err);
        }
        return [undefined, err as Error];
    }
}