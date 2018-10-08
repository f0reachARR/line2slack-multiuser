import * as Sequelize from 'sequelize';
import * as Bluebird from 'bluebird';
import * as LineTypes from '../thrift/talk_types';
import conn from '.';

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
    addContact(selfMid: string, contact: LineTypes.Contact): Bluebird<UserInstance | null>;
    addProfile(profile: LineTypes.Profile): Bluebird<UserInstance | null>;
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
User.addContact = (selfMid: string, contact: LineTypes.Contact) => {
    return User.upsert({
        selfMid,
        mid: contact.mid,
        name: contact.displayName,
        customName: contact.displayNameOverridden,
        statusMessage: contact.statusMessage,
        picture: contact.picturePath
    }, { fields: ['name', 'statusMessage', 'picture', 'customName'], returning: false }).then(() => {
        return User.find({ where: { selfMid, mid: contact.mid } });
    });
};

User.addProfile = (profile: LineTypes.Profile) => {
    return User.upsert({
        selfMid: profile.mid,
        mid: profile.mid,
        name: profile.displayName,
        customName: undefined,
        statusMessage: profile.statusMessage,
        picture: profile.picturePath
    }, { fields: ['name', 'statusMessage', 'picture', 'customName'], returning: false }).then(() => {
        return User.find({ where: { selfMid: profile.mid, mid: profile.mid } });
    });
};