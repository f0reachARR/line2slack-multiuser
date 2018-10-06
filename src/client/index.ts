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

// tslint:disable-next-line:no-any
export type LineHandler = (this: Client, op: LineTypes.Operation) => Promise<any>;
// tslint:disable-next-line:no-any
export type SlackHandler = (this: Client, msg: SlackMessageEvent) => Promise<any>;
export default class Client {
    lineClient: TalkService.Client;
    store: Store;
    private polling: LinePollingClient;

    private lineHandlers: LineHandler[] = [];
    private slackHandlers: SlackHandler[] = [];

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
        for (const handler of this.slackHandlers)
            await handler.bind(this)(msg);
    }

    private async lineMessageHandler(op: LineTypes.Operation) {
        for (const handler of this.lineHandlers)
            await handler.bind(this)(op);
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

    useSlack(...handler: SlackHandler[]) { this.slackHandlers.push(...handler); }
    useLine(...handler: LineHandler[]) { this.lineHandlers.push(...handler); }
}