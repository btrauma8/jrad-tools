import { useState, useEffect } from 'react';
import { BehaviorSubject } from 'rxjs';

// super simple cross-component state util.

const states = new Map<string, BehaviorSubject<any>>();

export const mergeGState = <T>(key:string, patch:Partial<T>) => {
    const st = getGState<T>(key);
    setGState(key, {
        ...st,
        ...patch
    })
}

export const getGState = <T>(key:string) => states.get(key)?.getValue() as T;

export const setGState = <T>(key:string, x:T) => {
    if (!states.has(key)) {
        states.set(key, new BehaviorSubject(x));
    } else {
        states.get(key)!.next(x);
    }
}

export const useGState = <T>(key:string, initVal?:T | (() => T)):[T, (x:T) => void] => {

    if (!states.has(key)) {
        if (!initVal) throw new Error('You must ensure useGState provides an initVal prior to calling it without initval');
        if (typeof initVal === 'function') {
            states.set(key, new BehaviorSubject<T>((initVal as ()=>T)()));
        } else {
            states.set(key, new BehaviorSubject<T>(initVal));
        }
        
    }

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