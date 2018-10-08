import * as Sequelize from 'sequelize';
import conn from '.';

interface E2eeKeyAttributes {
    id?: number;
    mid: string;
    keyId: number;
    publicKey: Buffer;
    privateKey?: Buffer;
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
        type: Sequelize.BLOB,
        allowNull: false
    },
    privateKey: {
        type: Sequelize.BLOB,
        allowNull: true
    }
}, {
        indexes: [
            { fields: ['mid', 'keyId'], unique: true }
        ]
    });