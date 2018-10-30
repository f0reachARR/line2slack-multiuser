import Client from '..';
import { SlackMessage, UserInstance } from '../../db';
import * as LineTypes from '../../thrift/talk_types';
import { getDisplayName, getMidType } from '../../utils/line/user';

export const fetchThreadOrCreateThread = async (client: Client, toMid: string, user: UserInstance) => {
    let slackThreadInfo = await SlackMessage.findOne({ where: { channel: client.account.channel, mid: toMid } });
    if (slackThreadInfo) return slackThreadInfo;
    let title, picturePath;
    switch (getMidType(toMid)) {
        case LineTypes.MIDType.USER:
            title = getDisplayName(user, true);
            picturePath = user.picture;
            break;
        case LineTypes.MIDType.GROUP:
            const group = await client.store.contact.fetchGroup(toMid);
            title = `グループ: ${group.name}`;
            picturePath = group.picture;
            break;
        default:
            throw new Error('not implemented');
    }
    // Threadを始める
    const threadInfo = await client.webClient.chat.postMessage(client.account.channel, '', {
        attachments: [
            {
                fallback: title,
                title
            }
        ],
        username: title,
        icon_url: picturePath ? `http://obs.line-cdn.net${picturePath}/preview` : undefined
    });
    slackThreadInfo = await SlackMessage.create({
        channel: client.account.channel,
        mid: toMid,
        threadTs: threadInfo.ts,
        isRead: false,
        isReadReacted: false,
        lastMsgId: '0',
        lastMsgTs: threadInfo.ts
    });
    return slackThreadInfo;
};

export const setReadMark = async (client: Client, mid: string) => {
    const slackThreadInfo = await SlackMessage.findOne({ where: { channel: client.account.channel, mid } });
    if (!slackThreadInfo) return;
    await client.webClient.reactions.add('heavy_check_mark', {
        timestamp: slackThreadInfo.lastMsgTs,
        channel: client.account.channel
    });
};