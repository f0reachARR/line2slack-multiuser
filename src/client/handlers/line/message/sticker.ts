import * as joi from 'joi';
import { MessageTransformer } from '.';
import Client from '../../..';
import { SlackMessageInstance, UserInstance } from '../../../../db';
import {
    Message
} from '../../../../thrift/talk_types';

const metaValidate = joi.object({
    STKTXT: joi.string().optional(),
    STKVER: joi.number().required(),
    STKPKGID: joi.number().required(),
    STKID: joi.number().required()
}).unknown(true);

const handler: MessageTransformer = async (_client: Client, message: Message, _sender: UserInstance, _thread: SlackMessageInstance) => {
    const { error } = metaValidate.validate(message.contentMetadata);
    if (error) return error;
    const {
        STKTXT = 'Sticker',
        STKVER: STKVERStr,
        STKPKGID,
        STKID
    } = message.contentMetadata;
    const STKVER = Number(STKVERStr);
    const version = `${Math.ceil(STKVER / 1000000)}/${Math.ceil(STKVER / 1000)}/${STKVER % 1000}`;
    const url = `http://stickershop.line-cdn.net/products/${version}/${STKPKGID}/android/stickers/${STKID}.png`;
    return {
        attachments: [
            {
                fallback: STKTXT,
                image_url: url
            }
        ]
    };
};

export default handler;