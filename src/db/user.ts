import * as Sequelize from 'sequelize';
import conn from '.';
import * as LineTypes from '../thrift/talk_types';

interface UserAttributes {
    id?: number;
    selfMid: string;
    mid: string;
    name: string;
    customName?: string;
    statusMessage?: string;
    picture?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes { }
interface UserModelExt extends Sequelize.Model<UserInstance, UserAttributes> {
    addContact(selfMid: string, contact: LineTypes.Contact): Promise<UserInstance | null>;
    addProfile(profile: LineTypes.Profile): Promise<UserInstance | null>;
}
export const User = conn.define<UserInstance, UserAttributes>('user', {
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
    customName: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    statusMessage: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    picture: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
        indexes: [
            { fields: ['selfMid', 'mid'], unique: true }
        ],
    }) as UserModelExt;
User.addContact = async (selfMid: string, contact: LineTypes.Contact) => {
    const value = {
        selfMid,
        mid: contact.mid,
        name: contact.displayName,
        customName: contact.displayNameOverridden,
        statusMessage: contact.statusMessage,
        picture: contact.picturePath
    };
    const [entry, created] = await User.findOrCreate({
        where: { selfMid, mid: contact.mid },
        defaults: value
    });
    if (!created) await entry.set(value).save();
    return entry;
};

User.addProfile = async (profile: LineTypes.Profile) => {
    const value = {
        selfMid: profile.mid,
        mid: profile.mid,
        name: profile.displayName,
        customName: undefined,
        statusMessage: profile.statusMessage,
        picture: profile.picturePath
    };
    const [entry, created] = await User.findOrCreate({
        where: { selfMid: profile.mid, mid: profile.mid },
        defaults: value
    });
    if (!created) await entry.set(value).save();
    return entry;
};