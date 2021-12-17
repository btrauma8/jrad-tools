import { MultiDocData, ChannelState } from './public-types';

export interface DocIdAndUserId {
    readonly docId?:string;
    readonly userId?:string;
}

export interface FullChannel<DocData,PublicView,UserData,UserView> {
    readonly data:ChannelState<MultiDocData<DocData,PublicView,UserData,UserView>>;
    readonly docIdAndUserId:DocIdAndUserId;
}


export interface ApiResult<T> { 
    readonly err?:string;
    readonly data?:T;
}

export type GetAppFileListResult = ApiResult<{
    readonly app:string;
    readonly name:string;
}>

// THESE TYPES MUST MATCH cloud-file-db
// (except we are putting ? by em for updates)

export interface MultiUserDocAdminUpdate<A,B,C,D> {
    readonly data?:Partial<A>;
    readonly publicView?:Partial<B>;
    readonly userData?:Partial<C>; // the admin's own user data
    readonly userViews?:{[userId:string]:Partial<D>}
    
}
export interface MultiUserDocAdminInsert<A,B,C,D> {
    readonly data:A;
    readonly publicView:B;
    readonly userData:C;
    readonly userView:D;
}


export interface MultiUserDocUser<UserData,UserView> {
    readonly view:UserView;         // only admin user can update this
    readonly data:UserData;         // only the user can update this section
    readonly id:string;             // only can be set upon creation
    readonly admin?:boolean;        // only can be set upon creation
}
export interface MultiUserDoc<DocData,PublicView,UserData,UserView> {
    readonly id:string;
    readonly publicView:PublicView;
    readonly data:DocData;
    readonly users:{[userId:string]:MultiUserDocUser<UserData,UserView>}
    readonly _ttl?:number;
    readonly _expireAt?:number;
}



export interface ApiResult<T> {
    readonly err?:string;
    readonly data?:T;
}


