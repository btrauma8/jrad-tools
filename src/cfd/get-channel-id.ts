import { cfg } from './cfg';

export const getChannelId = (doc:string, userId?:string) => {
    if (userId) return cfg.app + '^' + doc + ':' + userId;
    return cfg.app + '^' + doc;
}
