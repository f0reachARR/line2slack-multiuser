import * as Thrift from 'thrift';
import {
    E2EEPublicKey,
    ErrorCode,
    LoginRequest,
    LoginResult,
    SecurityCenterResult
} from './talk_types';
export as namespace AuthService;

declare class Client {
    input: Thrift.TJSONProtocol;
    output: Thrift.TJSONProtocol;
    seqid: number;

    constructor(input: Thrift.TJSONProtocol, output?: Thrift.TJSONProtocol);

    normalizePhoneNumber(countryCode: string, phoneNumber: string, countryCodeHint: string): Promise<string>;

    normalizePhoneNumber(countryCode: string, phoneNumber: string, countryCodeHint: string, callback: Function): void;

    respondE2EELoginRequest(verifier: string, publicKey: E2EEPublicKey, encryptedKeyChain: string, hashKeyChain: string, errorCode: ErrorCode): void;

    respondE2EELoginRequest(verifier: string, publicKey: E2EEPublicKey, encryptedKeyChain: string, hashKeyChain: string, errorCode: ErrorCode, callback: Function): void;

    confirmE2EELogin(verifier: string, deviceSecret: string): Promise<string>;

    confirmE2EELogin(verifier: string, deviceSecret: string, callback: Function): void;

    logoutZ(): void;

    logoutZ(callback: Function): void;

    loginZ(loginRequest: LoginRequest): Promise<LoginResult>;

    loginZ(loginRequest: LoginRequest, callback: Function): void;

    issueTokenForAccountMigrationSettings(enforce: boolean): Promise<SecurityCenterResult>;

    issueTokenForAccountMigrationSettings(enforce: boolean, callback: Function): void;

    issueTokenForAccountMigration(migrationSessionId: string): Promise<SecurityCenterResult>;

    issueTokenForAccountMigration(migrationSessionId: string, callback: Function): void;

    verifyQrcodeWithE2EE(verifier: string, pinCode: string, errorCode: ErrorCode, publicKey: E2EEPublicKey, encryptedKeyChain: string, hashKeyChain: string): Promise<string>;

    verifyQrcodeWithE2EE(verifier: string, pinCode: string, errorCode: ErrorCode, publicKey: E2EEPublicKey, encryptedKeyChain: string, hashKeyChain: string, callback: Function): void;
}
