import { Message } from 'discord.js';

import CommandInterface from '../model/CommandInterface';

const Ping: CommandInterface = {
    name: 'ping',
    description: 'Pong!',
    args: undefined,
    usage: undefined,
    execute: function (msg: Message, args: string[]): Promise<Message> {
        console.log(args);
        return msg.channel.send('Pong!');
    }
}

export default Ping;