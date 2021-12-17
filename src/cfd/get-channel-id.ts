import { cfg } from './cfg';

interface GetChannelIdProps {
    readonly docId:string;
    readonly app?:string;
    readonly userId?:string;
}
export const getChannelId = ({ docId, app, userId }:GetChannelIdProps) => {
    const _app = app ?? cfg.app;
    if (userId) return _app + '^' + docId + ':' + userId;
    return _app + '^' + docId;
}
