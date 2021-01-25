import { Observable, of, combineLatest } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { cfg } from './cfg';
import { getChannelId } from './get-channel-id';
import { getDocIdAndUserIdByStateId } from './doc-id-and-user-id';
import { toMultiDocData } from './to-multi-doc-data';
import { MultiDocData, ChannelState } from './public-types';
import { DocIdAndUserId, FullChannel } from './types';

const notConnected:ChannelState<any> = {
    value: undefined,
    status: "NOT_CONNECTED"
}

const getJoinObs = <A,B,C,D>(docIdAndUserId:DocIdAndUserId, params?:any) => {
    const { docId, userId } = docIdAndUserId;
    if (!docId || !cfg.rtc) return of(notConnected);
    const channelId = getChannelId(docId, userId);
    console.log('JOIN THE CHANNEL', channelId);
    return cfg.rtc.joinChannel<MultiDocData<A,B,C,D>>(channelId, params, toMultiDocData);
}

export const listenByStateId = <DocData,PublicView,UserData,UserView>(
    stateId:string,
    params?:any
):Observable<FullChannel<DocData,PublicView,UserData,UserView>> => {    
    return getDocIdAndUserIdByStateId(stateId).pipe(
        switchMap(docIdAndUserId => {
            return getJoinObs<DocData,PublicView,UserData,UserView>(docIdAndUserId, params).pipe(
                map(data => {
                    return {
                        docIdAndUserId,
                        data
                    }
                })
            )
        })
    )
}
