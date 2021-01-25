import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';
import { cfg } from '../cfg';
import { ApiResult } from '../types';

export interface MasterGetDocProps {
    readonly app:string;
    readonly docId:string;
    readonly token:string;
}
export const masterGetDoc = <T = {}>({ app, docId, token }:MasterGetDocProps):Observable<ApiResult<T>> => {
    return fromFetch(cfg.apiBaseUrl, {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify({
            action: "MASTER_GET_DOC",
            app,
            docId,
            token
        }),
        headers: { "Content-Type": "application/json" }
    }).pipe(switchMap(x => x.json()))
}