/**
 * Usage example:
 * ```
 *     const [fooGlue, fooStatus] = useGlue(fooState)
 * ```
 */
export const generateGlue = (useState, useEffect) => function useGlue(externalState, logId) {
    const initialState = [externalState.getState(), { error: undefined, isUpdating: false }];
    const [state, setState] = useState(initialState);
    useEffect(() => {
        if (logId) {
            console.log(`${logId}:`, `State ${externalState.id} is being glued`);
        }
        const subscription = () => {
            const selection = externalState.getState();
            const selectorResult = [selection, { error: externalState.error, isUpdating: externalState.isUpdating }];
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
    return state;
};
//# sourceMappingURL=state-glue-generator.js.map