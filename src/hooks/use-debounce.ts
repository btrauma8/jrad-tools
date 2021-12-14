import { useEffect, useState } from 'react';

export const useDebounce = <T>(value:T, delay:number) => {

    const [ debouncedValue, setDebouncedValue ] = useState<T>(value);
  
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay);
        return () => clearTimeout(handler);
    }, [value, delay])

    return debouncedValue;
}


export const useDebounceFn = <T>(value:T, delay:number, fn:(x:T) => void) => {
    useEffect(() => {
        const handler = setTimeout(() => {
            fn(value);
        }, delay);
        return () => clearTimeout(handler);
    }, [value, delay])
}