import { DocIdAndUserId } from './types';

const getKey = (stateId:string) => 'm.' + stateId;

export const clearDocIdAndUserIdStorage = (stateId:string) => localStorage.removeItem(getKey(stateId));

export const getDocIdAndUserIdFromStorage = (stateId:string):DocIdAndUserId => {
    const json = localStorage[getKey(stateId)];
    if (!json) return {};
    try {
        const obj = JSON.parse(json);
        if (typeof obj !== 'object') return {};
        const { docId, userId } = obj;
        return {
            docId,
            userId
        }
    } catch (err) {
        return {}
    }
}

export const setDocIdAndUserIdStorage = (stateId:string, docIdAndUserId:DocIdAndUserId) => {
    localStorage.setItem(getKey(stateId), JSON.stringify(docIdAndUserId));
}
