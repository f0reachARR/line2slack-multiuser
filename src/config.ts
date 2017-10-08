import { safeLoad } from 'js-yaml';
import { readFileSync } from 'fs';

interface Config {
    slack: {
        token: string;
        appToken: string;
        user: string;
    };
    db: string;
}

export const LINE_APP = 'CHROMEOS\t1.4.10\tChrome_OS\t1';
export const LINE_UNAUTH_ENDPOINT = 'https://ga2.line.naver.jp/api/v4/TalkService.do';
export const LINE_AUTH_ENDPOINT = 'https://ga2.line.naver.jp/S4';
export const LINE_POLL_ENDPOINT = 'https://ga2.line.naver.jp/P4';
export const LINE_QR_POLL = 'https://ga2.line.naver.jp/Q';
export const LINE_SYSTEM_NAME = 'Chrome PC';
export const E2EE_VERSION = 1;
export default (() => safeLoad(readFileSync('config.yml', 'utf-8')))() as Config;