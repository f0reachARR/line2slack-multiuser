import * as Sequelize from 'sequelize';
import Config from '../config';
import * as LineTypes from '../thrift/talk_types';
import * as Bluebird from 'bluebird';

export const conn = new Sequelize(Config.db, {});

export * from './account';
export * from './e2eekey';
export * from './user';
export * from './slackmessage';
export * from './group';

export default conn;