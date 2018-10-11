import { RtmClient, WebClient } from '@slack/client';

import { LineAccountInstance } from '../db';
import {
    LINE_NORMAL_ENDPOINT,
    LINE_POLL_ENDPOINT,
} from '../config';
import { createThrift, createThriftWithConnection, ThriftWithConnection } from '../utils/thrift';

import * as TalkService from '../thrift/TalkService';
import * as LineTypes from '../thrift/talk_types';
import { LinePollingClient } from './polling';
import Store from './store';

import { handlers as lineHandlers } from './handlers/line';
import { handlers as slackHandlers } from './handlers/slack';

export type LineHandler = (this: Client, op: LineTypes.Operation) => Promise<boolean | void>;
export type SlackHandler = (this: Client, msg: SlackMessageEvent) => Promise<boolean | void>;

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

    private async slackMessageHandler(msg: SlackMessageEvent) {
        for (const handler of slackHandlers)
            if (await handler.bind(this)(msg) === true) break;
    }

    private async lineMessageHandler(op: LineTypes.Operation) {
        for (const handler of lineHandlers)
            if (await handler.bind(this)(op) === true) break;
    }

    start() {
        this.rtmClient.on('message', this.slackMessageHandler);
        this.polling.on('receive', this.lineMessageHandler);
        this.polling.start();
    }

    async stop() {
        this.rtmClient.off('message', this.slackMessageHandler);
        this.polling.off('receive', this.lineMessageHandler);
        await this.polling.stop();
    }
}