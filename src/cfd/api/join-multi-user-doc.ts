import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';
import { cfg } from '../cfg';

interface JoinMultiUserDocProps {
    readonly app:string;
    readonly docId:string;
    readonly token?:string;
    readonly initUserData?:any;
}

interface JoinMultiUserDocResult {
    readonly err?:string;
    readonly data?:{
        readonly userId:string;
    }
}

export const joinMultiUserDoc = ({ app, token, docId, initUserData }:JoinMultiUserDocProps):Observable<JoinMultiUserDocResult> => {
    return fromFetch(cfg.apiBaseUrl, {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify({
            action: "USER_JOIN",
            app,
            docId,
            token,
            data:initUserData
        }),
        headers: { "Content-Type": "application/json" }
    }).pipe(switchMap(x => x.json()))
}

interface ReJoinMultiUserDocProps {
    readonly app:string;
    readonly docId:string;
    readonly userId:string;
}

interface ReJoinMultiUserDocResult {
    readonly err?:string;
    readonly data?:boolean;
}

export const rejoinMultiUserDoc = ({ app, docId, userId }:ReJoinMultiUserDocProps):Observable<ReJoinMultiUserDocResult> => {
    return fromFetch(cfg.apiBaseUrl, {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify({
            action: "USER_REJOIN",
            app,
            docId,
            userId
        }),
        headers: { "Content-Type": "application/json" }
    }).pipe(switchMap(x => x.json()))
}
