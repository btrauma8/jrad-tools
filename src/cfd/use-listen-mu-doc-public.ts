import { useEffect, useState, useRef } from 'react';
import { listenToDoc } from './listen-to-doc';
import { cfg } from './cfg';
import { getChannelId } from './get-channel-id';
import { ChannelState } from './public-types';

/*
    A simple hook for jsons which already exist and don't need creating, just listen

    NO UPDATE.

    NOTE:
            we reuse the docId as stateId !!!
*/

interface UseListenMuDocPublicProps {
    readonly app?:string;
    readonly docId:string;
}
export const useListenMuDocPublic = <PublicView>({ app, docId }:UseListenMuDocPublicProps) => {

    if (!cfg.rtc) throw new Error('rtc must exist');
    const rtc = cfg.rtc;

    const channelId = getChannelId({ app, docId: docId.trim().toUpperCase(), userId:"_public" });

    const [ channelState, setChannelState ] = useState<ChannelState<PublicView>>(() => {
        // init to the value in the bs (if exists)
        const lastVal = rtc.getLastChannelValue(channelId);
        if (lastVal) return lastVal;
        return {
            status: "INITIALIZING",
            value: undefined
        }
    })
    const [ connecting, setConnecting ] = useState<boolean>(() => {
        // If the channel does not exist, we are connecting.
        return rtc.doesChannelExist(channelId);
    })

    useEffect(() => {
        // const stateSub = getStateById(docId).subscribe(x => setData(x));
        const sub = listenToDoc({ app, docId: docId.trim().toUpperCase(), userId:"_public" }).subscribe((x:any) => {
            if (connecting) setConnecting(false);
            setChannelState(x);
        })
        return () => {
            sub.unsubscribe();
        }
    }, [docId])

    const connected = channelState.status === 'CONNECTED';
    const loading = channelState.status === 'INITIALIZING';
    const failed = channelState.status === 'ERROR'
        || channelState.status === 'EXPIRED'
        || channelState.status === 'FAILED_TO_JOIN'
        || channelState.status === 'NOT_CONNECTED'
        || channelState.status === 'TIMED_OUT';

    return {
        connected,
        loading,
        failed,
        connecting,
        data:channelState.value,
        status:channelState.status
    }
}