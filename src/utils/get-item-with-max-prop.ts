export const getItemWithMaxProp = <T>(items:T[], fn:(x:T) => number|undefined):T|undefined => {
    // array of T, wanna find the one with max T.X, use this.
    // (if T.X is undefined, cannot be considered)
    // (if no valid values found, returns undefiend)
    const itemWithMaxProperty:T|undefined = items.reduce((prev:T|undefined, curr:T|undefined) => {
        const prevVal = prev ? fn(prev) : undefined;
        const currVal = curr ? fn(curr) : undefined;
        if (prevVal === undefined) {
            return curr;
        } else if (currVal === undefined) {
            return prev;
        } else {
            if (prevVal > currVal) return prev;
            return curr;
        }
    }, undefined)
    return itemWithMaxProperty;
}
