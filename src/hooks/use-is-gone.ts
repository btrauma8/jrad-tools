import { useEffect, useRef } from 'react';

export const useIsGone = () => {
    const gone = useRef(false);
    useEffect(() => {
        return () => {
            gone.current = true;
        }
    }, [])
    // Return a function so we always get fresh value
    return ():boolean => gone.current;
}