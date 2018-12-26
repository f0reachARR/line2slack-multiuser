import Client, { LineEventArgs } from '../../..';
import {
    SlackMessageInstance,
    UserInstance
} from '../../../../db';
import {
    decryptGroupMessage,
    decryptMessage,
    getKeyId,
    KeyIdType
} from '../../../../e2ee';
import {
    ContentType,
    Message,
    MIDType,
    OpType
} from '../../../../thrift/talk_types';
import { getDisplayName } from '../../../../utils/line/user';
import { fetchThreadOrCreateThread } from '../../../common/thread';

import noneHandler from './none';
import stickerHandler from './sticker';

export type MessageTransformer = (client: Client, message: Message, sender: UserInstance, thread: SlackMessageInstance) => Promise<{
    text?: string,
    attachments?: SlackMessageAttachment[];
} | Error | void>;

export default async function ({ client, op }: LineEventArgs) {
    if (op.type !== OpType.RECEIVE_MESSAGE) return;
    const { message } = op;
    if (message.contentType === ContentType.NONE || message.contentType === ContentType.LOCATION) {
        const receiverKeyId = getKeyId(message, KeyIdType.Receiver);
        const senderKeyId = getKeyId(message, KeyIdType.Sender);
        if (receiverKeyId < 0 || senderKeyId < 0) // そもそも暗号化されていない
            return;

        const senderKeyEntry = await client.store.e2ee.fetchKey(message.from_, senderKeyId);

        if (message.toType === MIDType.GROUP) {
            const groupSharedKey = await client.store.e2ee.fetchGroupSharedKey(message.to, receiverKeyId);
            decryptGroupMessage(message, groupSharedKey, senderKeyEntry);
        } else if (message.toType === MIDType.USER) {
            const receiverKeyEntry = await client.store.e2ee.fetchSelfKey(receiverKeyId);
            decryptMessage(message, receiverKeyEntry, senderKeyEntry);
        }
    }
    const sender = await client.store.contact.fetchUser(message.from_); // TODO: fromがuserじゃないときあるの？
    const thread = await fetchThreadOrCreateThread(client, message.to, sender);
    const slackOpts = {
        thread_ts: thread.threadTs,
        icon_url: `http://obs.line-cdn.net${sender.picture}/preview`,
        username: getDisplayName(sender)
    };
    if (messageTransformers[message.contentType]) {
        const transformed = await messageTransformers[message.contentType](client, message, sender, thread);
        if (!transformed) return; // 画像など
        if (transformed instanceof Error) {
            // 例外
            await client.webClient.chat.postMessage(client.account.channel, `Failed to process message\n${transformed.message}`, slackOpts);
        } else {
            await client.webClient.chat.postMessage(client.account.channel, transformed.text || '', {
                ...transformed,
                ...slackOpts
            });
        }
        return true;
    } else {
        await client.webClient.chat.postMessage(client.account.channel, 'Unknown message type', slackOpts);
    }
}

const messageTransformers: {
    [type: number]: MessageTransformer
} = {
    [ContentType.NONE]: noneHandler,
    [ContentType.STICKER]: stickerHandler,
};