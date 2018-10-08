import Client from '..';
import E2eeStore from './e2ee';
import ContactStore from './contact';

export default class Store {
    e2ee: E2eeStore;
    contact: ContactStore;
    constructor(client: Client) {
        this.e2ee = new E2eeStore(client);
        this.contact = new ContactStore(client);
    }
}

export class StoreBase {
    constructor(protected client: Client) { }

    protected get selfMid() { return this.client.account.mid; }
}