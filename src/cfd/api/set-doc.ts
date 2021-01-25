import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';
import { cfg } from '../cfg';
import { ApiResult } from '../types';

export interface SetDocProps<T> {
    readonly app:string;
    readonly docId:string;
    readonly token:string;
    readonly data:T;
}
export const setDoc = <T = {}>({ app, docId, token, data }:SetDocProps<T>):Observable<ApiResult<boolean>> => {
    // returns true on success
    return fromFetch(cfg.apiBaseUrl, {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify({
            action: "SET_DOC",
            app,
            docId,
            token,
            data
        }),
        headers: { "Content-Type": "application/json" }
    }).pipe(switchMap(x => x.json()))
}