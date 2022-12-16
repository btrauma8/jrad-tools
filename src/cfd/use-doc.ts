import { useEffect, useState, useRef } from 'react';
import { tap } from 'rxjs/operators';
import { listenToDoc } from './listen-to-doc';
import { cfg } from './cfg';
import { mergeDoc as apiMergeDoc, setDoc as apiSetDoc } from './api';
import { getChannelId } from './get-channel-id';
import { ChannelState } from './public-types';

/*
    A simple hook for jsons which already exist and don't need creating, just listen & update
    NOTE:
            we reuse the docId as stateId !!!
*/

interface UseDocConfig {
    readonly docId:string;
}
export const useDoc = <DocData>({ docId }:UseDocConfig) => {

    if (!cfg.rtc) throw new Error('rtc must exist');
    const rtc = cfg.rtc;

    const channelId = getChannelId({ docId });

    const [ channelState, setChannelState ] = useState<ChannelState<DocData>>(() => {
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
    const [ updating, setUpdating ] = useState<boolean>(false);

    // const update = (nextDoc:DocData) => {
    //     setUpdating(true);
    //     mergeDoc({ app: cfg.app, docId, data:nextDoc, token: cfg.token }).pipe(
    //         tap(x => setUpdating(false))
    //     ).subscribe();
    // }

    const setDoc = (x:DocData) => {
        setUpdating(true);
        apiSetDoc({ app: cfg.app, docId, data:x, token: cfg.token ?? "" }).pipe(
            tap(x => setUpdating(false))
        ).subscribe();
    }

    const mergeDoc = (patch:Partial<DocData>) => {
        setUpdating(true);
        apiMergeDoc({ app: cfg.app, docId, data:patch, token: cfg.token ?? "" }).pipe(
            tap(x => setUpdating(false))
        ).subscribe();
    }

    useEffect(() => {
        // const stateSub = getStateById(docId).subscribe(x => setData(x));
        const sub = listenToDoc({ docId }).subscribe((x:any) => {
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
        mergeDoc,
        // update,
        setDoc,
        updating,
        data:channelState.value,
        status:channelState.status
    }
}