import { Message } from 'discord.js';

import CommandInterface from '../model/CommandInterface';

const clear: CommandInterface = {
    name: 'clear',
    description: 'Clear the current chat!',
    args: 1,
    usage: '<number>',
    execute: function (msg: Message, args: string): Promise<Message> {
        const amount: number = Number.parseInt(args[0]);
        console.log(amount);

        if (isNaN(amount)) return msg.reply('The amount parameter is not a number!');
        
        try{
            msg.channel.bulkDelete(amount, true);
        } catch (error) {
            console.error(error);
        }

        console.log(`Deleted ${amount} msgs in the channel ${msg.channel}`);
        return msg.reply(`Deleted ${amount} messages successfully`);
    } 
}

export default clear;