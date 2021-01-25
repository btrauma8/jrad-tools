import { cfg } from './cfg';
import { switchMap } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';
import { GetAppFileListResult } from './types';
import { Observable } from 'rxjs';

export const getDocList = ():Observable<GetAppFileListResult> => {

    const payload = {
        action: "LIST_APP",
        app: cfg.app
    }

    return fromFetch(cfg.apiBaseUrl, {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" }
    }).pipe(switchMap(x => x.json()))
}