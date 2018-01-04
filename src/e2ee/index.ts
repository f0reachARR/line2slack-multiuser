import * as crypto from 'crypto';
import * as Thrift from 'thrift';
import * as Curve25519 from './curve25519';
import * as Types from '../thrift/talk_types';

const KEY_BYTES = Buffer.from('Key', 'utf8');
const IV_BYTES = Buffer.from('IV', 'utf8');
interface Curve25519KeyPair {
    publicKey: Buffer;
    privateKey: Buffer;
}

export interface KeyPair {
    privateKey?: Buffer;
    publicKey: Buffer;
    keyId: number;
}

export function generateKeyPair(): Curve25519KeyPair {
    const privateKey = crypto.randomBytes(32);
    const key = Curve25519.generateKeyPair(privateKey);
    return {
        publicKey: Buffer.from(key.public.buffer),
        privateKey: Buffer.from(key.private.buffer)
    };
}

export function generateE2eeQrParam(key: Curve25519KeyPair) {
    return `secret=${encodeURIComponent(key.publicKey.toString('base64'))}&e2eeVersion=1`;
}

function something(buf: Buffer) {
    if (buf.length % 2 !== 0) throw new Error('Invalid data');
    const buf2 = new Buffer(buf.length / 2);
    for (let i = 0; i < buf.length / 2; i++) {
        buf2[i] = buf[i] ^ buf[buf2.length + i];
    }
    return buf2;
}

function sha256(buf: Buffer) {
    return crypto.createHash('sha256').update(buf).digest();
}

function decryptAes(key: Buffer, iv: Buffer, data: Buffer) {
    const aes = crypto.createDecipheriv('aes-256-cbc', key, iv);
    return Buffer.concat([aes.update(data), aes.final()]);
}

function encryptAes(key: Buffer, iv: Buffer, data: Buffer) {
    const aes = crypto.createCipheriv('aes-256-cbc', key, iv);
    return Buffer.concat([aes.update(data), aes.final()]);
}

function encryptAesEcb(key: Buffer, data: Buffer) {
    const aes = crypto.createCipheriv('aes-256-ecb', key, '');
    aes.setAutoPadding(false);
    return Buffer.concat([aes.update(data), aes.final()]);
}

function decryptKeychain_(key: Curve25519KeyPair, encryptedKeyChain: Buffer, publicKey: Buffer, hashKeyChain: Buffer) {
    const sharedSecret = Buffer.from(Curve25519.sharedKey(key.privateKey, publicKey).buffer);
    const aesKey = sha256(Buffer.concat([sharedSecret, KEY_BYTES]));
    const aesIV = something(sha256(Buffer.concat([sharedSecret, IV_BYTES])));
    const keychainData = decryptAes(aesKey, aesIV, encryptedKeyChain);
    const checksum = encryptAesEcb(aesKey, something(sha256(keychainData)));
    // if (Buffer.compare(checksum, hashKeyChain) !== 0)
    //    throw new Error('Invalid keychain');
    const keychain = new Types.E2EEKeyChain();
    const trans = new Thrift.TFramedTransport(keychainData, () => { });
    const prot = new Thrift.TCompactProtocol(trans);
    keychain.read(prot);
    return keychain.keychain;
}

export function decryptKeychain(key: Curve25519KeyPair, encryptedKeyChain: string, publicKey: string, hashKeyChain: string) {
    return decryptKeychain_(key, new Buffer(encryptedKeyChain, 'base64'), new Buffer(publicKey, 'base64'), new Buffer(hashKeyChain, 'base64'));
}

