import { RtmClient, WebClient } from '@slack/client';
import * as thrift from 'thrift';
import * as TalkService from './thrift/TalkService';
import * as LineTypes from './thrift/talk_types';

import Config, {
    LINE_APP,
    LINE_AUTH_ENDPOINT,
    LINE_POLL_ENDPOINT,
    LINE_SYSTEM_NAME,
    E2EE_VERSION,
} from './config';
import { createThrift, createThrift2 } from './utils/thrift';
import { uploadFile } from './utils/slack';
import * as e2ee from './e2ee';
import * as request from 'request';

import db, { Account, E2eeKey, User, AccountInstance, UserInstance, SlackMessage } from './db';

export default class {
    constructor(private account: AccountInstance, private rtmClient: RtmClient, private webClient: WebClient, private catchHandler: (msg: string, channel?: string) => Promise<never>) {
        this.normalClient = createThrift(LINE_AUTH_ENDPOINT, TalkService, { headers: { 'X-Line-Access': account.token } });
        this.pollingClient = createThrift2(LINE_POLL_ENDPOINT, TalkService, { headers: { 'X-Line-Access': account.token } });
    }

    private normalClient: TalkService.Client;
    private pollingClient: { client: TalkService.Client, conn: thrift.ClientConnection };
    private lastOpNum: number;
    private cancelPromise: Promise<null>;
    private cancelFunction: null | (() => void);

    async startPolling() {
        const lastOpNum = await this.normalClient.getLastOpRevision().catch(() => null);
        if (!lastOpNum) return Promise.reject('Failed to getLastOp');
        this.lastOpNum = lastOpNum;
        this.cancelFunction = () => null;

        // Setup Slack Event
        const handler = msg => this.processMessage(msg);
        this.rtmClient.on('message', handler);

        // Polling Loop
        while (this.cancelFunction) {
            this.pollingClient.conn.removeAllListeners('error');
            let errorPromise = new Promise<null>(resolve => this.pollingClient.conn.once('error', () => resolve(null)));
            let longPollProm = this.pollingClient.client.fetchOperations(this.lastOpNum, 1).catch(r => Promise.resolve(null));
            this.cancelPromise = new Promise(resolve => this.cancelFunction = () => resolve());
            let result = await Promise.race([errorPromise, longPollProm, this.cancelPromise]);
            if (result) {
                await result.reduce((prev, curr) => prev.then(() => this.processOperation(curr)), Promise.resolve())
                    .catch(msg => this.catchHandler(typeof msg === 'string' ? msg : 'An error occured'));
            }
            console.log('Poll end', this.account.mid);
        }
        this.rtmClient.removeListener('message', handler);
        console.log('Stopped');
    }

    async stopPolling() {
        console.log('Stopping....');
        if (this.cancelFunction) this.cancelFunction();
        this.cancelFunction = null;
    }

    private async processMessage(msg: SlackMessageEvent) {
        if (msg.user !== Config.slack.user || msg.channel !== this.account.channel) return;
        if (msg.thread_ts) {
            const conversation = await SlackMessage.find({ where: { threadTs: msg.thread_ts } });
        }
    }
    private async processOperation(op: LineTypes.Operation) {
        switch (op.type) {
            case LineTypes.OpType.RECEIVE_MESSAGE:
                await this.postMessageToSlack(op.message);
                break;
            case LineTypes.OpType.NOTIFIED_UPDATE_PROFILE:
                const contact = await this.normalClient.getContact(op.param1);
                await User.addContact(this.account.mid, contact);
                console.log('Profile updated', contact.mid);
                break;
            case LineTypes.OpType.UPDATE_PROFILE:
                const profile = await this.normalClient.getProfile();
                await User.addProfile(profile);
                break;
            case LineTypes.OpType.NOTIFIED_E2EE_KEY_UPDATE:
                // TODO
                break;
            case LineTypes.OpType.NOTIFIED_READ_MESSAGE:
                break;
        }
        if (op.revision > this.lastOpNum)
            this.lastOpNum = op.revision;
    }

