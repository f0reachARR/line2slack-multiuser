import { MIDType } from '../../thrift/talk_types';

export const getMidType = (mid: string) => {
    switch (mid.substr(0, 1)) {
        case 'u':
            return MIDType.USER;
        case 'c':
            return MIDType.GROUP;
        default:
            throw new Error('not implemented');
    }
};