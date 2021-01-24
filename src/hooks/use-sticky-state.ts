import { useState } from 'react';

const set = (key:string, val:any) => {
    localStorage[key] = JSON.stringify(val);
}

export const getStickyVal = <T>(key:string):T|undefined => {
    try {
        const result:T = JSON.parse(localStorage[key]);
        return result;
    } catch (err) {
        return undefined;
    }
}


export const useStickyState = <T>(key:string, defaultVal:T):[T, (x:T) => void] => {

    const [ val, setVal ] = useState<T>(() => {
        return getStickyVal(key) ?? defaultVal;
    })

    return [
        val,
        (x:T) => {
            set(key, x);
            setVal(x)
        }
    ]
}