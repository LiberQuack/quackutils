export async function inlineErr(arg, preventLog) {
    try {
        return [await arg];
    }
    catch (err) {
        if (!preventLog) {
            console.error(err);
        }
        return [undefined, err];
    }
}
//# sourceMappingURL=inline-error.js.map