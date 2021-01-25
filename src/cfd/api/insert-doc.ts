import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';
import { cfg } from '../cfg';
import { ApiResult } from '../types';

export interface InsertDocProps<T> {
    readonly app:string;
    readonly docId:string;
    readonly token:string;
    readonly data:T;
}
export const insertDoc = <T = {}>({ app, docId, data, token }:InsertDocProps<T>):Observable<ApiResult<string[]>> => {
    // Returns list of all docs in the app. insert rights implies list rights.
    return fromFetch(cfg.apiBaseUrl, {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify({
            action: "INSERT_DOC",
            app,
            docId,
            token,
            data
        }),
        headers: { "Content-Type": "application/json" }
    }).pipe(switchMap(x => x.json()))
}