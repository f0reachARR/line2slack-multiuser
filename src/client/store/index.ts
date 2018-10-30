import Client from '..';
import ContactStore from './contact';
import E2eeStore from './e2ee';

export default class Store {
    e2ee: E2eeStore;
    contact: ContactStore;
    constructor(client: Client) {
        this.e2ee = new E2eeStore(client);
        this.contact = new ContactStore(client);
    }
}