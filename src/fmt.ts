export const fmt = {
    err: (err?: Error) => {
        return err?.message || err
    }
}