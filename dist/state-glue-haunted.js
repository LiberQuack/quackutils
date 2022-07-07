import {useState as $5LBzN$useState, useEffect as $5LBzN$useEffect} from "haunted/lib/core";

const $185949bd77e5c98e$export$bd89b0cf3447f70 = (useState, useEffect)=>function useGlue(externalState, logId) {
        const initialState = [
            externalState.getState(),
            {
                error: undefined,
                isUpdating: false
            }
        ];
        const [state, setState] = useState(initialState);
        useEffect(()=>{
            if (logId) console.log(`${logId}:`, `State ${externalState.id} is being glued`);
            const subscription = ()=>{
                const selection = externalState.getState();
                const selectorResult = [
                    selection,
                    {
                        error: externalState.error,
                        isUpdating: externalState.isUpdating
                    }
                ];
                if (logId) console.log(`${logId}:`, `State ${externalState.id} is updating the element`);
                setState(selectorResult);
            //TODO: Maybe it's good to do a hacky workaround of changing above declaration to: let [state, setState]
            //      and add here bellow: state = selectorResult
            //      It seems that during the element rendering, setState didn't trigger a new render when this callback ran synchronously
            };
            externalState.subscribe(subscription);
            return ()=>{
                if (logId) console.log(`${logId}:`, `Disconnecting from state ${externalState.id}`);
                externalState.unsubscribe(subscription);
            };
        }, []);
        return state;
    };



const $88aa6d20ef14c2fc$export$eed9a2a671845c2c = (0, $185949bd77e5c98e$export$bd89b0cf3447f70)((0, $5LBzN$useState), (0, $5LBzN$useEffect));




export {$88aa6d20ef14c2fc$export$eed9a2a671845c2c as useGlue};
//# sourceMappingURL=state-glue-haunted.js.map
