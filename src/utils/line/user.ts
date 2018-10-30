import { UserInstance } from '../../db';
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

export const getDisplayName = (contact: UserInstance, long = false) => {
    if (long)
        return contact.customName ? `${contact.name} (${contact.customName})` : contact.name;
    else
        return contact.customName || contact.name;
};