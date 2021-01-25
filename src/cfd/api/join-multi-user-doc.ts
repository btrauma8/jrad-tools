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

/*
    case "USER_JOIN": {
        // anything they send as "item" (soon to be data) is spread into new user object.
        // There is no "can you read, can you write, can you insert" here. Anyone can join a mu-doc.
        if (!app || !docId) return err("missing app and/or docId");
        const ref = getFileDbIfExists(getFileDbOptions(app, docId, true));
        if (!ref) return err("not found");
        const data = ref.get();
        const users = data.users;
        if (!users || typeof users !== 'object') return err('Not valid mu doc');
        // TODO: get unique shortId, send taken ones
        const takenIds = Object.keys(users);
        const newUserId = getShortId(takenIds);
        const newUser = {
            ...(data ?? {}),
            id:newUserId,
            admin:true
        }
        ref.set({
            ...data,
            users: {
                ...data.users,
                [newUserId]:newUser
            }
        })
        return ok(newUserId);
    }
*/