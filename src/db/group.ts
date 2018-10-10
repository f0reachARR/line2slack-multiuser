import * as Sequelize from 'sequelize';
import * as LineTypes from '../thrift/talk_types';
import conn from '.';

interface GroupAttributes {
    id?: number;
    selfMid: string;
    mid: string;
    name: string;
    memberMids: string[];
    creatorMid: string;
    picture?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface GroupInstance extends Sequelize.Instance<GroupAttributes>, GroupAttributes { }
interface GroupModelExt extends Sequelize.Model<GroupInstance, GroupAttributes> {
    addGroup(selfMid: string, group: LineTypes.Group): Promise<GroupInstance | null>;
}
export const Group = conn.define<GroupInstance, GroupAttributes>('group', {
    selfMid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    memberMids: {
        type: Sequelize.TEXT,
        allowNull: false,
        get(this: GroupInstance) { return (this.getDataValue('memberMids') as string).split(','); },
        // tslint:disable-next-line:no-any
        set(this: GroupInstance, val: string[]) { this.setDataValue('memberMids', val.join(',') as any); }
    },
    creatorMid: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    picture: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
        indexes: [
            { fields: ['selfMid', 'mid'], unique: true }
        ],
    }) as GroupModelExt;
Group.addGroup = async (selfMid: string, group: LineTypes.Group) => {
    const value = {
        selfMid,
        mid: group.id,
        name: group.name,
        memberMids: group.memberMids,
        creatorMid: group.creator.mid,
        picture: group.picturePath
    };
    const [entry, created] = await Group.findOrCreate({
        where: { selfMid, mid: group.id },
        defaults: value
    });
    if (!created) await entry.set(value).save();
    return entry;
};