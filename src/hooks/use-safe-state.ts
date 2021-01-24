import { useState } from "react";
import { useIsGone } from './use-is-gone';

export const useSafeState = <T>(initVal:T):[T, (x:T) => void] => {
    const [ val, setVal ] = useState<T>(initVal);
    const isGone = useIsGone();
    return [
        val,
        (nextVal:T) => {
            if (isGone()) return; // component no longer in DOM! forget it!
            setVal(nextVal);
        }
    ]
}