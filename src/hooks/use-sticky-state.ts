import { useState } from 'react';

const set = (key:string, val:any) => {
    localStorage[key] = JSON.stringify(val);
}

const get = <T>(key:string):T|undefined => {
    try {
        const result:T = JSON.parse(localStorage[key]);
        return result;
    } catch (err) {
        return undefined;
    }
}

export const useStickyStateWithDefault = <T>(key:string, defaultVal:T):[T, (x:T) => void] => {

    const [ val, setVal ] = useState<T>(() => {
        return get(key) ?? defaultVal;
    })

    return [
        val,
        (x:T) => {
            set(key, x);
            setVal(x)
        }
    ]
}