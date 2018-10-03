import { safeLoad } from 'js-yaml';
import { readFileSync } from 'fs';
import * as joi from 'joi';
import * as dotenv from 'dotenv';

export const LINE_APP = 'CHROMEOS\t1.4.17\tChrome_OS\t1';
export const LINE_UNAUTH_ENDPOINT = 'https://ga2.line.naver.jp/api/v4/TalkService.do';
export const LINE_NORMAL_ENDPOINT = 'https://ga2.line.naver.jp/S4';
export const LINE_POLL_ENDPOINT = 'https://ga2.line.naver.jp/P4';
export const LINE_AUTH_ENDPOINT = 'https://ga2.line.naver.jp/api/v4p/rs';
export const LINE_QR_POLL = 'https://ga2.line.naver.jp/Q';
export const LINE_SYSTEM_NAME = 'Chrome';
export const E2EE_VERSION = 1;

dotenv.config();

interface Config {
    slack: {
        token: string;
        appToken: string;
        user: string;
    };
    db: string;
}

const configScheme = joi.object().keys({
    SLACK_TOKEN: joi.string().required(),
    SLACK_APP_TOKEN: joi.string().required(),
    SLACK_USER: joi.string().required(),
    DATABASE: joi.string().uri().required()
}).unknown(true);

const { error: validateError } = configScheme.validate(process.env);
if (validateError) {
    console.error(validateError);
    process.exit(-1);
}

export default {
    slack: {
        token: process.env.SLACK_TOKEN,
        appToken: process.env.SLACK_APP_TOKEN,
        user: process.env.SLACK_USER
    },
    db: process.env.DATABASE
} as Config;