import * as Sequelize from 'sequelize';
import * as Bluebird from 'bluebird';
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
    addGroup(selfMid: string, group: LineTypes.Group): Bluebird<GroupInstance | null>;
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
        type: Sequelize.ARRAY,
        allowNull: false
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
Group.addGroup = (selfMid: string, group: LineTypes.Group) => {
    return Group.upsert({
        selfMid,
        mid: group.id,
        name: group.name,
        memberMids: group.memberMids,
        creatorMid: group.creator.mid,
        picture: group.picturePath
    }, { fields: ['name', 'memberMids', 'picture'], returning: false }).then(() => {
        return Group.find({ where: { selfMid, mid: group.id } });
    });
};