export const toDict = <T>(arr:T[], fn:(x:T)=>string|number):{ [k:string]:T} => {
    if (!Array.isArray(arr)) throw new Error('Expected Array: ' + JSON.stringify(arr));
    return arr.reduce((dict:any, x:T) => {
        dict[String(fn(x))] = x;
        return dict;
    }, {});
}