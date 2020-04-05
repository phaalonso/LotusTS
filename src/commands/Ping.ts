import { Message } from 'discord.js';

import Command from '../Model/Command';

const Ping = new Command(
    'ping',
    null,
    'Ping!',
    (message: Message, args: string[]) => {
        message.channel.send('Pong!');
    }
);


export default Ping;