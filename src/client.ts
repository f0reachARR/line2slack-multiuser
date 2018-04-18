import { RtmClient, WebClient } from '@slack/client';
import * as thrift from 'thrift';
import * as TalkService from './thrift/TalkService';
import * as LineTypes from './thrift/talk_types';

import Config, {
    LINE_APP,
    LINE_NORMAL_ENDPOINT,
    LINE_POLL_ENDPOINT,
    LINE_SYSTEM_NAME,
    E2EE_VERSION,
} from './config';
import { createThrift, createThrift2 } from './utils/thrift';
import { uploadFile } from './utils/slack';
import * as e2ee from './e2ee';
import { get as httpGet, post as httpPost } from './utils/http';
import * as request from 'request';
import { getExtension } from 'mime';

import db, { LineAccount, E2eeKey, User, LineAccountInstance, UserInstance, SlackMessage } from './db';

export default class {
    constructor(private account: LineAccountInstance, private rtmClient: RtmClient, private webClient: WebClient, private catchHandler: (msg: string, channel?: string) => Promise<never>) {
        this.normalClient = createThrift(LINE_NORMAL_ENDPOINT, TalkService, { headers: { 'X-Line-Access': account.token } });
        this.pollingClient = createThrift2(LINE_POLL_ENDPOINT, TalkService, { headers: { 'X-Line-Access': account.token } });
    }

    private normalClient: TalkService.Client;
    private pollingClient: { client: TalkService.Client, conn: thrift.ClientConnection };
    private lastOpNum: number;
    private cancelPromise: Promise<null>;
    private cancelFunction: null | (() => void);

    async startPolling() {
        console.log('Starting...');
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
            const errorPromise = new Promise<null>(resolve => this.pollingClient.conn.once('error', () => resolve(null)));
            const longPollProm = this.pollingClient.client.fetchOperations(this.lastOpNum, 1).catch(r => Promise.resolve(null));
            this.cancelPromise = new Promise(resolve => this.cancelFunction = () => resolve());
            const result = await Promise.race([errorPromise, longPollProm, this.cancelPromise]);
            if (result) {
                for (const item of result) {
                    await this.processOperation(item).catch(msg => this.catchHandler(typeof msg === 'string' ? msg : 'An error occured'));
                }
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
            if (!conversation) return;

            if (!conversation.isRead && conversation.lastMsgId)
                await this.normalClient.sendChatChecked(0, conversation.mid, conversation.lastMsgId, null);
            const lineMsg = new LineTypes.Message();
            lineMsg.contentType = LineTypes.ContentType.NONE;
            lineMsg.from_ = this.account.mid;
            lineMsg.to = conversation.mid;
            lineMsg.toType = this.getMidType(lineMsg.to);
            lineMsg.text = msg.text;
            if (lineMsg.toType === LineTypes.MIDType.USER)
                await this.encryptUserE2ee(lineMsg);
            await this.normalClient.sendMessage(1, lineMsg);
            conversation.isReadReacted = false;
            conversation.isRead = true;
            conversation.lastMsgTs = msg.ts;
            await conversation.save();
        } else if (msg.text.match(/^start (u\w+)$/)) {
            const match = msg.text.match(/^start (u\w+)$/);
            if (!match) return;
            const mid = match[1];
            const midInfo = await this.normalClient.getContact(mid);
            await User.addContact(this.account.mid, midInfo);
            const conversation = await SlackMessage.find({ where: { mid, channel: this.account.channel } });
            if (!conversation) {
                const threadPost = await this.webClient.chat.postMessage(this.account.channel, `Start with ${mid} (${midInfo.displayName})`);
                await SlackMessage.upsert({
                    channel: this.account.channel,
                    mid,
                    threadTs: threadPost.ts,
                    isRead: false,
                    isReadReacted: false,
                    lastMsgId: '',
                    lastMsgTs: threadPost.ts
                }, { fields: ['isRead', 'isReadReacted', 'lastMsgId', 'lastMsgTs'], returning: false });
            }
        } else if (msg.text.match(/^add (u\w+)$/)) {
            const match = msg.text.match(/^add (u\w+)$/);
            if (!match) return;
            const mid = match[1];
            await this.normalClient.findAndAddContactsByMid(0, mid, LineTypes.ContactType.MID, '');
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
            case LineTypes.OpType.RECEIVE_MESSAGE_RECEIPT:
                const conversation = await SlackMessage.find({ where: { channel: this.account.channel, mid: op.param1 } });
                if (conversation && !conversation.isReadReacted) {
                    await this.webClient.reactions.add('heavy_check_mark', {
                        timestamp: conversation.lastMsgTs,
                        channel: this.account.channel
                    });
                    conversation.isReadReacted = true;
                    await conversation.save();
                }
                break;
            default:
                console.log('Unknown operation', op);
        }
        if (op.revision > this.lastOpNum)
            this.lastOpNum = op.revision;
    }

