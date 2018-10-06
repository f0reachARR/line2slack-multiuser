import Client from '..';

import { E2eeKey } from '../../db';
import { E2EE_VERSION } from '../../config';
import { decryptGroupSharedKey } from '../../e2ee';

export default class E2eeStore {
    constructor(private client: Client) { }

    get selfMid() { return this.client.account.mid; }

    async fetchKey(mid: string, keyId: number) {
        let keyEntry = await E2eeKey.find({ where: { mid, keyId } });
        if (!keyEntry) {
            if (mid === this.selfMid)
                throw new Error('Self key could not be fetched');

            const keyInfo = await this.client.lineClient.getE2EEPublicKey(mid, E2EE_VERSION, keyId);
            if (!keyInfo || !keyInfo.keyData)
                throw new Error('Failed to get E2EEPublicKey');

            keyEntry = await E2eeKey.create({
                mid,
                keyId: keyInfo.keyId,
                publicKey: keyInfo.keyData
            });
            if (!keyEntry)
                throw new Error('Failed to create keyEntry');
        }
        return keyEntry;
    }

    async fetchSelfKey(keyId: number) {
        const selfKey = await this.fetchKey(this.selfMid, keyId);
        if (!selfKey.privateKey) {
            throw new Error('There is no self key');
        }
        return selfKey;
    }

    async fetchGroupSharedKey(groupMid: string, groupKeyId: number) {
        let groupSharedKeyEntry = await E2eeKey.find({ where: { mid: groupMid, keyId: groupKeyId } });
        if (!groupSharedKeyEntry) { // GroupSharedKeyを取得してくる
            const groupKey = await this.client.lineClient.getE2EEGroupSharedKey(1, groupMid, groupKeyId);
            if (!groupKey ||
                !groupKey.encryptedSharedKey ||
                groupKey.groupKeyId !== groupKeyId ||
                groupKey.receiver !== this.selfMid) // 受取MIDが違う時など
                throw new Error('Received invalid group key');
            const selfKeyEntry = await this.fetchSelfKey(groupKey.receiverKeyId);
            const creatorKeyEntry = await this.fetchKey(groupKey.creator, groupKey.creatorKeyId);
            const groupSharedKey = decryptGroupSharedKey(
                groupKey.encryptedSharedKey,
                selfKeyEntry,
                creatorKeyEntry
            );
            groupSharedKeyEntry = await E2eeKey.create({
                mid: groupMid,
                keyId: groupKeyId,
                publicKey: Buffer.from('DUMMY'),
                privateKey: groupSharedKey
            });
            if (!groupSharedKeyEntry)
                throw new Error('Failed to create groupSharedKeyEntry');
        }
        if (!groupSharedKeyEntry.privateKey) {
            throw new Error('The key does not contain shared key');
        }
        return groupSharedKeyEntry.privateKey;
    }

}