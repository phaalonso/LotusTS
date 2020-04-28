import { Client, Message, Collection } from 'discord.js';
import { readdirSync } from 'fs';
import { resolve } from 'path';
import BotConfig from '../config.js';

import CommandInterface from './model/CommandInterface';

export class DiscordBot {
    private client: Client;
    public commands: Collection<string, CommandInterface>;

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
            try {
                console.log(`Setting the command in ${file} file`);
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const { default: command } = require(`./commands/${file}`);
                this.commands.set(command.name, command);
            } catch (err) {
                console.error(`Can't set the command in ${file} file!`);
                console.log(err);
            }
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

            // Get command from collection
            const command: CommandInterface = this.commands.get(commandName);

            if (command.args) {
                // The command require args, but no args are given or wrong lenght of args
                if (args.length === 0 || command.args !== args.length) {
                    return message.reply(`Sorry, this command require the args: \`${command.usage}\``);
                }
            } else {
                if (args.length > 0) {
                    // The command doesn't require args, but received args
                    return message.reply(`This command doesn't require args!`);
                }
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