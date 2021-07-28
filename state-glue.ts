import {useEffect, useState} from "haunted";
import {State} from "./state";
import {DeepReadonly} from "utility-types";

type GlueStatus = {
    error: any,
    isUpdating: boolean
}

type GlueResult<T> = [DeepReadonly<T>, DeepReadonly<GlueStatus>];

type ExternalState<T> = State<T>

/**
 * Usage example:
 * ```
 *     const [fooGlue, fooStatus] = useGlue(fooState)
 * ```
 */
export function useGlue<Z>(externalState: State<Z>, logId?: string): GlueResult<Z> {

    const initialState: GlueResult<Z> = [externalState.getState(), {error: undefined, isUpdating: false}];

    const [state, setState] = useState(initialState);

    useEffect(() => {
        if (logId) {
            console.log(`${logId}:`, `State ${externalState.id} is being glued`);
        }

        const subscription = () => {
            const selection = externalState.getState();
            const selectorResult: GlueResult<Z> = [selection, {error: externalState.error, isUpdating: externalState.isUpdating}];

            if (logId) {
                console.log(`${logId}:`, `State ${externalState.id} is updating the element`);
            }

            setState(selectorResult);
            //TODO: Maybe it's good to do a hacky workaround of changing above declaration to: let [state, setState]
            //      and add here bellow: state = selectorResult
            //      It seems that during the element rendering, setState didn't trigger a new render when this callback ran synchronously
        };

        externalState.subscribe(subscription);


        return () => {
            if (logId) {
                console.log(`${logId}:`, `Disconnecting from state ${externalState.id}`);
            }

            externalState.unsubscribe(subscription);
        };
    }, []);

    return state
}