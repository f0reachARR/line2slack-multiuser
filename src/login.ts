import * as request from 'request';
import * as crypto from 'crypto';

import * as thrift from 'thrift';
import * as TalkService from './thrift/TalkService';
import * as Types from './thrift/talk_types';
import * as E2EE from './e2ee';

console.log(E2EE.generateKeyPair());

let conn = thrift.createHttpConnection('ga2.line.naver.jp', 443, {
    protocol: thrift.TCompactProtocol,
    transport: thrift.TBufferedTransport,
    https: true,
    headers: {
        'X-Line-Application': 'DESKTOPMAC	4.11.1	MAC	10.11.6-EL_CAPITAN'
    },
    path: '/api/v4/TalkService.do'
});

let client = thrift.createHttpClient<TalkService.Client>(TalkService, conn);

client.getAuthQrcode(true, 'LINE2SLACK', true, (err: any, res: Types.AuthQrcode) => {
    let req = E2EE.generateKeyPair();
    let param = E2EE.generateE2eeQrParam(req);
    console.info('QRCode URL', `${res.callbackUrl}?${param}`);
    if (!err) {
        request.get('https://ga2.line.naver.jp/Q', {
            headers: {
                'X-Line-Application': 'DESKTOPMAC	4.11.1	MAC	10.11.6-EL_CAPITAN',
                'X-Line-Access': res.verifier
            },
            json: true
        }, (err, res, body) => {
            if (!err && body && 'result' in body && 'verifier' in body.result) {
                let meta = body.result.metadata;
                let chain = E2EE.decryptKeychain(req, meta.encryptedKeyChain, meta.publicKey, meta.hashKeyChain);
                client.loginWithVerifierForCertificate(body.result.verifier, (err: any, res: Types.LoginResult) => {
                    if (!err && res)
                        console.log('AuthToken', res.authToken);
                    chain.forEach(key => {
                        console.log(key.keyId, Buffer.from(key.publicKey).toString('base64'), Buffer.from(key.privateKey).toString('base64'));
                    });
                });
            }
        });
    }
});
