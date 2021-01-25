import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';
import { cfg } from '../cfg';
import { ApiResult } from '../types';

export interface MasterDeleteDoc {
    readonly app:string;
    readonly docId:string;
    readonly token:string;
}
export const masterDeleteDoc = ({ app, docId, token }:MasterDeleteDoc):Observable<ApiResult<boolean>> => {
    // returns true on success
    return fromFetch(cfg.apiBaseUrl, {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify({
            action: "MASTER_DELETE_DOC",
            app,
            docId,
            token
        }),
        headers: { "Content-Type": "application/json" }
    }).pipe(switchMap(x => x.json()))
}