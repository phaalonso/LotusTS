import { Message } from 'discord.js';

import Command from '../Model/Command';

class Ping extends Command {
    constructor () {
        super(
            'ping',
            'Pong!',
            null,
            null,
        );
    }

    public execute(message: Message, [... args]): Promise<Message> {
        console.log(args);
        return message.channel.send('Pong!');
    }
}

export default new Ping;