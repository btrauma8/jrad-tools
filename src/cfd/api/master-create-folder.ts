import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';
import { cfg } from '../cfg';
import { ApiResult } from '../types';

export interface MasterCreateFolder {
    readonly app:string;
    readonly token:string;
}
export const masterCreateFolder = ({ app, token }:MasterCreateFolder):Observable<ApiResult<boolean>> => {
    // returns true on success
    return fromFetch(cfg.apiBaseUrl, {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify({
            action: "MASTER_CREATE_FOLDER",
            app,
            token
        }),
        headers: { "Content-Type": "application/json" }
    }).pipe(switchMap(x => x.json()))
}