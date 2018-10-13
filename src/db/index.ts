import * as Sequelize from 'sequelize';
import Config from '../config';

export const conn = new Sequelize(Config.db, {});

export default conn;

export * from './account';
export * from './e2eekey';
export * from './user';
export * from './slackmessage';
export * from './group';