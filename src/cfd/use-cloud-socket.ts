export const nope = true;

// import { useEffect, useRef, useState } from 'react';
// import { Subscription } from 'rxjs';
// import { listenToDoc } from './listen-to-doc';
// import { cfg } from './cfg';

// export const useCloudSocket = <T>(docId?:string) => {

//     // NOTE: we don't re-subscribe if only params change, but channelId stays the same

//     const [ data, setData ] = useState<T>();
//     const sub = useRef<Subscription|null>(null);
//     const currDocId = useRef<string>('');
//     const _docId = docId ?? '';

//     const unsub = () => {
//         if (sub.current) {
//             sub.current.unsubscribe();
//             currDocId.current = '';
//             sub.current = null;
//         }
//     }

//     const listen = (docId:string) => {
//         if (!cfg.rtc) throw new Error("attempt to listen to websocket pre-init");
//         unsub();
//         const obs = listenToDoc<T>({ docId });
//         currDocId.current = docId;
//         sub.current = obs.subscribe(x => setData(x));
//     }
     
//     useEffect(() => {
//         if (_docId) listen(_docId);
//     }, [_docId]);

//     useEffect(() => {
//         return () => unsub();
//     }, [])

//     return {
//         listen,
//         stopListening: () => unsub(),
//         data
//     }
// }