    private async postMessageToSlack(msg: LineTypes.Message) {
        if (!this.account.channel) return;
        if (msg.contentType === LineTypes.ContentType.NONE || msg.contentType === LineTypes.ContentType.LOCATION)
            await this.decryptUserE2ee(msg);
        let slackMessage: SlackChatPostMessageParams = {
            channel: this.account.channel
        };
        slackMessage.attachments = [];

        let senderMid = ''; // GroupかUserかで異なる
        // 送り先種別で
        switch (msg.toType) {
            case LineTypes.MIDType.USER:
                const contact = await this.getUserContact(msg.from_);
                slackMessage.username = this.getDisplayName(contact);
                slackMessage.icon_url = `http://obs.line-cdn.net${contact.picture}/preview`;
                senderMid = msg.from_;
                break;
            default: // TODO
                return;
        }

        const slackThreadInfo = await SlackMessage.find({ where: { channel: this.account.channel, mid: senderMid } });
        if (slackThreadInfo)
            slackMessage.thread_ts = slackThreadInfo.threadTs;

        // ContentTypeで
        switch (msg.contentType) {
            case LineTypes.ContentType.NONE:
                slackMessage.text = msg.text;
                break;
            case LineTypes.ContentType.STICKER:
                let fallback = 'Sticker';
                if ('STKTXT' in msg.contentMetadata)
                    fallback = `Sticker: ${msg.contentMetadata.STKTXT}`;
                if ('STKVER' in msg.contentMetadata && 'STKPKGID' in msg.contentMetadata && 'STKID' in msg.contentMetadata) {
                    const STKVER = parseInt(msg.contentMetadata.STKVER, 10);
                    const version = `${Math.floor(STKVER / 1000000)}/${Math.floor(STKVER / 1000)}/${STKVER % 1000}`;
                    const url = `http://stickershop.line-cdn.net/products/${version}/${msg.contentMetadata.STKPKGID}/android/stickers/${msg.contentMetadata.STKID}.png`;
                    slackMessage.attachments.push({
                        fallback: fallback,
                        image_url: url
                    });
                }
                break;
            case LineTypes.ContentType.LOCATION:
                if (!msg.location) return;
                let link = '';
                if (msg.location.latitude && msg.location.longitude)
                    link = `https://www.google.co.jp/maps?q=${msg.location.latitude},${msg.location.longitude}`;
                else if (msg.location.address)
                    link = `https://www.google.co.jp/maps?q=${msg.location.address}`;
                else
                    return Promise.reject('Invalid location');

                if (msg.location.address)
                    link = `<${link}|${msg.location.address}>`;

                let attachment: SlackMessageAttachment = {
                    fallback: '位置情報',
                    title: msg.location.title || '位置情報',
                    pretext: '位置情報が送信されました',
                    text: link
                };
                if (msg.location.phone)
                    attachment.fields = [{ title: '電話番号', value: msg.location.phone }];

                slackMessage.attachments.push(attachment);
                break;
            default: // TODO
                return;
        }
        const slackResult = await this.webClient.chat.postMessage(this.account.channel, slackMessage.text || '', slackMessage);
        if (slackResult.ok) {
            await SlackMessage.upsert({
                channel: this.account.channel,
                mid: senderMid,
                threadTs: slackMessage.thread_ts || slackResult.ts,
                isRead: false,
                isReadReacted: false,
                lastMsgId: msg.id,
                lastMsgTs: slackResult.ts
            }, { fields: ['isRead', 'isReadReacted', 'lastMsgId', 'lastMsgTs'] });
        } else {
            return Promise.reject(slackResult.error);
        }
    }

    private async decryptUserE2ee(msg: LineTypes.Message) {
        const selfKeyId = e2ee.getKeyId(msg, e2ee.KeyIdType.Self);
        if (selfKeyId < 0) // そもそも暗号化されていない
            return Promise.resolve();
        const senderKeyId = e2ee.getKeyId(msg, e2ee.KeyIdType.Sender);
        if (senderKeyId < 0) // もう弾かれているはず
            return Promise.reject('Invalid format');
        const selfKeyEntry = await E2eeKey.find({ where: { mid: this.account.mid, keyId: selfKeyId } });
        if (!selfKeyEntry || !selfKeyEntry.privateKey) {
            // 自分の鍵は絶対なければいけない
            return Promise.reject('There is no key to decrypt message');
        }
        let senderKeyEntry = await this.getE2EEKey(msg.from_, senderKeyId);
        e2ee.decryptMessage(msg, {
            keyId: selfKeyEntry.keyId,
            publicKey: new Buffer(selfKeyEntry.publicKey, 'base64'),
            privateKey: new Buffer(selfKeyEntry.privateKey, 'base64')
        }, {
                keyId: senderKeyEntry.keyId,
                publicKey: new Buffer(senderKeyEntry.publicKey, 'base64'),
            });
    }

    private async getE2EEKey(mid: string, keyId: number) {
        let keyEntry = await E2eeKey.find({ where: { mid, keyId } });
        if (!keyEntry) {
            const keyInfo = await this.normalClient.getE2EEPublicKey(mid, E2EE_VERSION, keyId);
            if (!keyInfo)
                return Promise.reject('Failed to get E2EEPublicKey');

            keyEntry = await E2eeKey.create({
                mid: mid,
                keyId: keyInfo.keyId,
                publicKey: keyInfo.keyData.toString('base64')
            });
            if (!keyEntry) return Promise.reject('Failed to create');
        }
        return keyEntry;
    }

    private async getUserContact(mid: string): Promise<UserInstance> {
        let contactEntry = await User.find({
            where: {
                selfMid: this.account.mid,
                mid,
                updatedAt: {
                    [Symbol('gt')]: new Date(Date.now() - 24 * 60 * 60 * 1000)
                }
            }
        });
        if (contactEntry) return contactEntry;
        const contactInfo = await this.normalClient.getContact(mid);
        contactEntry = await User.addContact(this.account.mid, contactInfo);
        return contactEntry || Promise.reject('err');
    }

    private getDisplayName(user: UserInstance) {
        return user.customName || user.name;
    }
}