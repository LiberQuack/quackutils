define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.generateGlue = void 0;
    /**
     * Usage example:
     * ```
     *     const [fooGlue, fooStatus] = useGlue(fooState)
     * ```
     */
    const generateGlue = (useState, useEffect) => function useGlue(externalState, logId) {
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
    exports.generateGlue = generateGlue;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUtZ2x1ZS1nZW5lcmF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBwL3N0YXRlL3N0YXRlLWdsdWUtZ2VuZXJhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7SUFhQTs7Ozs7T0FLRztJQUNJLE1BQU0sWUFBWSxHQUFHLENBQUMsUUFBOEIsRUFBRSxTQUFnQyxFQUFFLEVBQUUsQ0FBQyxTQUFTLE9BQU8sQ0FBSSxhQUF1QixFQUFFLEtBQWM7UUFFekosTUFBTSxZQUFZLEdBQWtCLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztRQUV0RyxNQUFNLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVqRCxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ1gsSUFBSSxLQUFLLEVBQUU7Z0JBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssR0FBRyxFQUFFLFNBQVMsYUFBYSxDQUFDLEVBQUUsaUJBQWlCLENBQUMsQ0FBQzthQUN4RTtZQUVELE1BQU0sWUFBWSxHQUFHLEdBQUcsRUFBRTtnQkFDdEIsTUFBTSxTQUFTLEdBQUcsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUMzQyxNQUFNLGNBQWMsR0FBa0IsQ0FBQyxTQUFTLEVBQUUsRUFBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLEtBQUssRUFBRSxVQUFVLEVBQUUsYUFBYSxDQUFDLFVBQVUsRUFBQyxDQUFDLENBQUM7Z0JBRXRILElBQUksS0FBSyxFQUFFO29CQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLEdBQUcsRUFBRSxTQUFTLGFBQWEsQ0FBQyxFQUFFLDBCQUEwQixDQUFDLENBQUM7aUJBQ2pGO2dCQUVELFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDekIsd0dBQXdHO2dCQUN4RyxtREFBbUQ7Z0JBQ25ELDZIQUE2SDtZQUNqSSxDQUFDLENBQUM7WUFFRixhQUFhLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBR3RDLE9BQU8sR0FBRyxFQUFFO2dCQUNSLElBQUksS0FBSyxFQUFFO29CQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLEdBQUcsRUFBRSw0QkFBNEIsYUFBYSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7aUJBQzVFO2dCQUVELGFBQWEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDNUMsQ0FBQyxDQUFDO1FBQ04sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRVAsT0FBTyxLQUFLLENBQUE7SUFDaEIsQ0FBQyxDQUFBO0lBdENZLFFBQUEsWUFBWSxnQkFzQ3hCIn0=