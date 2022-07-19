define(["require", "exports", "haunted/lib/core", "../../../_/inline-error"], function (require, exports, core_1, inline_error_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useAwait = void 0;
    /**
     *
     * @param job Async function to be executed
     * @param cb Callback executed everytime the stats change
     */
    function useAwait(job, cb) {
        const [loading, setLoading] = (0, core_1.useState)(false);
        const [err, setErr] = (0, core_1.useState)(undefined);
        const [result, setResult] = (0, core_1.useState)(undefined);
        const run = (async (...args) => {
            if (!loading) {
                setLoading(true);
                setErr(undefined);
                const [result, err] = await (0, inline_error_1.inlineErr)(job(...args));
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
    exports.useAwait = useAwait;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlLWF3YWl0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3VpL3V0aWwvaG9va3MvdXNlLWF3YWl0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7SUFPQTs7OztPQUlHO0lBQ0gsU0FBZ0IsUUFBUSxDQUFnRCxHQUFNLEVBQUUsRUFBOEM7UUFDMUgsTUFBTSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsR0FBRyxJQUFBLGVBQVEsRUFBQyxLQUFLLENBQUMsQ0FBQztRQUM5QyxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxHQUFHLElBQUEsZUFBUSxFQUFDLFNBQThCLENBQUMsQ0FBQztRQUMvRCxNQUFNLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxHQUFHLElBQUEsZUFBUSxFQUFDLFNBQTJCLENBQUMsQ0FBQztRQUVsRSxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLElBQUksRUFBRSxFQUFFO1lBQzNCLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ1YsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNqQixNQUFNLENBQUMsU0FBZ0IsQ0FBQyxDQUFDO2dCQUN6QixNQUFNLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLE1BQU0sSUFBQSx3QkFBUyxFQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3BELE1BQU0sQ0FBQyxHQUFVLENBQUMsQ0FBQztnQkFDbkIsU0FBUyxDQUFDLE1BQWEsQ0FBQyxDQUFDO2dCQUN6QixVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2xCLE9BQU8sTUFBTSxDQUFDO2FBQ2pCO1FBQ0wsQ0FBQyxDQUFNLENBQUM7UUFFUixNQUFNLFVBQVUsR0FBNkI7WUFDekMsR0FBRztZQUNILE9BQU87WUFDUCxNQUFNLEVBQUUsTUFBd0I7WUFDaEMsR0FBRztTQUNOLENBQUM7UUFFRixJQUFJLEVBQUUsRUFBRTtZQUNKLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNsQjtRQUVELE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUE3QkQsNEJBNkJDIn0=