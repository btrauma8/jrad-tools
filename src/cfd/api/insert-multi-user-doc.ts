import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';
import { cfg } from '../cfg';
import { MultiUserDocAdminUpdate } from '../types';

interface InsertMultiUserDocProps<A,B,C,D> {
    readonly app:string;
    readonly token?:string;
    readonly update:MultiUserDocAdminUpdate<A,B,C,D>;
}

interface InsertMultiUserDocResult {
    readonly err?:string;
    readonly data?:{
        readonly docId:string;
        readonly userId:string;
    }
}

export const insertMultiUserDoc = <A,B,C,D>({
    app,
    token,
    update
}:InsertMultiUserDocProps<A,B,C,D>):Observable<InsertMultiUserDocResult> => {
    return fromFetch(cfg.apiBaseUrl, {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify({
            action: "INSERT_MULTI_USER_DOC",
            app,
            token,
            data: update
        }),
        headers: { "Content-Type": "application/json" }
    }).pipe(switchMap(x => x.json()))
}
