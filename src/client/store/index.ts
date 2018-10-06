import Client from '..';
import E2eeStore from './e2ee';

export default class Store {
    e2ee: E2eeStore;
    constructor(client: Client) {
        this.e2ee = new E2eeStore(client);
    }
}