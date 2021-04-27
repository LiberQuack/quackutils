export async function inlineErr<T = any>(arg: Promise<T> | T): Promise<[T | undefined, Error?]> {
    try {
        return [await arg];
    } catch (err) {
        console.error(err);
        return [undefined, err];
    }
}