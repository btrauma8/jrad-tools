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