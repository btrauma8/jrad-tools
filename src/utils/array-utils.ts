
export const sort = <T>(arr:T[], fn:(x:T) => any, dir:"asc"|"desc"):T[] => {
    // Should have made this immutable sorter years ago. I never remember which is asc and which is desc.
    return dir === "desc" ? [...arr].sort((a, b) => {
        if (fn(a) < fn(b)) return 1;
        if (fn(a) > fn(b)) return -1;
        return 0;
    }) : [...arr].sort((a, b) => {
        if (fn(a) < fn(b)) return -1;
        if (fn(a) > fn(b)) return 1;
        return 0;
    })
}

export const moveItemByIndex = <T>(arr:T[], fromIndex:number, toIndex:number) => {
    if (fromIndex < 0 || fromIndex >= arr.length) return arr;
    if (toIndex < 0 || toIndex >= arr.length) return arr;
    if (fromIndex === toIndex) return arr;
    if (toIndex < fromIndex) {
        return [
            ...arr.slice(0, toIndex),
            arr[fromIndex],
            ...arr.slice(toIndex, fromIndex),
            ...arr.slice(fromIndex + 1)
        ]    
    } else {
        return [
            ...arr.slice(0, fromIndex),
            ...arr.slice(fromIndex + 1, toIndex + 1),
            arr[fromIndex],
            ...arr.slice(toIndex + 1)
        ]    
    }
}

export const removeItemAtIndex = <T>(arr:T[], index:number) => {
    if (index < 0 || index >= arr.length) return arr;
    return [...arr.slice(0, index), ...arr.slice(index + 1)]
}


export const insertItemAtIndex = <T>(arr:T[], index:number, item:T) => {
    if (index < 0 || index > arr.length) return arr; // it can be ONE beyond (or, equal to array length)
    return [...arr.slice(0, index), item, ...arr.slice(index)]
}

export const moveItem = <T>(arr:T[], fromIndex:number, toIndex:number) => {
    if (fromIndex < 0 || fromIndex >= arr.length) return arr;
    if (toIndex < 0 || toIndex >= arr.length) return arr;
    if (fromIndex === toIndex) return arr;
    if (toIndex < fromIndex) {
        return [
            ...arr.slice(0, toIndex),
            arr[fromIndex],
            ...arr.slice(toIndex, fromIndex),
            ...arr.slice(fromIndex + 1)
        ]    
    } else {
        return [
            ...arr.slice(0, fromIndex),
            ...arr.slice(fromIndex + 1, toIndex + 1),
            arr[fromIndex],
            ...arr.slice(toIndex + 1)
        ]    
    }
}