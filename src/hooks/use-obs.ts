import * as React from 'react';
import { Observable, BehaviorSubject } from 'rxjs';

export const useBs = <T>(bs:BehaviorSubject<T>):T => {
    const [ val, setVal ] = React.useState<T>(bs.getValue());
    React.useEffect(() => {
        const sub = bs.subscribe(setVal);
        return () => sub.unsubscribe();
    }, [])
    return val;
}

export const useObs = <T>(obs:Observable<T>):T | undefined => {
    const [ val, setVal ] = React.useState<T>();
    React.useEffect(() => {
        const sub = obs.subscribe(setVal);
        return () => sub.unsubscribe();
    }, [])
    return val;
}

export const useObsWithDefault = <T>(obs:Observable<T>, defaultVal:T):T => {
    const [ val, setVal ] = React.useState<T>(defaultVal);
    React.useEffect(() => {
        const sub = obs.subscribe(setVal);
        return () => sub.unsubscribe();
    }, [])
    if (defaultVal !== undefined) return val as T; // force type on this
    return val;
}
