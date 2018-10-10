import Client from '../../..';
import {
    ContentType,
    Message
} from '../../../../thrift/talk_types';
import { UserInstance, SlackMessageInstance } from '../../../../db';
import { registerTransformer, MessageTransformer } from '.';

const handler: MessageTransformer = async (_client: Client, message: Message, _sender: UserInstance, _thread: SlackMessageInstance) => {
    if (!message.text) return new Error('Message is empty');
    return {
        attachments: [{
            fallback: message.text,
            text: message.text
        }]
    };
};

registerTransformer(ContentType.NONE, handler);