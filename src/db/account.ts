import * as Sequelize from 'sequelize';
import conn from '.';

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