export const toBoolDict = <T>(arr:T[], keyFn:(x:T)=>string|number, valFn:(x:T)=>boolean):{ [k:string]:boolean} => {
    // This often comes in handy when you have an array of items,
    // and you have UI with checkboxes for "selected" or not,
    // and you want dictionary by string id of what is selected
    if (!Array.isArray(arr)) throw new Error('Expected Array: ' + JSON.stringify(arr));
    return arr.reduce((dict:any, x:T) => {
        dict[String(keyFn(x))] = valFn(x);
        return dict;
    }, {});
}