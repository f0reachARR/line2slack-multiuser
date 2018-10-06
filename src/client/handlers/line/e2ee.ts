import Client from '../..';
import {
    ContentType,
    MIDType,
    Operation,
    OpType
} from '../../../thrift/talk_types';
import {
    decryptGroupMessage,
    getKeyId,
    KeyIdType,
    decryptMessage
} from '../../../e2ee';

export default async function (this: Client, op: Operation) {
    if (op.type !== OpType.RECEIVE_MESSAGE) return;
    const { message } = op;
    if (message.contentType !== ContentType.NONE && message.contentType !== ContentType.LOCATION) return;
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