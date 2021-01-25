import { BehaviorSubject, Observable } from 'rxjs';
import { getDocIdAndUserIdFromStorage, setDocIdAndUserIdStorage } from './storage';

interface DocIdAndUserId {
    readonly docId?:string;
    readonly userId?:string;
}

const docIdAndUserIdsByStateId = new Map<string, BehaviorSubject<DocIdAndUserId>>();

export const getLastDocIdAndUserIdByStateId = (stateId:string):DocIdAndUserId|undefined => {
    return docIdAndUserIdsByStateId.get(stateId)?.getValue();
}

export const getDocIdAndUserIdByStateId = (stateId:string):Observable<DocIdAndUserId> => {
    const bs = docIdAndUserIdsByStateId.get(stateId);
    if (bs) return bs.asObservable();
    const newBs = new BehaviorSubject(getDocIdAndUserIdFromStorage(stateId));
    docIdAndUserIdsByStateId.set(stateId, newBs);
    return newBs.asObservable();
}

export const setDocIdAndUserId = (stateId:string, docIdAndUserId:DocIdAndUserId) => {
    setDocIdAndUserIdStorage(stateId, docIdAndUserId);
    const bs = docIdAndUserIdsByStateId.get(stateId);
    if (bs) {
        console.log('not new bs', stateId, docIdAndUserId);
        bs.next(docIdAndUserId);
    } else {
        console.log('New bs', stateId, docIdAndUserId);
        docIdAndUserIdsByStateId.set(stateId, new BehaviorSubject(docIdAndUserId));
    }
}