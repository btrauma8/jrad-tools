import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';
import { cfg } from '../cfg';
import { MultiUserDocAdminUpdate } from '../types';

interface UpdateMultiDocProps<A,B,C,D> {
    readonly app:string;
    readonly docId:string;
    readonly userId:string;
    readonly token?:string;
    readonly data:MultiUserDocAdminUpdate<A,B,C,D>;
}

interface UpdateMultiDocResult {
    readonly err?:string;
    readonly data?:boolean;
}

export const updateMultiDoc = <A,B,C,D>({
    app,
    docId,
    userId,
    token,
    data
}:UpdateMultiDocProps<A,B,C,D>):Observable<UpdateMultiDocResult> => {
    return fromFetch(cfg.apiBaseUrl, {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify({
            action: "UPDATE_MULTI_USER_DOC_AS_ADMIN_USER",
            app,
            docId,
            userId,
            token,
            data: data
        }),
        headers: { "Content-Type": "application/json" }
    }).pipe(switchMap(x => x.json()))
}
