import { useEffect, useState } from 'react';
import { Observable } from 'rxjs';

export const useObs = <T>(bs:Observable<T>):T | undefined => {
    const [ val, setVal ] = useState<T>();
    useEffect(() => {
        const sub = bs.subscribe(setVal);
        return () => sub.unsubscribe();
    }, [])
    return val;
}

export const useObsWithDefault = <T>(bs:Observable<T>, defaultVal:T):T => {
    const [ val, setVal ] = useState<T>(defaultVal);
    useEffect(() => {
        const sub = bs.subscribe(setVal);
        return () => sub.unsubscribe();
    }, [])
    if (defaultVal !== undefined) return val as T; // force type on this
    return val;
}
