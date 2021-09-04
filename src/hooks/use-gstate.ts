import { useState, useEffect } from 'react';
import { BehaviorSubject } from 'rxjs';

const states = new Map<string, BehaviorSubject<any>>();

export const setGState = <T>(key:string, x:T) => states.get(key)?.next(x);

export const useGState = <T>(key:string, initVal:T):[T, (x:T) => void] => {

    // very simple hook where suddenly you can have simple cross-component state

    if (!states.has(key)) states.set(key, new BehaviorSubject<T>(initVal));

    const [ val, _setVal ] = useState<T>(states.get(key)!.getValue());

    const setVal = (x:T) => states.get(key)!.next(x);

    useEffect(() => {
        const sub = states.get(key)!.subscribe(x => _setVal(x))
        return () => sub.unsubscribe();
    }, [])

    return [
        val,
        setVal
    ]
}