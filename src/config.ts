import { safeLoad } from 'js-yaml';
import { readFileSync } from 'fs';
import * as assert from 'assert';

interface Config {
    slack: {
        token: string;
        appToken: string;
        user: string;
    };
    db: string;
}

export const LINE_APP = 'CHROMEOS\t1.4.17\tChrome_OS\t1';
export const LINE_UNAUTH_ENDPOINT = 'https://ga2.line.naver.jp/api/v4/TalkService.do';
export const LINE_NORMAL_ENDPOINT = 'https://ga2.line.naver.jp/S4';
export const LINE_POLL_ENDPOINT = 'https://ga2.line.naver.jp/P4';
export const LINE_AUTH_ENDPOINT = 'https://ga2.line.naver.jp/api/v4p/rs';
export const LINE_QR_POLL = 'https://ga2.line.naver.jp/Q';
export const LINE_SYSTEM_NAME = 'Chrome';
export const E2EE_VERSION = 1;

const config: Config = process.env.SLACK_TOKEN ? {
    slack: {
        token: process.env.SLACK_TOKEN || '',
        appToken: process.env.SLACK_APP_TOKEN || '',
        user: process.env.SLACK_USER || ''
    },
    db: process.env.DATABASE || ''
} : (() => safeLoad(readFileSync('config.yml', 'utf-8')))() as Config;

assert(config);
assert(config.slack);
assert(!!config.slack.token);
assert(!!config.slack.appToken);
assert(!!config.slack.user);
assert(!!config.db);

export default config;