import { Client, Message, Collection } from 'discord.js';
import { readdirSync } from 'fs';
import { resolve } from 'path';
import BotConfig from '../config.js';

import Command from './Model/Command';

export class DiscordBot {
    private client: Client;
    public commands: Collection<string, Command>;

    public constructor() {
        this.client = new Client();
        this.commands = new Collection();
        this.commandInit();
    }

    public commandInit(): void {
        const commandFiles = readdirSync(resolve(__dirname,'./commands'))
            .filter(file => file.endsWith('.ts'));

        console.log('Command files:' ,commandFiles);
        for (const file of commandFiles) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const { default: command} = require(`./commands/${file}`);
            console.log(command);
            this.commands.set(command.getName(), command);
        }

    }

    public handleMessage(): void {
        this.client.on('message', (message: Message) => {
            if (!message.content.startsWith(BotConfig.prefix) || message.author.bot) {
                return;
            }
            console.log('Prefix',BotConfig.prefix);
            const args = message.content.slice(BotConfig.prefix.length)
                .toLocaleLowerCase()
                .split(/ +/);
            console.log(args);
    
            const commandName = args.shift();
            console.log('Command:', commandName);
            
            if (!this.commands.has(commandName)) {
                return message.reply("Command don't found");
            }

            const command: Command = this.commands.get(commandName);
            if (command.requireArgs() && args.length === 0) {
                return message.reply(`Sorry, this command require the args: ${command.getUsage()}`);
            }

            try{
                command.execute(message, args);
            } catch (error) {
                console.error(error);
                message.reply('There is a error trying to execute this command');
            }
        });
    }
 
    public start(): void {
        this.client.on('ready', () => {
            console.log('Bot is online!');
        });

        this.handleMessage();

        const token = (process.env.TOKEN as string);
        if (!token)
            throw new Error(` 'TOKEN' DON'T FOUNT IN ENV!`);

        this.client.login(token);
    }

}