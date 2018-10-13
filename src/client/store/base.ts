import Client from '..';

export class StoreBase {
    constructor(protected client: Client) { }

    protected get selfMid() { return this.client.account.mid; }
}