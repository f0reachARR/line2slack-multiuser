import * as Sequelize from 'sequelize';
import conn from '.';

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