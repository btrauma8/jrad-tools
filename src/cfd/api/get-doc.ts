import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';
import { cfg } from '../cfg';
import { ApiResult } from '../types';

export interface GetDocProps {
    readonly app:string;
    readonly docId:string;
    readonly token:string;
}
export const getDoc = <T = {}>({ app, docId, token }:GetDocProps):Observable<ApiResult<T>> => {
    return fromFetch(cfg.apiBaseUrl, {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify({
            action: "GET_DOC",
            app,
            docId,
            token
        }),
        headers: { "Content-Type": "application/json" }
    }).pipe(switchMap(x => x.json()))
}