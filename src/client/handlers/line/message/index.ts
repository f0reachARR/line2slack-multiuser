import Client from '../../..';
import {
    Operation,
    OpType,
    ContentType,
    MIDType,
    Message
} from '../../../../thrift/talk_types';
import {
    getKeyId,
    KeyIdType,
    decryptGroupMessage,
    decryptMessage
} from '../../../../e2ee';
import { fetchThreadOrCreateThread } from '../../../common/thread';
import { getDisplayName } from '../../../../utils/line/user';
import {
    UserInstance,
    SlackMessageInstance
} from '../../../../db';

export type MessageTransformer = (client: Client, message: Message, sender: UserInstance, thread: SlackMessageInstance) => Promise<{
    text?: string,
    attachments?: SlackMessageAttachment[];
} | Error | void>;
const messageTransformers: {
    [type: number]: MessageTransformer
} = {};

export default async function (this: Client, op: Operation) {
    if (op.type !== OpType.RECEIVE_MESSAGE) return;
    const { message } = op;
    if (message.contentType === ContentType.NONE || message.contentType === ContentType.LOCATION) {
        const receiverKeyId = getKeyId(message, KeyIdType.Receiver);
        const senderKeyId = getKeyId(message, KeyIdType.Sender);
        if (receiverKeyId < 0 || senderKeyId < 0) // そもそも暗号化されていない
            return;

        const senderKeyEntry = await this.store.e2ee.fetchKey(message.from_, senderKeyId);

        if (message.toType === MIDType.GROUP) {
            const groupSharedKey = await this.store.e2ee.fetchGroupSharedKey(message.to, receiverKeyId);
            decryptGroupMessage(message, groupSharedKey, senderKeyEntry);
        } else if (message.toType === MIDType.USER) {
            const receiverKeyEntry = await this.store.e2ee.fetchSelfKey(receiverKeyId);
            decryptMessage(message, receiverKeyEntry, senderKeyEntry);
        }
    }
    const sender = await this.store.contact.fetchUser(message.from_); // TODO: fromがuserじゃないときあるの？
    const thread = await fetchThreadOrCreateThread(this, message.to, sender);
    const slackOpts = {
        as_user: true,
        thread_ts: thread.threadTs,
        icon_url: `http://obs.line-cdn.net${sender.picture}/preview`,
        username: getDisplayName(sender)
    };
    if (messageTransformers[message.contentType]) {
        const transformed = await messageTransformers[message.contentType](this, message, sender, thread);
        if (!transformed) return; // 画像など
        if (transformed instanceof Error) {
            // 例外
            await this.webClient.chat.postMessage(this.account.channel, `Failed to process message\n${transformed.message}`, slackOpts);
        } else {
            await this.webClient.chat.postMessage(this.account.channel, transformed.text || '', {
                ...transformed,
                ...slackOpts
            });
        }
        return true;
    } else {
        await this.webClient.chat.postMessage(this.account.channel, 'Unknown message type', slackOpts);
    }
}

export const registerTransformer = (type: ContentType, handler: MessageTransformer) => {
    messageTransformers[type] = handler;
};

// Import message handlers here
import './none';