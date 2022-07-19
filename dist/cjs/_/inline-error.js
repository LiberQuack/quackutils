define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.inlineErr = void 0;
    async function inlineErr(arg, preventLog) {
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
    exports.inlineErr = inlineErr;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5saW5lLWVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL18vaW5saW5lLWVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7SUFBTyxLQUFLLFVBQVUsU0FBUyxDQUFVLEdBQW1CLEVBQUUsVUFBb0I7UUFDOUUsSUFBSTtZQUNBLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1NBQ3RCO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDVixJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDdEI7WUFDRCxPQUFPLENBQUMsU0FBUyxFQUFFLEdBQVUsQ0FBQyxDQUFDO1NBQ2xDO0lBQ0wsQ0FBQztJQVRELDhCQVNDIn0=