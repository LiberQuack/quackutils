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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUtZ2x1ZS1nZW5lcmF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBwL3N0YXRlL3N0YXRlLWdsdWUtZ2VuZXJhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWFBOzs7OztHQUtHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHLENBQUMsUUFBOEIsRUFBRSxTQUFnQyxFQUFFLEVBQUUsQ0FBQyxTQUFTLE9BQU8sQ0FBSSxhQUF1QixFQUFFLEtBQWM7SUFFekosTUFBTSxZQUFZLEdBQWtCLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztJQUV0RyxNQUFNLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUVqRCxTQUFTLENBQUMsR0FBRyxFQUFFO1FBQ1gsSUFBSSxLQUFLLEVBQUU7WUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxHQUFHLEVBQUUsU0FBUyxhQUFhLENBQUMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1NBQ3hFO1FBRUQsTUFBTSxZQUFZLEdBQUcsR0FBRyxFQUFFO1lBQ3RCLE1BQU0sU0FBUyxHQUFHLGFBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUMzQyxNQUFNLGNBQWMsR0FBa0IsQ0FBQyxTQUFTLEVBQUUsRUFBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLEtBQUssRUFBRSxVQUFVLEVBQUUsYUFBYSxDQUFDLFVBQVUsRUFBQyxDQUFDLENBQUM7WUFFdEgsSUFBSSxLQUFLLEVBQUU7Z0JBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssR0FBRyxFQUFFLFNBQVMsYUFBYSxDQUFDLEVBQUUsMEJBQTBCLENBQUMsQ0FBQzthQUNqRjtZQUVELFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUN6Qix3R0FBd0c7WUFDeEcsbURBQW1EO1lBQ25ELDZIQUE2SDtRQUNqSSxDQUFDLENBQUM7UUFFRixhQUFhLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBR3RDLE9BQU8sR0FBRyxFQUFFO1lBQ1IsSUFBSSxLQUFLLEVBQUU7Z0JBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssR0FBRyxFQUFFLDRCQUE0QixhQUFhLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQzthQUM1RTtZQUVELGFBQWEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDNUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRVAsT0FBTyxLQUFLLENBQUE7QUFDaEIsQ0FBQyxDQUFBIn0=