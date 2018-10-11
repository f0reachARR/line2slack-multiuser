import { LineHandler } from '../..';

import e2eeHandler from './e2ee';
import messageHandler from './message';

export const handlers: LineHandler[] = [
    e2eeHandler,
    messageHandler
];