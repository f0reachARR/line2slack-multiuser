import { EventEmitter } from 'events';

import * as TalkService from '../thrift/TalkService';
import * as LineTypes from '../thrift/talk_types';
import { ThriftWithConnection } from '../utils/thrift';

export class LinePollingClient extends EventEmitter {
    private cancelPromise: Promise<null>;
    private cancelFunction: null | (() => void);
    private pollingPromise: Promise<void>;

    on(event: 'receive', listener: (op: LineTypes.Operation) => void): this;
    on(event: 'error', listener: (err: LineTypes.TalkException) => void): this;

    // tslint:disable-next-line:no-any
    on(event: string | symbol, listener: (...args: any[]) => void): this {
        return super.on(event, listener);
    }

    constructor(
        private lineClient: TalkService.Client,
        private pollingClient: ThriftWithConnection<TalkService.Client>,
    ) {
        super();
    }

    private async update() {
        let lastOpNum = await this.lineClient.getLastOpRevision();
        this.cancelFunction = () => null;
        this.cancelPromise = new Promise(resolve => this.cancelFunction = () => resolve());

        while (this.cancelFunction) {
            this.pollingClient.conn.removeAllListeners('error');
            const errorPromise = new Promise<null>(resolve => {
                this.pollingClient.conn.once('error', () => resolve());
            });
            const longPollProm = this.pollingClient.client.fetchOperations(lastOpNum, 1);
            try {
                const result = await Promise.race([errorPromise, longPollProm, this.cancelPromise]);
                if (result) {
                    for (const item of result) {
                        this.emit('receive', item);
                        if (item.revision > lastOpNum)
                            lastOpNum = item.revision;
                    }
                }
            } catch (ex) {
                if (ex instanceof LineTypes.TalkException) {
                    this.emit('error', ex);
                }
            }
        }
    }

    start() {
        this.pollingPromise = this.update();
    }

    async stop() {
        if (this.cancelFunction) this.cancelFunction();
        this.cancelFunction = null;
        await this.pollingPromise;
    }
}