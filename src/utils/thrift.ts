import * as thrift from 'thrift';
import * as url from 'url';
import { LINE_APP } from '../config';

export function createThrift<T>(endpoint: string, service: { Client }, options?: { headers?: { [k: string]: string } }): T {
    const parsed = url.parse(endpoint);
    if (parsed.hostname && parsed.protocol) {
        const conn = thrift.createHttpConnection(parsed.hostname, parsed.protocol.match(/https/) ? 443 : 80, {
            https: !!parsed.protocol.match(/https/),
            transport: thrift.TBufferedTransport,
            protocol: thrift.TCompactProtocol,
            path: parsed.path,
            headers: Object.assign({}, {
                'X-Line-Application': LINE_APP
            }, options ? options.headers || {} : {})
        });
        return thrift.createHttpClient<T>(service, conn);
    }
    throw Error('An error occured');
}

export function createThrift2<T>(endpoint: string, service: { Client }, options?: { headers?: { [k: string]: string } }): { client: T, conn: thrift.ClientConnection } {
    const parsed = url.parse(endpoint);
    if (parsed.hostname && parsed.protocol) {
        const conn = thrift.createHttpConnection(parsed.hostname, parsed.protocol.match(/https/) ? 443 : 80, {
            https: !!parsed.protocol.match(/https/),
            transport: thrift.TBufferedTransport,
            protocol: thrift.TCompactProtocol,
            path: parsed.path,
            headers: Object.assign({}, {
                'X-Line-Application': LINE_APP
            }, options ? options.headers || {} : {})
        });
        return {
            client: thrift.createHttpClient<T>(service, conn),
            conn
        };
    }
    throw Error('An error occured');
}