export type ChannelStatus =
    | "ERROR"
    | "INITIALIZING"
    | "CONNECTED"
    | "FAILED_TO_JOIN"
    | "EXPIRED"
    | "NOT_CONNECTED"
    | "TIMED_OUT"; // means websocket is now dead.

export interface ChannelState<T> {
    readonly value:T|null;
    readonly status:ChannelStatus;
}


export interface MultiDocHookProp<DocData={},PublicView={},UserData={},UserView={}> {
    readonly docData:DocData;
    readonly publicView:PublicView;
    readonly userData:UserData;
    readonly userView:UserView;
}

export interface MultiDocData<DocData,PublicView,UserData,UserView> {
    readonly docId:string;
    readonly userId:string;
    readonly docData:DocData;
    readonly publicView:PublicView;
    readonly userView:UserView;
    readonly userData:UserData;
    readonly users?:{
        [userId:string]: {
            readonly id:string;
            readonly admin:boolean;
            readonly data:UserData;
            readonly view:UserView;
        }
    };
    readonly admin:boolean;
}

// Api tell it to us like this:
export interface ApiMultiDocResponse<DocData,PublicView,UserData,UserView> {
    readonly docId:string;
    readonly data:DocData;
    readonly userId:string;
    readonly publicView:PublicView;
    readonly user?: {
        readonly data:UserData;
        readonly view:UserView;
    }
    readonly users?:{
        [userId:string]: {
            readonly id:string;
            readonly admin:boolean;
            readonly data:UserData;
            readonly view:UserView;
        }
    }
}

export interface FoldersAndFilesList {
    readonly files:string[];
    readonly folder:string;
    readonly folders:{[name:string]:FoldersAndFilesList}
    parent?:FoldersAndFilesList; // used by ui only. mutable.
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