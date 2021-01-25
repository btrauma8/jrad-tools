import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';
import { cfg } from '../cfg';

export interface MergeDocProps<T> {
    readonly app:string;
    readonly docId:string;
    readonly token?:string;
    readonly data:Partial<T>;
}

interface MergeDocResult {
    readonly err?:string;
    readonly data?:boolean;
}

export const mergeDoc = <T>({ app, docId, token, data }:MergeDocProps<T>):Observable<MergeDocResult> => {
    return fromFetch(cfg.apiBaseUrl, {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify({
            action: "UPDATE_MULTI_USER_DOC_AS_ADMIN_USER",
            app,
            docId,
            token,
            data: data
        }),
        headers: { "Content-Type": "application/json" }
    }).pipe(switchMap(x => x.json()))
}
