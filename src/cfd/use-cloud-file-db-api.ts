import { useEffect, useState, useRef } from 'react';
import * as api from './api';
import { Subscription } from 'rxjs';
import { FoldersAndFilesList, MultiUserDocUser } from './public-types';


const populateParent = (foldersAndFiles:FoldersAndFilesList, parent?:FoldersAndFilesList) => {
    if (parent) foldersAndFiles.parent = parent;
    Object.values(foldersAndFiles.folders).map(child => populateParent(child, foldersAndFiles));
}

interface UseCloudFileDbApiProps {
    readonly token:string;
    readonly autoListFoldersAndFiles?:boolean;
    readonly appAndDocId?:{
        readonly app:string;
        readonly docId:string;
    }
    readonly master?:boolean;
}
export const useCloudFileDbApi = <DocType = {}>({
    token,
    autoListFoldersAndFiles,
    appAndDocId,
    master

}:UseCloudFileDbApiProps) => {

    const [ foldersAndFiles, setFoldersAndFiles ] = useState<FoldersAndFilesList>();
    const [ docIds, setDocIds ] = useState<string[]>();
    const [ pingResult, setPingResult ] = useState<string>();
    const [ restartServerResult, setRestartServerResult ] = useState<any>();

    const [ fetching, setFetching ] = useState<boolean>(() => {
        // we might be fetching initially.
        if (appAndDocId) return true;
        if (autoListFoldersAndFiles) return true;
        return false;
    })
    const [ updating, setUpdating ] = useState<boolean>(false);
    const [ deleting, setDeleting ] = useState<boolean>(false);
    const [ err, setErr ] = useState<string>();
    const [ docContents, setDocContents ] = useState<DocType>();


    const sub = useRef<Subscription>();
    const canceled = useRef<boolean>(false);

    const masterDeleteDoc = (props:Omit<api.MasterDeleteDoc, "token">, onDelete?:()=>void) => {
        if (sub.current) sub.current.unsubscribe();
        if (canceled.current) return;
        setDeleting(true);
        setErr('');
        sub.current = api.masterDeleteDoc({ ...props, token }).subscribe(x => {
            if (canceled.current) return;
            setDeleting(false);
            // We do nothing with this. It's simply updated.
            if (!x.err && x.data) {
                if (onDelete) onDelete();
            } else {
                setErr('Could not master delete doc');
            }
        })
    }

    const mergeDoc = (props:Omit<api.MergeMultiUserDocProps<DocType>, "token">, onUpdate?:()=>void) => {
        if (sub.current) sub.current.unsubscribe();
        if (canceled.current) return;
        setUpdating(true);
        setErr('');
        sub.current = api.mergeMultiUserDoc({ ...props, token }).subscribe(x => {
            if (canceled.current) return;
            setUpdating(false);
            // We do nothing with this. It's simply updated.
            if (!x.err && x.data) {
                if (onUpdate) onUpdate();
            } else {
                setErr('Could not merge doc');
            }
        })
    }

    const masterInsertNewUserIntoMuDoc = (
        props:Omit<api.MasterInsertNewUserIntoMuDocProps<MultiUserDocUser<any,any>>, "token">,
        onUpdate?:()=>void
    ) => {
        // assumes master token
        if (sub.current) sub.current.unsubscribe();
        if (canceled.current) return;
        setUpdating(true);
        setErr('');
        sub.current = api.masterInsertNewUserIntoMuDoc({ ...props, token }).subscribe(x => {
            if (canceled.current) return;
            setUpdating(false);
            // We do nothing with this. It's simply updated.
            if (!x.err && x.data) {
                if (onUpdate) onUpdate();
            } else {
                setErr('Could not insert new user into mu doc');
            }
        })
    }

    const masterSetDoc = (props:Omit<api.MasterSetDocProp<DocType>, "token">, onUpdate?:()=>void) => {
        // Master set doc is a little different than set doc: assumes master token and can direct update mu docs.
        if (sub.current) sub.current.unsubscribe();
        if (canceled.current) return;
        setUpdating(true);
        setErr('');
        sub.current = api.masterSetDoc({ ...props, token }).subscribe(x => {
            if (canceled.current) return;
            setUpdating(false);
            // We do nothing with this. It's simply updated.
            if (!x.err && x.data) {
                if (onUpdate) onUpdate();
            } else {
                setErr('Could not master set doc');
            }
        })
    }

    const setDoc = (props:Omit<api.SetDocProps<DocType>, "token">, onUpdate?:()=>void) => {
        if (sub.current) sub.current.unsubscribe();
        if (canceled.current) return;
        setUpdating(true);
        setErr('');
        sub.current = api.setDoc({ ...props, token }).subscribe(x => {
            if (canceled.current) return;
            setUpdating(false);
            // We do nothing with this. It's simply updated.
            if (!x.err && x.data) {
                if (onUpdate) onUpdate();
            } else {
                setErr('Could not set doc');
            }
        })
    }
    
    const masterCreateFolder = (props:Omit<api.MasterCreateFolder, "token">, onCreate?:()=>void) => {
        if (sub.current) sub.current.unsubscribe();
        if (canceled.current) return;
        setUpdating(true);
        setErr('');
        sub.current = api.masterCreateFolder({ ...props, token }).subscribe(x => {
            if (canceled.current) return;
            setUpdating(false);
            if (!x.err && x.data) {
                if (onCreate) onCreate();
            } else {
                setErr('Could not master create folder');
            }
        })
    }

    const masterInsertDoc = (props:Omit<api.MasterInsertDoc<DocType>, "token">, onInsert?:()=>void) => {
        if (sub.current) sub.current.unsubscribe();
        if (canceled.current) return;
        setUpdating(true);
        setErr('');
        sub.current = api.masterInsertDoc({ ...props, token }).subscribe(x => {
            if (canceled.current) return;
            setUpdating(false);
            if (!x.err && x.data) {
                if (onInsert) onInsert();
            } else {
                setErr('Could not master insert doc');
            }
        })
    }

    const insertDoc = (props:Omit<api.InsertDocProps<DocType>, "token">, onInsert?:()=>void) => {
        if (sub.current) sub.current.unsubscribe();
        if (canceled.current) return;
        setUpdating(true);
        setErr('');
        sub.current = api.insertDoc({ ...props, token }).subscribe(x => {
            if (canceled.current) return;
            setUpdating(false);
            if (!x.err && x.data) {
                setDocIds(x.data);
                if (onInsert) onInsert();
            } else {
                setErr('Could not insert doc');
                setDocIds(undefined);
            }
        })
    }

    const listDocIds = (props:Omit<api.ListDocsProps, "token">) => {
        if (sub.current) sub.current.unsubscribe();
        if (canceled.current) return;
        setFetching(true);
        setErr('');
        sub.current = api.listDocs({ ...props, token }).subscribe(x => {
            if (canceled.current) return;
            setFetching(false);
            if (!x.err && x.data) {
                setDocIds(x.data);
            } else {
                setErr('could not list doc ids');
                setDocIds(undefined);
            }
        })
    }

    const masterGetDoc = (props:Omit<api.GetDocProps, "token">) => {
        if (sub.current) sub.current.unsubscribe();
        if (canceled.current) return;
        setFetching(true);
        setErr('');
        sub.current = api.masterGetDoc<DocType>({ ...props, token }).subscribe(x => {
            if (canceled.current) return;
            setFetching(false);
            if (!x.err && x.data) {
                setDocContents(x.data);
            } else {
                setErr('could not master get doc');
                setDocContents(undefined);
            }
        })
    }

    const getDoc = (props:Omit<api.GetDocProps, "token">) => {
        if (sub.current) sub.current.unsubscribe();
        if (canceled.current) return;
        setFetching(true);
        setErr('');
        sub.current = api.getDoc<DocType>({ ...props, token }).subscribe(x => {
            if (canceled.current) return;
            setFetching(false);
            if (!x.err && x.data) {
                setDocContents(x.data);
            } else {
                setErr('could not get doc');
                setDocContents(undefined);
            }
        })
    }

    const pingServer = () => {
        if (sub.current) sub.current.unsubscribe();
        if (canceled.current) return;
        setFetching(true);
        setErr('');
        sub.current = api.ping().subscribe(x => {
            if (canceled.current) return;
            setFetching(false);
            if (!x.err && x.data) {
                setPingResult(x.data);
            } else {
                setErr('could not ping');
                setPingResult(undefined);
            }
        })
    }

    const restartServer = () => {
        if (sub.current) sub.current.unsubscribe();
        if (canceled.current) return;
        setFetching(true);
        setErr('');
        sub.current = api.masterRestart(token).subscribe(x => {
            if (canceled.current) return;
            setFetching(false);
            if (!x.err && x.data) {
                setRestartServerResult(x.data);
            } else {
                setErr('could not restart server');
                setRestartServerResult(undefined);
            }
        })
    }

    const listFoldersAndFiles = () => {
        if (sub.current) sub.current.unsubscribe();
        if (canceled.current) return;
        setFetching(true);
        setErr('');
        sub.current = api.listAll(token).subscribe(x => {
            if (canceled.current) return;
            setFetching(false);
            if (!x.err && x.data) {
                populateParent(x.data); // MUTATES IT
                setFoldersAndFiles(x.data);
            } else {
                setErr('could not list folders and files');
                setFoldersAndFiles(undefined);
            }
        })
    }

    const app = appAndDocId?.app ?? '';
    const docId = appAndDocId?.docId ?? '';

    useEffect(() => {
        if (!app || !docId) return;
        if (master) {
            masterGetDoc({ app, docId });
        } else {
            getDoc({ app, docId });
        }
    }, [app, docId])

    useEffect(() => {
        if (autoListFoldersAndFiles) listFoldersAndFiles();
    }, [autoListFoldersAndFiles])

    useEffect(() => {
        return () => {
            canceled.current = true;
            if (sub.current) sub.current.unsubscribe();
        }
    }, [])

    return {
        fetching,
        updating,
        foldersAndFiles,
        listFoldersAndFiles,
        restartServer,
        restartServerResult,
        pingResult,
        pingServer,
        docContents,
        getDoc,
        docIds,
        listDocIds,
        insertDoc,
        setDoc,
        mergeDoc,
        masterGetDoc,
        masterSetDoc,
        masterDeleteDoc,
        masterInsertDoc,
        masterCreateFolder,
        masterInsertNewUserIntoMuDoc,
        deleting,
        err
    }
}