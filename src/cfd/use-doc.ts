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
interface AppAndToken {
    readonly app:string;
    readonly token:string;
}
interface UseDocConfig {
    readonly docId:string;
    readonly appAndToken?:AppAndToken;
}
export const useDoc = <DocData>({ docId, appAndToken }:UseDocConfig) => {

    if (!cfg.rtc) throw new Error('rtc must exist');
    const rtc = cfg.rtc;
    // Take defaults unless they sent us the app+token
    const app = appAndToken?.app ?? cfg.app;
    const token = (appAndToken?.token ?? cfg.token) ?? "";

    const channelId = getChannelId({ docId, app });

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


    const setDoc = (x:DocData) => {
        setUpdating(true);
        apiSetDoc({ app, docId, data:x, token }).pipe(
            tap(x => setUpdating(false))
        ).subscribe();
    }

    const mergeDoc = (patch:Partial<DocData>, nullMeansDelete?:boolean) => {
        setUpdating(true);
        apiMergeDoc({
            app,
            docId,
            data:patch,
            token,
            nullMeansDelete
        }).pipe(
            tap(x => setUpdating(false))
        ).subscribe();
    }

    useEffect(() => {
        // const stateSub = getStateById(docId).subscribe(x => setData(x));
        const sub = listenToDoc({ docId, app }).subscribe((x:any) => {
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