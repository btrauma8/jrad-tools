export const removeItemAtIndex = <T>(arr:T[], index:number) => {
    if (index < 0 || index >= arr.length) return arr;
    return [...arr.slice(0, index), ...arr.slice(index + 1)]
}