import { useState } from 'react';

let stickyPrefix = '';

export const setStickyPrefix = (s:string) => stickyPrefix = s;

export const setStickyVal = (key:string, val:any) => {
    localStorage[stickyPrefix + key] = JSON.stringify(val);
}

export const getStickyVal = <T>(key:string):T|undefined => {
    try {
        const result:T = JSON.parse(localStorage[stickyPrefix + key]);
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
            setStickyVal(key, x);
            setVal(x)
        }
    ]
}