import { MessageTransformer } from '.';
import Client from '../../..';
import { SlackMessageInstance, UserInstance } from '../../../../db';
import {
    Message
} from '../../../../thrift/talk_types';

const handler: MessageTransformer = async (_client: Client, message: Message, _sender: UserInstance, _thread: SlackMessageInstance) => {
    if (!message.text) return new Error('Message is empty');
    return {
        attachments: [{
            fallback: message.text,
            text: message.text
        }]
    };
};

export default handler;