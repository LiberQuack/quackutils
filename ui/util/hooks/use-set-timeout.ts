import {useEffect, useState} from "haunted/lib/core";

export const useSetTimeout = (...args: { value: any, timeout: number }[]) => {
    const [isRunning, setIsRunning] = useState(false);
    const [value, setValue] = useState(undefined as any);

    const run = () => {
        setIsRunning(true);

        let timeoutAcc = 0;

        for (let arg of args) {
            setTimeout(() => setValue(arg.value), timeoutAcc);
            timeoutAcc += arg.timeout
        }

        setTimeout(() => {
            setValue(undefined);
            setIsRunning(false);
        }, timeoutAcc)
    };

    return {
        run,
        value,
        isRunning
    }
}