import * as React from 'react';
import { Observable } from 'rxjs';

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
