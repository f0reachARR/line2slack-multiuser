import * as log4js from 'log4js';

log4js.configure({
    appenders: {
        app: {
            type: 'console'
        }
    },
    categories: {
        default: {
            appenders: ['app'],
            level: 'trace'
        }
    }
});

export const app = log4js.getLogger('app');