export enum KeyIdType {
    Sender = 0,
    Receiver = 1
}
export function getKeyId(msg: Types.Message, num: KeyIdType = KeyIdType.Sender) {
    if (msg.contentMetadata && 'e2eeVersion' in msg.contentMetadata && msg.chunks && msg.chunks.length === 5) {
        const keyNum = msg.chunks[num + 3].readUInt32BE(0);
        return keyNum;
    }
    return -1;
}
interface E2EEJson {
    text?: string;
    location?: {
        latitude: number;
        longitude: number;
        title?: string;
        phone?: string;
        address?: string;
    };
}
function jsonToMsg(json: E2EEJson, msg: Types.Message) {
    if (json.text) msg.text = json.text;
    if (json.location) {
        msg.location = new Types.Location();
        if (json.location.address) msg.location.address = json.location.address;
        if (json.location.phone) msg.location.phone = json.location.phone;
        if (json.location.title) msg.location.title = json.location.title;
        msg.location.latitude = json.location.latitude;
        msg.location.longitude = json.location.longitude;
        msg.contentType = Types.ContentType.LOCATION;
    }
}
function msg2Json(msg: Types.Message): E2EEJson {
    const json: E2EEJson = {};
    if (msg.text) json.text = msg.text;
    if (msg.location) {
        json.location = {
            latitude: msg.location.latitude,
            longitude: msg.location.longitude
        };
        if (msg.location.address) json.location.address = msg.location.address;
        if (msg.location.phone) json.location.phone = msg.location.phone;
        if (msg.location.title) json.location.title = msg.location.title;
    }
    return json;
}

export function decryptMessageWithSecret(msg: Types.Message, sharedSecret: Buffer) {
    const salt = msg.chunks[0] as Buffer;
    const encrypted = msg.chunks[1] as Buffer;
    const aesKey = sha256(Buffer.concat([sharedSecret, salt, KEY_BYTES]));
    const aesIV = something(sha256(Buffer.concat([sharedSecret, salt, IV_BYTES])));
    const decrypted = decryptAes(aesKey, aesIV, encrypted);
    const decryptedStr = decrypted.toString('utf8');
    jsonToMsg(JSON.parse(decryptedStr), msg);
}

export function decryptMessage(msg: Types.Message, self: KeyPair, sender: KeyPair) {
    if (!self.privateKey) throw new Error('Invalid');
    const sharedSecret = Buffer.from(Curve25519.sharedKey(self.privateKey, sender.publicKey).buffer);
    decryptMessageWithSecret(msg, sharedSecret);
}

export function decryptGroupSharedKey(msg: Types.Message, encryptedShread: Buffer, self: KeyPair,creator: KeyPair){
    if (!self.privateKey) throw new Error('Invalid');
    const sharedDecKey = Buffer.from(Curve25519.sharedKey(self.privateKey, creator.publicKey).buffer);
    const aesKey = sha256(Buffer.concat([sharedDecKey, KEY_BYTES]));
    const aesIV = something(sha256(Buffer.concat([sharedDecKey, IV_BYTES])));
    return decryptAes(aesKey, aesIV, encryptedShread);
}

export function decryptGroupMessage(msg: Types.Message, sharedKey: Buffer, sender: KeyPair) {
    const sharedSecret = Buffer.from(Curve25519.sharedKey(sharedKey, sender.publicKey).buffer);
    decryptMessageWithSecret(msg, sharedSecret);
}

export function encryptMessage(msg: Types.Message, self: KeyPair, recv: KeyPair) {
    if (!self.privateKey) throw new Error('Invalid');
    const json = JSON.stringify(msg2Json(msg));
    const salt = crypto.randomBytes(8);
    const sharedSecret = Buffer.from(Curve25519.sharedKey(self.privateKey, recv.publicKey).buffer);
    const aesKey = sha256(Buffer.concat([sharedSecret, salt, KEY_BYTES]));
    const aesIV = something(sha256(Buffer.concat([sharedSecret, salt, IV_BYTES])));
    const encrypted = encryptAes(aesKey, aesIV, Buffer.from(json));
    const checksum = encryptAesEcb(aesKey, something(sha256(encrypted)));

    msg.contentMetadata = { 'e2eeVersion': '1' };
    msg.text = undefined;
    msg.location = undefined;
    const selfBuf = new Buffer(4);
    selfBuf.writeUInt32BE(self.keyId, 0);
    const recvBuf = new Buffer(4);
    recvBuf.writeUInt32BE(recv.keyId, 0);
    msg.chunks = [
        salt,
        encrypted,
        checksum,
        selfBuf,
        recvBuf
    ];
}