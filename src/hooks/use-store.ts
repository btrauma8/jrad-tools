import { useState, useEffect } from 'react';
import { BehaviorSubject } from 'rxjs';
import { getStickyVal, setStickyVal } from './use-sticky-state';

// super simple cross-component state util.

const states = new Map<string, BehaviorSubject<any>>();
const isSticky = new Map<string, boolean>();

export const clearStore = <T>(key:string) => {
    const bs = states.get(key);
    if (bs) {
        bs.complete(); // signal to listeners that it's over.
        states.delete(key);
        isSticky.delete(key);
    }
}

export const updateStore = <T>(key:string, fn:(x:T) => T) => {
    const st = getStore<T>(key);
    setStore(key, fn(st));
}

export const mergeStore = <T>(key:string, patch:Partial<T>) => {
    const st = getStore<T>(key);
    setStore(key, {
        ...st,
        ...patch
    })
}

export const getStore = <T>(key:string) => states.get(key)?.getValue() as T;

export const setStore = <T>(key:string, x:T, sticky?:boolean) => {
    if (!states.has(key)) {
        states.set(key, new BehaviorSubject(x));
        if (sticky) isSticky.set(key, true);
    } else {
        if (isSticky.get(key)) setStickyVal(key, x);
        states.get(key)!.next(x);
    }
}

export const useStore = <T>(key:string, initVal?:T | (() => T)):[T, (x:T) => void] => {

    if (!states.has(key)) {
        if (initVal === undefined) throw new Error('You must ensure useStore provides an initVal prior to calling it without initval');
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

const getInitVal = <T>(key:string, initVal?:T | (() => T)) => {
    // we want to prefer the sticky value.
    const stickyVal = getStickyVal<T>(key);
    if (stickyVal !== undefined) return stickyVal;

    if (initVal === undefined) {
        throw new Error('You must ensure useStore provides an initVal prior to calling it like this.');
    }
    if (typeof initVal === 'function') {
        return (initVal as ()=>T)();
    } else {
        return initVal;
    }
}

export const useStickyStore = <T>(key:string, initVal?:T | (() => T)):[T, (x:T) => void] => {

    if (!states.has(key)) {
        states.set(key, new BehaviorSubject<T>(getInitVal(key, initVal)));
        isSticky.set(key, true);
    }

    const [ val, _setVal ] = useState<T>(states.get(key)!.getValue());

    const setVal = (x:T) => {
        setStickyVal(key, x);
        states.get(key)!.next(x);
    }

    useEffect(() => {
        const sub = states.get(key)!.subscribe(x => _setVal(x))
        return () => sub.unsubscribe();
    }, [])

    return [
        val,
        setVal
    ]
}