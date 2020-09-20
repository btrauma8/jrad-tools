import * as React from 'react';

export const usePrevious = <T>(value:T) => {
    // init value will be undefined.
    // usage:  const abc = usePrevious(anything);
    const ref = React.useRef<T>();
    React.useEffect(() => {
        ref.current = value;
    })
    return ref.current;
}