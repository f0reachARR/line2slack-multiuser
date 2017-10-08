// Type definitions for thrift 0.10
// Project: https://www.npmjs.com/package/thrift
// Definitions by: Kamek <https://github.com/kamek-pf>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module 'thrift' {
    import { EventEmitter } from "events";
    class TException { }

    /**
     * Protocols and Transports
     */
    interface TTransport { }
    class TBufferedTransport implements TTransport { }
    class TXHRTransport implements TTransport { }
    class TFramedTransport implements TTransport {
        constructor(buffer: Buffer, callback: Function);
    }

    class TProtocol {
        constructor(trans: TTransport);
    }
    class TJSONProtocol extends TProtocol { }
    class TBinaryProtocol extends TProtocol { }
    class TCompactProtocol extends TProtocol {
        constructor(trans: TTransport);
    }

    /**
     * Client side
     */
    type ConnexionEvent = 'open' | 'message' | 'close' | 'error';

    interface ClientConnectionParams {
        transport: TTransport;
        protocol: TProtocol;
    }

    interface ClientConnection extends EventEmitter {
    }

    class Service { }
    module Service {
        class Client { }
    }
    function createConnection(host: string, port: number, params: ClientConnectionParams): ClientConnection;
    function createClient(generatedService: any, connection: ClientConnection): any;

    interface HttpClientConnectionParams extends ClientConnectionParams {
        https?: boolean;
        path?: string;
        headers?: { [key: string]: string };
        timeout?: number;
    }
    function createHttpConnection(host: string, port: number, params: HttpClientConnectionParams): ClientConnection;
    function createHttpClient<T>(generatedService: Service, connection: ClientConnection): T;
}