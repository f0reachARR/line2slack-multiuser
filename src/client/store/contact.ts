import { StoreBase } from '.';
import { User, Group } from '../../db';
import { Op } from 'sequelize';
import { getMidType } from '../../utils/line/user';
import { MIDType } from '../../thrift/talk_types';

export default class ContactStore extends StoreBase {
    async fetchUser(mid: string) {
        if (getMidType(mid) !== MIDType.USER) throw new Error('Invalid mid');
        let contactEntry = await User.find({
            where: {
                selfMid: this.selfMid,
                mid,
                updatedAt: {
                    [Op.gt]: new Date(Date.now() - 24 * 60 * 60 * 1000)
                }
            }
        });
        if (contactEntry) return contactEntry;
        const contactInfo = await this.client.lineClient.getContact(mid);
        contactEntry = await User.addContact(this.selfMid, contactInfo);
        if (!contactEntry) throw new Error('Failed to get contactInfo');
        return contactEntry;
    }

    async fetchGroup(mid: string) {
        if (getMidType(mid) !== MIDType.GROUP) throw new Error('Invalid mid');
        let groupEntry = await Group.find({
            where: {
                selfMid: this.selfMid,
                mid,
                updatedAt: {
                    [Op.gt]: new Date(Date.now() - 24 * 60 * 60 * 1000)
                }
            }
        });
        if (groupEntry) return groupEntry;
        const groupInfo = await this.client.lineClient.getGroup(mid);
        // ここでユーザがいっぱい来る
        for (const user of [...groupInfo.members, ...groupInfo.invitee]) {
            await User.addContact(this.selfMid, user);
        }
        groupEntry = await Group.addGroup(this.selfMid, groupInfo);
        if (!groupEntry) throw new Error('Failed to get groupInfo');
        return groupEntry;
    }
}