export const getMin = <T>(items:T[], fn:(x:T) => number|undefined):T|undefined => {
    // array of T, wanna find the one with min T.X, use this.
    // (if T.X is undefined, cannot be considered)
    // (if no valid values found, returns undefiend)
    const itemWithMinProperty:T|undefined = items.reduce((prev:T|undefined, curr:T|undefined) => {
        const prevVal = prev ? fn(prev) : undefined;
        const currVal = curr ? fn(curr) : undefined;
        if (prevVal === undefined) {
            return curr;
        } else if (currVal === undefined) {
            return prev;
        } else {
            if (prevVal < currVal) return prev;
            return curr;
        }
    }, undefined)
    return itemWithMinProperty;
}

export const getMax = <T>(items:T[], fn:(x:T) => number|undefined):T|undefined => {
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

export const getMaxIndex = <T>(items:T[], fn:(x:T) => number|undefined):number => {
    // I'm sure there's a nice way of doing this with reduce. Rewrite it next time you see this.
    // -1 if fn() only returened undefineds.
    let maxIndex = -1;
    let maxVal:number|undefined;
    items.forEach((item, index) => {
        const val = fn(item);
        if (val !== undefined) {
            if (maxVal === undefined || val > maxVal) {
                maxIndex = index;
                maxVal = val;
            }
        }
    })
    return maxIndex;
}