import * as React from 'react';

// export const useOnClickOutside = (elem:HTMLElement|null, handler:(evt:MouseEvent | TouchEvent) => void) => {

//     // use layout effect --- very important.
//     // if you use normal useEffect, it'll jump in front of things like react dropdown's onchange ... 
//     // and you'll end up closing whatever thing is open and not getting the change value,
//     // or you'll overwrite it wth an old value, etc...
//     // it's a lifecycle thing.

//     React.useLayoutEffect(() => {
//         // console.log('ref or handler changed');
//         const listener = (event:MouseEvent | TouchEvent) => {

//             // Do nothing if clicking ref's element or descendent elements
//             if (!elem || (elem as any).contains(event.target)) {
//                 return;
//             }
//             // console.log('we heard this', event);
//             handler(event);
//         }  
//         document.addEventListener('mousedown', listener, true); // capturing phase so we can preventDefault it
//         document.addEventListener('touchstart', listener);
//         return () => {
//             document.removeEventListener('mousedown', listener);
//             document.removeEventListener('touchstart', listener);
//         }
//     }, [elem, handler])
// }


export const useOnClickOutside = (elem:HTMLElement|null, handler:(evt:MouseEvent | TouchEvent) => void) => {

    // use layout effect --- very important.
    // if you use normal useEffect, it'll jump in front of things like react dropdown's onchange ... 
    // and you'll end up closing whatever thing is open and not getting the change value,
    // or you'll overwrite it wth an old value, etc...
    // it's a lifecycle thing.

    React.useLayoutEffect(() => {
        const listener = (event:MouseEvent) => {
            // Do nothing if clicking ref's element or descendent elements
            if (!elem || (elem as any).contains(event.target)) {
                return;
            }
            handler(event);
        }
        // it's gotta be "click" or else you cannot stopPropagation() on it!
        document.addEventListener('click', listener, true);
        return () => {
            document.removeEventListener('click', listener, true);
        }
    }, [elem, handler])
}