export async function inlineErr(arg, preventLog) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5saW5lLWVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL18vaW5saW5lLWVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxLQUFLLFVBQVUsU0FBUyxDQUFVLEdBQW1CLEVBQUUsVUFBb0I7SUFDOUUsSUFBSTtRQUNBLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0tBQ3RCO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDVixJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN0QjtRQUNELE9BQU8sQ0FBQyxTQUFTLEVBQUUsR0FBVSxDQUFDLENBQUM7S0FDbEM7QUFDTCxDQUFDIn0=