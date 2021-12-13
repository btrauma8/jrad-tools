import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';
import { cfg } from '../cfg';
import { ApiResult } from '../types';

export interface MasterInsertNewUserIntoMuDocProps<T> {
    readonly app:string;
    readonly docId:string;
    readonly token:string;
    readonly data:T;
}
export const masterInsertNewUserIntoMuDoc = <T = {}>({
    app,
    docId,
    token,
    data
}:MasterInsertNewUserIntoMuDocProps<T>):Observable<ApiResult<boolean>> => {
    // returns true on success
    return fromFetch(cfg.apiBaseUrl, {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify({
            action: "MASTER_INSERT_NEW_USER_INTO_MULTI_USER_DOC",
            app,
            docId,
            token,
            data
        }),
        headers: { "Content-Type": "application/json" }
    }).pipe(switchMap(x => x.json()))
}