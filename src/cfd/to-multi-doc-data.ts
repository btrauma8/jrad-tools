import { MultiDocData, ApiMultiDocResponse } from './public-types';

export const toMultiDocData = <A,B,C,D>(x:ApiMultiDocResponse<A,B,C,D>):MultiDocData<A,B,C,D>|null|undefined => {
    if (!x) return undefined;
    if (typeof x === 'string' && x === 'DOC_EXPIRED') {
        return undefined;
    }
    if (x.user) {
        // non-admin user
        console.log('non admin user', x);
        return {
            admin: false,
            docData: null as any, // fine. won't come up anyway
            docId: x.docId,
            userId: x.userId,
            publicView: x.publicView ?? ({} as B),
            userData: x.user.data  ?? ({} as C),
            userView: x.user.view ?? ({} as D),
        }
    } else if (x.users) {
        // admin user
        const user = Object.values(x.users).find((u:any) => u.id === x.userId) as any;
        return {
            admin: true,
            docData: x.data ?? ({} as A),
            docId: x.docId,
            userId: x.userId,
            users: x.users,
            publicView: x.publicView  ?? ({} as B),
            userData: user.data  ?? ({} as C),
            userView: user.view ?? ({} as D)
        }
    }
    return null;
}