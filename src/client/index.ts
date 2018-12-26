import { RtmClient, WebClient } from '@slack/client';

import {
    LINE_NORMAL_ENDPOINT,
    LINE_POLL_ENDPOINT,
} from '../config';
import { LineAccountInstance, User } from '../db';
import { createThrift, createThriftWithConnection } from '../utils/thrift';

import * as LineTypes from '../thrift/talk_types';
import * as TalkService from '../thrift/TalkService';
import { LinePollingClient } from './polling';
import Store from './store';

import { app } from '../utils/logger';
import { handlers as lineHandlers } from './handlers/line';
import { handlers as slackHandlers } from './handlers/slack';

export type LineEventArgs = { client: Client, op: LineTypes.Operation };
export type SlackMessageEventArgs = { client: Client, msg: SlackMessageEvent };

export type LineHandler = (e: LineEventArgs) => Promise<boolean | void>;
export type SlackMessageHandler = (e: SlackMessageEventArgs) => Promise<boolean | void>;

export default class Client {
    lineClient: TalkService.Client;
    store: Store;
    private polling: LinePollingClient;

    constructor(
        public account: LineAccountInstance,
        public rtmClient: RtmClient,
        public webClient: WebClient
    ) {
        this.lineClient = createThrift(LINE_NORMAL_ENDPOINT, TalkService, { headers: { 'X-Line-Access': account.token } });
        const pollingClient = createThriftWithConnection(LINE_POLL_ENDPOINT, TalkService, { headers: { 'X-Line-Access': account.token } });
        this.polling = new LinePollingClient(this.lineClient, pollingClient);
        this.store = new Store(this);
    }

    private slackMessageHandler = async (msg: SlackMessageEvent) => {
        for (const handler of slackHandlers)
            if (await handler({ client: this, msg }) === true) break;
    }

    private lineMessageHandler = async (op: LineTypes.Operation) => {
        for (const handler of lineHandlers)
            if (await handler({ client: this, op }) === true) break;
    }

    async checkAccount() {
        try {
            const channelInfo = await this.webClient.groups.info(this.account.channel);
            if (channelInfo.group.is_archived) throw new Error('Channel was archived');

            const profile = await this.lineClient.getProfile();
            await User.addProfile(profile);
        } catch (e) {
            app.error(e);
            return false;
        }
        return true;
    }

    async notifyError(message: string) {
        await this.webClient.chat.postMessage(this.account.channel, message);
        app.error(message);
    }

    async start() {
        if (!await this.checkAccount()) { // TODO
            await this.notifyError('account unavailable');
            return;
        }

        this.rtmClient.on('message', this.slackMessageHandler);
        this.polling.on('receive', this.lineMessageHandler);
        await this.polling.start();
    }

    async stop() {
        this.rtmClient.off('message', this.slackMessageHandler);
        this.polling.off('receive', this.lineMessageHandler);
        await this.polling.stop();
    }
}