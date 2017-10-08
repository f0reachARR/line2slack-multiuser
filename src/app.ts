import * as TalkService from './thrift/TalkService';
import * as LineTypes from './thrift/talk_types';
import { MemoryDataStore, RtmClient, WebClient } from '@slack/client';
import { imageSync as createQrCode } from 'qr-image';
import * as thrift from 'thrift';

import Config, {
    LINE_APP,
    LINE_UNAUTH_ENDPOINT,
    LINE_AUTH_ENDPOINT,
    LINE_POLL_ENDPOINT,
    LINE_SYSTEM_NAME,
    LINE_QR_POLL
} from './config';
import { promisize, waitPromise } from './utils/promisize';
import { createThrift } from './utils/thrift';
import { uploadFile } from './utils/slack';
import * as e2ee from './e2ee';
import * as request from 'request';
import db, { Account, E2eeKey, User, AccountInstance, UserInstance } from './db';
import Client from './client';

const slackRtm = new RtmClient(Config.slack.token, {
    dataStore: new MemoryDataStore(),
    autoReconnect: true
});
const slackApi = new WebClient(Config.slack.token);
const slackAppApi = new WebClient(Config.slack.appToken);

const clients: { [mid: string]: Client } = {};

(async () => {
    const selfUid = (await slackApi.auth.test()).user_id;
    slackRtm.on('message', async message => {
        if (message.user !== Config.slack.user) return;
        if (message.channel.startsWith('D')) { // is DM?
            if (message.text === 'login') {
                console.log('Login session started');
                const loginConn = createThrift<TalkService.Client>(LINE_UNAUTH_ENDPOINT, TalkService);
                const keyForEx = e2ee.generateKeyPair();
                const qrLoginInfo = await loginConn.getAuthQrcode(true, LINE_SYSTEM_NAME, true).catch(() => sendError('Failed to getAuthQrcode'));
                if (!qrLoginInfo) return;
                const qrImage = createQrCode(`${qrLoginInfo.callbackUrl}?${e2ee.generateE2eeQrParam(keyForEx)}`, { type: 'png' }) as Buffer;
                const qrFileInfo: any = await uploadFile(Config.slack.token, qrImage, [message.channel], 'image/png', 'qrcode.png').catch(() => sendError('Failed to upload QRCODE'));
                if (!qrFileInfo || !('file' in qrFileInfo) || !('id' in qrFileInfo.file)) {
                    await sendError('Failed to upload QRCODE');
                    return;
                }
                request.get(LINE_QR_POLL, {
                    headers: {
                        'X-Line-Application': LINE_APP,
                        'X-Line-Access': qrLoginInfo.verifier
                    },
                    json: true
                }, async (err, res, body) => {
                    // QRコード画像消去
                    await slackApi.files.delete(qrFileInfo.file.id).catch(() => null).catch(() => sendError('Failed to delete'));
                    if (err || !body || !('result' in body) || !('verifier' in body.result) || body.result.authPhase !== 'QRCODE_VERIFIED') {
                        await sendError('Login session timed out');
                        return;
                    }

                    // E2EE鍵復号
                    const meta = body.result.metadata;
                    // ログイン
                    const chain = e2ee.decryptKeychain(keyForEx, meta.encryptedKeyChain, meta.publicKey, meta.hashKeyChain);
                    const loginResult = await loginConn.loginWithVerifierForCertificate(body.result.verifier).catch(() => sendError('Failed to login'));
                    if (!loginResult || !loginResult.authToken) {
                        await sendError('Failed to login');
                        return;
                    }

                    // profile取得
                    const userConn = createThrift<TalkService.Client>(LINE_AUTH_ENDPOINT, TalkService, { headers: { 'X-Line-Access': loginResult.authToken } });
                    const profile = await userConn.getProfile().catch(() => sendError('Failed to get profile'));
                    if (!profile || !profile.mid) {
                        await sendError('Failed to get profile');
                        return;
                    }
                    await User.addProfile(profile).catch(() => sendError('Failed to store profile'));
                    console.log('logged in', 'mid', profile.mid);

                    // MIDがすでにあるか(チャンネルをこの後作成するためupsertしない)
                    let accountEntry = await Account.find({ where: { mid: profile.mid } }).catch(() => sendError('Failed to check data'));
                    if (accountEntry) {
                        console.log('Account already created');
                        accountEntry.token = loginResult.authToken;
                        await accountEntry.save().catch(() => sendError('Failed to save'));
                    } else {
                        accountEntry = await Account.create({ mid: profile.mid, token: loginResult.authToken }).catch(() => sendError('Failed to create'));
                        console.log('Account created');
                    }

                    // E2EE鍵->DB(upsert)
                    await chain.map(key => ({
                        keyId: key.keyId,
                        privateKey: Buffer.from(key.privateKey).toString('base64'),
                        publicKey: Buffer.from(key.publicKey).toString('base64'),
                        mid: profile.mid
                    })).reduce((prev: Promise<any>, curr) => {
                        return prev.then(() => E2eeKey.upsert(curr, { fields: ['privateKey', 'publicKey'] }))
                            .then(isCreated => console.log(curr.keyId, isCreated ? 'Key added' : 'Key updated'));
                    }, Promise.resolve()).catch(() => sendError('Failed to add key'));

                    // チャンネル確認+作成
                    if (accountEntry.channel && accountEntry.channel.length !== 0) {
                        const channelInfo = await slackAppApi.groups.info(accountEntry.channel).catch(() => null);
                        if (!channelInfo || !channelInfo.ok || channelInfo.group.is_archived) {
                            console.log('Unknown channel', channelInfo);
                            accountEntry.channel = '';
                        }
                    }
                    if (!accountEntry.channel || accountEntry.channel.length === 0) {
                        console.log('Creating channel');
                        const slackChannel = await slackAppApi.groups.create(`l2s-${Math.floor(Date.now() / 1000)}`).catch(() => sendError('Failed to create channel to communicate'));
                        if (!slackChannel) return;
                        const inviteRes = await slackAppApi.groups.invite(slackChannel.group.id, selfUid).catch(() => sendError('Failed to invite'));
                        if (!inviteRes) return;
                        accountEntry.channel = slackChannel.group.id;
                        await accountEntry.save().catch(() => sendError('Failed to save'));
                    } else {
                        console.log('Channel already created');
                    }

                    // 友だちリスト取得
                    const contactMids = await userConn.getAllContactIds().catch(() => sendError('Failed to get contact'));
                    if (!contactMids) return;
                    const contacts = await userConn.getContacts(contactMids).catch(() => sendError('Failed to get contact'));
                    if (!contacts) return;

                    // 友だちリスト格納
                    await contacts.reduce((prev: Promise<any>, curr) => prev.then(() => User.addContact(profile.mid, curr).catch(() => sendError('Failed to store contacts'))), Promise.resolve());
                    console.log('Contacts stored');

                    if (clients[profile.mid]) {
                        await clients[profile.mid].stopPolling();
                    }
                    clients[profile.mid] = new Client(accountEntry, slackRtm, slackApi, sendError);
                    clients[profile.mid].startPolling();
                });
            } else if (message.text === 'list') {
                const accounts = await Account.findAll();

            }
        }
    });

    slackRtm.start();
    await db.authenticate();
    await db.sync();
    console.log('db: open');
    await promisize<void>(slackRtm, 'open');
    console.log('Slack: open');

    const accounts = await Account.findAll();
    accounts.forEach(account => {
        clients[account.mid] = new Client(account, slackRtm, slackApi, sendError);
        clients[account.mid].startPolling();
    });
})();

async function sendError(msg: string, channel?: string): Promise<never> {
    const msgInfo = await slackApi.chat.postMessage(channel || Config.slack.user, msg, { as_user: true }).catch(() => null);
    if (!msgInfo) return Promise.reject(msg);
    await waitPromise(5000);
    await slackApi.chat.delete(msgInfo.ts, msgInfo.channel).catch(() => null);
    return Promise.reject(msg);
}