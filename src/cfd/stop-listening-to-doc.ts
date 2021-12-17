import { cfg } from './cfg';
import { getChannelId } from './get-channel-id';

export const stopListeningToDoc = (docId:string, userId?:string) => {
    if (!cfg.rtc) throw new Error('Expected rtClient');
    return cfg.rtc.leaveChannel(getChannelId({ docId, userId }));
}
