import * as Sequelize from 'sequelize';
import Config from './config';
import * as LineTypes from './thrift/talk_types';
import * as Bluebird from 'bluebird';

const conn = new Sequelize('line2slack', '', '', { dialect: 'sqlite', storage: Config.db, logging: false });

interface LineAccountAttributes {
    id?: number;
    mid: string;
    token: string;
    channel: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface LineAccountInstance extends Sequelize.Instance<LineAccountAttributes>, LineAccountAttributes { }

export const LineAccount = conn.define<LineAccountInstance, LineAccountAttributes>('account', {
    mid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    token: {
        type: Sequelize.STRING,
        allowNull: false
    },
    channel: {
        type: Sequelize.STRING,
        allowNull: false
    }
},
    {
        indexes: [
            { fields: ['mid'], unique: true },
            { fields: ['channel'] }
        ]
    });

interface E2eeKeyAttributes {
    id?: number;
    mid: string;
    keyId: number;
    publicKey: string;
    privateKey?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface E2eeKeyInstance extends Sequelize.Instance<E2eeKeyAttributes>, E2eeKeyAttributes { }

export const E2eeKey = conn.define<E2eeKeyInstance, E2eeKeyAttributes>('e2eekey', {
    mid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    keyId: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    publicKey: { // groupの時はsharedKeyを入れる
        type: Sequelize.STRING,
        allowNull: false
    },
    privateKey: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
        indexes: [
            { fields: ['mid', 'keyId'], unique: true }
        ]
    });

interface UserAttributes {
    id?: number;
    selfMid: string;
    mid: string;
    name?: string;
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
        allowNull: true
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

interface SlackMessageAttributes {
    id?: number;
    channel: string;
    mid: string;
    threadTs: string;
    isRead: boolean;
    isReadReacted: boolean;
    lastMsgId?: string;
    lastMsgTs: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface SlackMessageInstance extends Sequelize.Instance<SlackMessageAttributes>, SlackMessageAttributes { }

export const SlackMessage = conn.define<SlackMessageInstance, SlackMessageAttributes>('slackmessage', {
    channel: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    threadTs: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isRead: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    isReadReacted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    lastMsgId: {
        type: Sequelize.STRING,
        allowNull: true
    },
    lastMsgTs: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
        indexes: [
            { fields: ['channel', 'mid'], unique: true }
        ]
    });
export default conn;