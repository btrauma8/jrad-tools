import { useEffect, useRef, useState } from 'react';
import { Subscription } from 'rxjs';
import { cfg } from './cfg';
import { joinMultiUserDoc, updateMultiDocUserData, insertMultiUserDoc, isValidMultiDocUser, updateMultiDoc } from './api';
import { getChannelId } from './get-channel-id';
import { MultiDocHookProp } from './public-types';
import { MultiUserDocAdminInsert } from './types';
import { stopListeningToDoc } from './stop-listening-to-doc';
import { ChannelState } from './public-types';
import { getLastDocIdAndUserIdByStateId, setDocIdAndUserId } from './doc-id-and-user-id';
import { listenByStateId } from './listen-by-state-id';
import { MultiUserDocAdminUpdate, FullChannel } from './types';

const initializing:ChannelState<any> = {
    value: undefined,
    status: "INITIALIZING"
}

export const useMultiDoc = <T extends MultiDocHookProp>({ stateId }:{ stateId:string }) => {
    type DocData = T["docData"];
    type PublicView= T["publicView"];
    type UserData = T["userData"];
    type UserView = T["userView"];
    if (!cfg.rtc) throw new Error('rtc must exist');
    const rtc = cfg.rtc;

    const [ updating, setUpdating ] = useState<boolean>(false);
    const [ joiningAsNewUser, setJoiningAsNewUser ] = useState<boolean>(false);
    const [ creatingNewMultiUserDoc, setCreatingNewMultiUserDoc ] = useState<boolean>(false);
    const [ channelState, setChannelState ] = useState<FullChannel<DocData,PublicView,UserData,UserView>>(() => {
        const docIdAndUserId = getLastDocIdAndUserIdByStateId(stateId) ?? {};
        if (docIdAndUserId.docId) {
            const channelId = getChannelId(docIdAndUserId.docId, docIdAndUserId.userId);
            const data = rtc.getLastChannelValue(channelId);
            return {
                docIdAndUserId,
                data: data ?? initializing
            }
        } else {
            return {
                docIdAndUserId,
                data: initializing
            }
        }
    })
    const isCanceled = useRef<boolean>(false);
    // const loading = useRef<boolean>(true);
    const apiSub = useRef<Subscription>();

    // We need a way to have "initCheckDone", which says,
    // if we are going to starting listening, set it to false,
    // upon first msg, set it to true.

    /** clears both docId and userId */
    const logout = () => {
        const { docId, userId } = getLastDocIdAndUserIdByStateId(stateId) ?? {};
        console.log('logout', docId, userId);
        setDocIdAndUserId(stateId, {});
        if (docId) stopListeningToDoc(docId, userId);
    }

    const joinAsNewUser = (docId:string, initUserData:UserData) => {
        const trimmedUpperDocId = docId.trim().toUpperCase();
        setJoiningAsNewUser(true);
        if (apiSub.current) apiSub.current.unsubscribe();
        apiSub.current = joinMultiUserDoc({
            app: cfg.app,
            docId: trimmedUpperDocId,
            token: cfg.token,
            initUserData
        }).subscribe(res => {
            if (res.err || !res.data) {
                console.log('error joining mu-doc');
                setDocIdAndUserId(stateId, {});
                if (!isCanceled.current) setJoiningAsNewUser(false);
                return;
            }
            const { userId } = res.data;
            if (!userId) {
                console.log('error joining mu-doc, missing userId');
                setDocIdAndUserId(stateId, {});
                if (!isCanceled.current) setJoiningAsNewUser(false);
                return;
            }
            setDocIdAndUserId(stateId, { docId: trimmedUpperDocId, userId });
            if (!isCanceled.current) setJoiningAsNewUser(false);
        })
    }

    const createNewMultiUserDoc = (insertData:MultiUserDocAdminInsert<DocData,PublicView,UserData,UserView>) => {
        setCreatingNewMultiUserDoc(true);
        if (apiSub.current) apiSub.current.unsubscribe();
        apiSub.current = insertMultiUserDoc({
            app: cfg.app,
            token: cfg.token,
            update: {
                data: insertData.data,
                publicView: insertData.publicView,
                userData: insertData.userData,
                userViews: insertData.userView, // single view (your own view)
            }
        }).subscribe(res => {
            if (res.err || !res.data) {
                console.log('error creating new mu-doc');
                setDocIdAndUserId(stateId, {});
                if (!isCanceled.current) setCreatingNewMultiUserDoc(false);
                return;
            }
            const { docId, userId } = res.data;
            console.log('CREATING MULTI USER DOC', docId, userId);
            setDocIdAndUserId(stateId, { docId, userId });
            if (!isCanceled.current) setCreatingNewMultiUserDoc(false);
        })
    }

    const updateDoc = (updateData:MultiUserDocAdminUpdate<DocData,PublicView,UserData,UserView>) => {
        if (!channelState || !channelState.data?.value || !channelState.data.value.admin) {
            console.log('cannot admin update');
            return;
        }
        const { docId, userId } = channelState.docIdAndUserId;
        if (!docId || !userId) {
            console.log('cannot update. missing docId/userId');
            return;
        }
        setUpdating(true);
        updateMultiDoc({
            app: cfg.app,
            data: updateData,
            docId,
            userId,
            token: cfg.token
        }).subscribe(x => {
            if (x.err) {
                // TODO: toast on error?
                console.log('We had trouble updating (admin update)', x.err);
            }
            if (!isCanceled.current) setUpdating(false);
        })
    }

    const updateUserData = (userData:Partial<UserData>) => {
        const { docId, userId } = getLastDocIdAndUserIdByStateId(stateId) ?? {};
        if (!docId || !userId) {
            console.log('cannot update. missing docId/userId');
            return;
        }
        setUpdating(true);
        if (apiSub.current) apiSub.current.unsubscribe();
        apiSub.current = updateMultiDocUserData({
            app: cfg.app,
            userData,
            docId,
            userId,
            token: cfg.token
        }).subscribe(x => {
            if (x.err) {
                // TODO: toast on error?
                console.log('We had trouble updating', x.err);
            }
            if (!isCanceled.current) setUpdating(false);
        })
    }

    useEffect(() => {        
        const sub = listenByStateId<DocData,PublicView,UserData,UserView>(stateId).subscribe(x => {
            if (!isCanceled.current) setChannelState(x);
        })
        return () => sub.unsubscribe();
    }, [stateId])

    useEffect(() => {
        return () => {
            isCanceled.current = true;
            if (apiSub.current) apiSub.current.unsubscribe();
        }        
    }, [])


    const docId = channelState.docIdAndUserId.docId;
    const userId = channelState.docIdAndUserId.userId;
    const connected = channelState.data.status === 'CONNECTED';
    const loading = channelState.data.status === 'INITIALIZING';
    const failed = docId && (
        channelState.data.status === 'ERROR'
        || channelState.data.status === 'EXPIRED'
        || channelState.data.status === 'FAILED_TO_JOIN'
        || channelState.data.status === 'NOT_CONNECTED'
        || channelState.data.status === 'TIMED_OUT'
    )

    return {
        updateDoc,
        updateUserData,
        updating,
        logout,
        loading,
        connected,
        failed,
        data: channelState.data.value,
        status: channelState.data.status,
        docIdAndUserId: channelState.docIdAndUserId,
        docId,
        userId,
        joinAsNewUser,
        joiningAsNewUser,
        createNewMultiUserDoc,
        creatingNewMultiUserDoc
    }
}