import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';
import { cfg } from '../cfg';

export interface MergeDocProps<T> {
    readonly app:string;
    readonly docId:string;
    readonly token?:string;
    readonly data:Partial<T>;
    readonly nullMeansDelete?:boolean;
}

interface MergeDocResult {
    readonly err?:string;
    readonly data?:boolean;
}

export const mergeDoc = <T>({ app, docId, token, data, nullMeansDelete }:MergeDocProps<T>):Observable<MergeDocResult> => {
    return fromFetch(cfg.apiBaseUrl, {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify({
            action: "MERGE_DOC",
            app,
            docId,
            token,
            data,
            nullMeansDelete
        }),
        headers: { "Content-Type": "application/json" }
    }).pipe(switchMap(x => x.json()))
}