    private async postMessageToSlack(msg: LineTypes.Message) {
        if (!this.account.channel) return;
        if (msg.contentType === LineTypes.ContentType.NONE || msg.contentType === LineTypes.ContentType.LOCATION)
            await this.decryptE2ee(msg);
        const slackMessage: SlackChatPostMessageParams = {
            channel: this.account.channel
        };
        slackMessage.attachments = [];

        let threadMid = ''; // GroupかUserかで異なる

        switch (msg.toType) {
            case LineTypes.MIDType.USER:
                threadMid = msg.from_;
                break;
            case LineTypes.MIDType.GROUP:
                threadMid = msg.to;
                break;
            default: // TODO
                return;
        }

        const slackThreadInfo = await SlackMessage.find({ where: { channel: this.account.channel, mid: threadMid } });
        if (slackThreadInfo)
            slackMessage.thread_ts = slackThreadInfo.threadTs;

        const contact = await this.getUserContact(msg.from_);
        slackMessage.username = this.getDisplayName(contact);
        if (contact.picture)
            slackMessage.icon_url = `http://obs.line-cdn.net${contact.picture}/preview`;
        if (msg.toType === LineTypes.MIDType.GROUP && !slackThreadInfo) {
            const group = await this.normalClient.getGroup(msg.to);
            // Threadを始める
            const threadInfo = await this.webClient.chat.postMessage(this.account.channel, '', {
                attachments: [
                    {
                        fallback: `グループ: ${group.name}`,
                        title: `グループ: ${group.name}`
                    }
                ],
                username: group.name,
                icon_url: `http://obs.line-cdn.net${group.picturePath}/preview`
            });
            slackMessage.thread_ts = threadInfo.ts;
        }

        // ContentTypeで
        switch (msg.contentType) {
            case LineTypes.ContentType.NONE:
                slackMessage.attachments.push({
                    fallback: msg.text || '',
                    text: msg.text
                });
                break;
            case LineTypes.ContentType.STICKER:
                let text = 'Sticker';
                if ('STKTXT' in msg.contentMetadata)
                    text = `Sticker: ${msg.contentMetadata.STKTXT}`;
                if ('STKVER' in msg.contentMetadata && 'STKPKGID' in msg.contentMetadata && 'STKID' in msg.contentMetadata) {
                    const STKVER = Number(msg.contentMetadata.STKVER);
                    const version = `${Math.floor(STKVER / 1000000)}/${Math.floor(STKVER / 1000)}/${STKVER % 1000}`;
                    const url = `http://stickershop.line-cdn.net/products/${version}/${msg.contentMetadata.STKPKGID}/android/stickers/${msg.contentMetadata.STKID}.png`;
                    slackMessage.attachments.push({
                        fallback: text,
                        text,
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

                const attachment: SlackMessageAttachment = {
                    fallback: '位置情報',
                    title: msg.location.title || '位置情報',
                    pretext: '位置情報が送信されました',
                    text: link
                };
                if (msg.location.phone)
                    attachment.fields = [{ title: '電話番号', value: msg.location.phone }];

                slackMessage.attachments.push(attachment);
                break;
            case LineTypes.ContentType.IMAGE:
            case LineTypes.ContentType.AUDIO:
            case LineTypes.ContentType.FILE:
                const imageRes = await httpGet({
                    url: `https://obs-us.line-apps.com/talk/m/download.nhn?oid=${msg.id}`,
                    headers: {
                        'X-Line-Application': LINE_APP,
                        'X-Line-Access': this.account.token
                    },
                    encoding: null
                });
                const mime = imageRes.headers['content-type'] || 'image/jpg';
                const fname = msg.contentMetadata['FILE_NAME'] || `${msg.id}.${getExtension(mime)}`;
                const fileUpInfo = await uploadFile(Config.slack.token, imageRes.body as Buffer, [this.account.channel], mime, fname);
                if (fileUpInfo.ok) {
                    if (mime.startsWith('image')) {
                        slackMessage.attachments.push({
                            fallback: '画像が送信されました',
                            pretext: '画像が送信されました',
                            text: `<${fileUpInfo.file.permalink}>`,
                            image_url: fileUpInfo.file.thumb_480
                        });
                    } else {
                        slackMessage.attachments.push({
                            fallback: 'ファイルが送信されました',
                            title: 'ファイルが送信されました',
                            title_link: fileUpInfo.file.permalink
                        });
                    }
                }
                break;
            case LineTypes.ContentType.VIDEO:
                const videoLink = await httpPost({
                    url: 'https://obs.line-apps.com/talk/m/rts_url.nhn',
                    headers: {
                        'X-Line-Application': LINE_APP,
                        'X-Line-Access': this.account.token
                    },
                    method: 'POST',
                    form: {
                        ver: 1,
                        oid: msg.id,
                        modelName: 'CHROMEOS',
                        networkType: 'wifi',
                        userAgent: 'obs',
                        applicationVersion: '1.4.10',
                        lang: 'ja'
                    },
                    encoding: 'utf8'
                });
                const videoLinkInfo = JSON.parse(videoLink.body) as { video?: { downloadUrl?: string } };
                if (videoLinkInfo.video && videoLinkInfo.video.downloadUrl) {
                    slackMessage.attachments.push({
                        fallback: '動画が送信されました',
                        pretext: '動画が送信されました',
                        title: `動画 <${msg.id}>`,
                        title_link: videoLinkInfo.video.downloadUrl
                    });
                } else {
                    slackMessage.text = '動画が送信されましたが、情報を取得できませんでした';
                }
                break;
            default: // TODO
                return;
        }
        const slackResult = await this.webClient.chat.postMessage(this.account.channel, slackMessage.text || '', slackMessage);
        if (slackResult.ok) {
            await SlackMessage.upsert({
                channel: this.account.channel,
                mid: threadMid,
                threadTs: slackMessage.thread_ts || slackResult.ts,
                isRead: false,
                isReadReacted: false,
                lastMsgId: msg.id,
                lastMsgTs: slackResult.ts
            }, { fields: ['isRead', 'isReadReacted', 'lastMsgId', 'lastMsgTs'], returning: false });
            // await this.normalClient.sendMessageReceipt(0, msg.to, [msg.id]);
        } else {
            return Promise.reject(slackResult.error);
        }
    }

    private async decryptE2ee(msg: LineTypes.Message) {
        const receiverKeyId = e2ee.getKeyId(msg, e2ee.KeyIdType.Receiver);
        if (receiverKeyId < 0) // そもそも暗号化されていない
            return;
        const senderKeyId = e2ee.getKeyId(msg, e2ee.KeyIdType.Sender);
        if (senderKeyId < 0) // もう弾かれているはず
            return Promise.reject('Invalid format');
        const senderKeyEntry = await this.getE2EEKey(msg.from_, senderKeyId);
        const senderKeyPair = {
            keyId: senderKeyEntry.keyId,
            publicKey: Buffer.from(senderKeyEntry.publicKey, 'base64'),
        };
        if (msg.toType === LineTypes.MIDType.GROUP) {
            let groupSharedKeyEntry = await E2eeKey.find({ where: { mid: msg.to, keyId: receiverKeyId } });
            if (!groupSharedKeyEntry) { // GroupSharedKeyを取得してくる
                const groupKey = await this.normalClient.getE2EEGroupSharedKey(1, msg.to, receiverKeyId);
                if (!groupKey || !groupKey.encryptedSharedKey || groupKey.groupKeyId !== receiverKeyId || groupKey.receiver !== this.account.mid) // 受取MIDが違う時など
                    return Promise.reject('Returned invalid group key');
                const selfKeyEntry = await this.getE2EEKey(this.account.mid, groupKey.receiverKeyId);
                if (!selfKeyEntry.privateKey) {
                    // 自分の秘密鍵は絶対なければいけない
                    return Promise.reject('There is no self key');
                }
                const creatorKeyEntry = await this.getE2EEKey(groupKey.creator, groupKey.creatorKeyId);
                const groupSharedKey = e2ee.decryptGroupSharedKey(msg, groupKey.encryptedSharedKey, {
                    keyId: selfKeyEntry.keyId,
                    publicKey: Buffer.from(selfKeyEntry.publicKey, 'base64'),
                    privateKey: Buffer.from(selfKeyEntry.privateKey, 'base64')
                }, {
                        keyId: creatorKeyEntry.keyId,
                        publicKey: Buffer.from(creatorKeyEntry.publicKey, 'base64'),
                    });
                groupSharedKeyEntry = await E2eeKey.create({
                    mid: msg.to,
                    keyId: receiverKeyId,
                    publicKey: '',
                    privateKey: groupSharedKey.toString('base64')
                });
            }
            if (groupSharedKeyEntry.privateKey)
                e2ee.decryptGroupMessage(msg, Buffer.from(groupSharedKeyEntry.privateKey, 'base64'), senderKeyPair);
        } else if (msg.toType === LineTypes.MIDType.USER) {
            const receiverKeyEntry = await this.getE2EEKey(this.account.mid, receiverKeyId);
            if (!receiverKeyEntry.privateKey) {
                // 1<->1の場合自分の秘密鍵は絶対なければいけない
                return Promise.reject('There is no self key');
            }
            e2ee.decryptMessage(msg, {
                keyId: receiverKeyEntry.keyId,
                publicKey: Buffer.from(receiverKeyEntry.publicKey, 'base64'),
                privateKey: Buffer.from(receiverKeyEntry.privateKey, 'base64')
            }, senderKeyPair);
        }
    }

    private async encryptUserE2ee(msg: LineTypes.Message) {
        const selfKeyEntry = await E2eeKey.find({ where: { mid: this.account.mid }, order: [['keyId', 'DESC']] });
        if (!selfKeyEntry || !selfKeyEntry.privateKey) {
            return Promise.reject('There is no key to encrypt message');
        }
        let targetKeyEntry = await E2eeKey.find({ where: { mid: msg.to }, order: [['keyId', 'DESC']] });
        if (!targetKeyEntry) {
            const receiverKeyInfo = await this.normalClient.negotiateE2EEPublicKey(msg.to);
            if (receiverKeyInfo.publicKey && receiverKeyInfo.publicKey.keyData)
                targetKeyEntry = await E2eeKey.create({
                    mid: msg.to,
                    publicKey: receiverKeyInfo.publicKey.keyData.toString('base64'),
                    keyId: receiverKeyInfo.publicKey.keyId
                });
            else return;
        }
        e2ee.encryptMessage(msg, {
            keyId: selfKeyEntry.keyId,
            publicKey: Buffer.from(selfKeyEntry.publicKey, 'base64'),
            privateKey: Buffer.from(selfKeyEntry.privateKey, 'base64')
        }, {
                keyId: targetKeyEntry.keyId,
                publicKey: Buffer.from(targetKeyEntry.publicKey, 'base64'),
            });
    }

    private async getE2EEKey(mid: string, keyId: number) {
        let keyEntry = await E2eeKey.find({ where: { mid, keyId } });
        if (!keyEntry) {
            if (mid === this.account.mid)
                return Promise.reject('Cannot fetch self key');

            const keyInfo = await this.normalClient.getE2EEPublicKey(mid, E2EE_VERSION, keyId);
            if (!keyInfo || !keyInfo.keyData)
                return Promise.reject('Failed to get E2EEPublicKey');

            keyEntry = await E2eeKey.create({
                mid,
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
                    [Symbol('gt')]: new Date(Date.now() - 24 * 60 * 60 * 1000) // contactはあくまでキャッシュ
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

    private getMidType(mid: string): LineTypes.MIDType {
        switch (mid.substr(0, 1)) {
            case 'u':
                return LineTypes.MIDType.USER;
            case 'c':
                return LineTypes.MIDType.GROUP;
            default:
                throw new Error();
        }
    }
}
