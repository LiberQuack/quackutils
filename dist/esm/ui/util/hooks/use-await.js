import { useState } from "haunted/lib/core";
import { inlineErr } from "../../../_/inline-error";
/**
 *
 * @param job Async function to be executed
 * @param cb Callback executed everytime the stats change
 */
export function useAwait(job, cb) {
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(undefined);
    const [result, setResult] = useState(undefined);
    const run = (async (...args) => {
        if (!loading) {
            setLoading(true);
            setErr(undefined);
            const [result, err] = await inlineErr(job(...args));
            setErr(err);
            setResult(result);
            setLoading(false);
            return result;
        }
    });
    const awaitStats = {
        run,
        loading,
        result: result,
        err
    };
    if (cb) {
        cb(awaitStats);
    }
    return awaitStats;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlLWF3YWl0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3VpL3V0aWwvaG9va3MvdXNlLWF3YWl0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMxQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFNbEQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxRQUFRLENBQWdELEdBQU0sRUFBRSxFQUE4QztJQUMxSCxNQUFNLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QyxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxTQUE4QixDQUFDLENBQUM7SUFDL0QsTUFBTSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsR0FBRyxRQUFRLENBQUMsU0FBMkIsQ0FBQyxDQUFDO0lBRWxFLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsSUFBSSxFQUFFLEVBQUU7UUFDM0IsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNWLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqQixNQUFNLENBQUMsU0FBZ0IsQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsTUFBTSxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNwRCxNQUFNLENBQUMsR0FBVSxDQUFDLENBQUM7WUFDbkIsU0FBUyxDQUFDLE1BQWEsQ0FBQyxDQUFDO1lBQ3pCLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsQixPQUFPLE1BQU0sQ0FBQztTQUNqQjtJQUNMLENBQUMsQ0FBTSxDQUFDO0lBRVIsTUFBTSxVQUFVLEdBQTZCO1FBQ3pDLEdBQUc7UUFDSCxPQUFPO1FBQ1AsTUFBTSxFQUFFLE1BQXdCO1FBQ2hDLEdBQUc7S0FDTixDQUFDO0lBRUYsSUFBSSxFQUFFLEVBQUU7UUFDSixFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDbEI7SUFFRCxPQUFPLFVBQVUsQ0FBQztBQUN0QixDQUFDIn0=