import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';
import { cfg } from '../cfg';
import { ApiResult } from '../types';

export interface MasterRestartProps {
    readonly token:string;
}
export const masterRestart = <T = {}>({ token }:MasterRestartProps):Observable<ApiResult<T>> => {
    // debugging only. this restarts app.
    return fromFetch(cfg.apiBaseUrl, {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify({
            action: "RESTART",
            token
        }),
        headers: { "Content-Type": "application/json" }
    }).pipe(switchMap(x => x.json()))
}