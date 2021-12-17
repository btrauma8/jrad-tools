import { cfg } from './cfg';
import { getChannelId } from './get-channel-id';

interface ListenToDocProps<T> {
    readonly docId:string;
    readonly app?:string;
    readonly userId?:string;
    readonly params?:any;
    readonly modifyIncomingMsg?:(x:any) => T;
}
export const listenToDoc = <T>({ app, docId, userId, params, modifyIncomingMsg }:ListenToDocProps<T>) => {
    if (!cfg.rtc) throw new Error('Expected rtClient');
    // Will we have more params in the future? Not sure, since cfd is generic...
    return cfg.rtc.joinChannel<T>(getChannelId({ app, docId, userId }), params, modifyIncomingMsg);
}
