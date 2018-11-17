import { RtmClient, WebClient } from '@slack/client';
import { imageSync as createQrCode } from 'qr-image';
import * as AuthService from './thrift/AuthService';
import * as LineTypes from './thrift/talk_types';
import * as TalkService from './thrift/TalkService';

import Client from './client';
import Config, {
    LINE_APP,
    LINE_AUTH_ENDPOINT,
    LINE_NORMAL_ENDPOINT,
    LINE_QR_POLL,
    LINE_SYSTEM_NAME,
    LINE_UNAUTH_ENDPOINT
} from './config';
import db, { E2eeKey, LineAccount, User } from './db';
import * as e2ee from './e2ee';
import { get } from './utils/http';
import { uploadFile } from './utils/slack';
import { createThrift } from './utils/thrift';

const slackRtm = new RtmClient(Config.slack.token, {
    useRtmConnect: true,
    dataStore: false,
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
                const qrConn = createThrift(LINE_UNAUTH_ENDPOINT, TalkService);
                const keyForEx = e2ee.generateKeyPair();
                const qrLoginInfo = await qrConn.getAuthQrcode(true, LINE_SYSTEM_NAME, true);
                if (!qrLoginInfo) return;
                const codeUrl = `${qrLoginInfo.callbackUrl}?${e2ee.generateE2eeQrParam(keyForEx)}`;
                const qrImage = createQrCode(codeUrl, { type: 'png' }) as Buffer;
                // tslint:disable-next-line:no-any
                const qrFileInfo: any = await uploadFile(Config.slack.token, qrImage, [message.channel], 'image/png', 'qrcode.png');
                if (!qrFileInfo || !('file' in qrFileInfo) || !('id' in qrFileInfo.file)) {
                    throw new Error('Failed to upload QRCODE');
                }
                const res = await get({
                    uri: LINE_QR_POLL,
                    headers: {
                        'X-Line-Application': LINE_APP,
                        'X-Line-Access': qrLoginInfo.verifier
                    },
                    json: true
                });
                const { body } = res;
                // QRコード画像消去
                await slackApi.files.delete(qrFileInfo.file.id);
                if (!body || !('result' in body) || body.result.authPhase !== 'QRCODE_VERIFIED') {
                    throw new Error('Login session timed out');
                }

                // ログイン
                const loginConn = createThrift(LINE_AUTH_ENDPOINT, AuthService);
                const loginReq = new LineTypes.LoginRequest({
                    keepLoggedIn: true,
                    verifier: body.result.verifier,
                    systemName: LINE_SYSTEM_NAME,
                    identityProvider: LineTypes.IdentityProvider.LINE,
                    type: LineTypes.LoginType.QRCODE,
                    accessLocation: ''
                });
                const loginResult = await loginConn.loginZ(loginReq);

                // profile取得
                const userConn = createThrift(LINE_NORMAL_ENDPOINT, TalkService, { headers: { 'X-Line-Access': loginResult.authToken } });
                const profile = await userConn.getProfile();
                await User.addProfile(profile);
                console.log('logged in', 'mid', profile.mid);

                // MIDがすでにあるか(チャンネルをこの後作成するためupsertしない)
                let accountEntry = await LineAccount.find({ where: { mid: profile.mid } });
                if (accountEntry) {
                    console.log('Account already created');
                    accountEntry.token = loginResult.authToken;
                    await accountEntry.save();
                } else {
                    accountEntry = await LineAccount.create({ mid: profile.mid, token: loginResult.authToken, channel: '' });
                    console.log('Account created');
                }

                if (body.result.metadata) {
                    const meta = body.result.metadata;
                    const chain = e2ee.decryptKeychain(keyForEx, meta.encryptedKeyChain, meta.publicKey, meta.hashKeyChain);
                    // E2EE鍵->DB(upsert)
                    for (const key of chain) {
                        const keyItem = {
                            keyId: key.keyId,
                            privateKey: key.privateKey,
                            publicKey: key.publicKey,
                            mid: profile.mid
                        };
                        const isCreated = await E2eeKey.upsert(keyItem, { fields: ['privateKey', 'publicKey'], returning: false });
                        console.log(keyItem.keyId, isCreated ? 'Key added' : 'Key updated');
                    }
                }

                // チャンネル確認+作成
                if (accountEntry.channel.length !== 0) {
                    try {
                        const channelInfo = await slackAppApi.groups.info(accountEntry.channel);
                        if (channelInfo.group.is_archived) {
                            console.log('Archived channel', channelInfo);
                            accountEntry.channel = '';
                        }
                    } catch (ex) {
                        console.log('Failed to get exist channel, try to create new one');
                        accountEntry.channel = '';
                    }
                }
                if (accountEntry.channel === '') {
                    console.log('Creating channel');
                    const slackChannel = await slackAppApi.groups.create(`l2s-${Math.floor(Date.now() / 1000)}`);
                    await slackAppApi.groups.invite(slackChannel.group.id, selfUid);
                    accountEntry.channel = slackChannel.group.id;
                    await accountEntry.save();
                } else {
                    console.log('Channel already created');
                }

                // 友だちリスト取得
                const contactMids = await userConn.getAllContactIds();
                const contacts = await userConn.getContacts(contactMids);

                // 友だちリスト格納
                for (const contact of contacts) {
                    await User.addContact(profile.mid, contact);
                }
                console.log('Contacts stored');

                if (clients[profile.mid]) {
                    await clients[profile.mid].stop();
                }
                clients[profile.mid] = new Client(accountEntry, slackRtm, slackApi);
                await clients[profile.mid].start();
            } else if (message.text === 'list') {
                const accounts = await LineAccount.findAll();

            }
        }
    });

    await db.authenticate();
    await db.sync();
    console.log('db: open');
    await new Promise(resolve => {
        slackRtm.once('open', () => resolve());
        slackRtm.start();
    });
    console.log('Slack: open');

    const accounts = await LineAccount.findAll();
    for (const account of accounts) {
        clients[account.mid] = new Client(account, slackRtm, slackApi);
        await clients[account.mid].start();
    }
})();