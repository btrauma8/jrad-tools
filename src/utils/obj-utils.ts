export const isFunction = (fnToCheck:any):boolean => {
    // No easy way to do this.
    return fnToCheck && {}.toString.call(fnToCheck) === '[object Function]';
}

export const deepClone = <T extends object>(target: T): T => {
    if (target === null) return target;

    if (target instanceof Date) return new Date(target.getTime()) as T;

    if (target instanceof Array) return target.map(item => deepClone(item)) as T;

    if (typeof target === 'object' && target !== {}) {
        let copy: any = {...target};
        let clone = Object.create(target);
        Object.keys(copy).forEach((key: any) => clone[key] = deepClone(copy[key]));
        return clone as T;
    }

    return target as T;
}

interface ByDotNotationResult {
    readonly val:any;
    readonly parent:any;
    readonly found:boolean;
}
export const getByDotNotation = (s:string, obj:any):ByDotNotationResult => {
    // make it one million and three times.
    const arr = s.split('.');
    let o = obj;
    let parent = obj;
    try {
        // if it breaks, it breaks...we catch.
        // tslint:disable-next-line: prefer-for-of
        for (let i=0; i < arr.length; i++) {
            if (i === arr.length-1) parent = o; // remember the parent
            o = o[arr[i]];
        }
        return {
            found: true,
            parent,
            val: o
        }
    } catch (err) {
        // nothing
    }
    return {
        val: null,
        parent: null,
        found: false
    }
}

const isPrimitive = (obj:any) => obj !== Object(obj);

export const deepEqual = (obj1:any, obj2:any):boolean => {
    // faster than JSON.stringify comparing AND doesn't care about order of properties.
    if (obj1 === obj2) return true;
    if (isPrimitive(obj1) && isPrimitive(obj2)) return obj1 === obj2;
    if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
    // tslint:disable-next-line: forin
    for (let key in obj1) {
        if (!(key in obj2)) return false;
        if (!deepEqual(obj1[key], obj2[key])) return false;
    }
    return true;
}
