import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';
import { cfg } from '../cfg';

interface IsValidMultiDocUserProps {
    readonly app:string;
    readonly docId:string;
    readonly userId:string;
    readonly token?:string;
}


interface IsValidMultiDocUserResult {
    readonly err?:string;
    readonly data?:boolean;
}

export const isValidMultiDocUser = <T>({ app, docId, userId, token }:IsValidMultiDocUserProps):Observable<IsValidMultiDocUserResult> => {
    return fromFetch(cfg.apiBaseUrl, {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify({
            action: "IS_VALID_MULTI_DOC_USER",
            app,
            docId,
            userId,
            token
        }),
        headers: { "Content-Type": "application/json" }
    }).pipe(switchMap(x => x.json()))
}
