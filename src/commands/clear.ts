import Command from '../Model/Command';
import { Message } from 'discord.js';

class Clear extends Command {
    constructor() {
        super(
            'clear',
            'Clear the chat',
            1,
            '<number>'
        );
    }

    public execute(message: Message, args: string[]): Promise<Message> {
        const amount: number = Number.parseInt(args[0]);
        console.log(amount);

        if (isNaN(amount)) return message.reply('The amount parameter is not a number!');
        
        try{
            message.channel.bulkDelete(amount, true);
        } catch (error) {
            console.error(error);
        }

        console.log(`Deleted ${amount} messages in the channel ${message.channel}`);
        return message.reply(`Deleted ${amount} messages successfully`);
    }
}

export default new Clear();