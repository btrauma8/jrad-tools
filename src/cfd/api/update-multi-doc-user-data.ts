import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';
import { cfg } from '../cfg';

interface UpdateMultiDocUserDataProps {
    readonly app:string;
    readonly docId:string;
    readonly userId:string;
    readonly token?:string;
    readonly userData:any;
}


interface UpdateMultiDocUserDataResult {
    readonly err?:string;
    readonly data?:boolean;
}

export const updateMultiDocUserData = <T>({ app, docId, userId, token, userData }:UpdateMultiDocUserDataProps):Observable<UpdateMultiDocUserDataResult> => {
    return fromFetch(cfg.apiBaseUrl, {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify({
            action: "UPDATE_MULTI_USER_DOC_AS_NON_ADMIN_USER",
            app,
            docId,
            userId,
            token,
            data: userData
        }),
        headers: { "Content-Type": "application/json" }
    }).pipe(switchMap(x => x.json()))
}
