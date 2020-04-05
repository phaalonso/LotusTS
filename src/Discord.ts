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
            .filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const command = require(`./commands/${file}`);
            this.commands.set(command.name, command);
        }

    }

    public handleMessage(mensagem: Message): void {
        if (!mensagem.content.startsWith(BotConfig.prefix) || mensagem.author.bot) {
            return;
        }

        const args = mensagem.content.slice(this.prefix.length)
            .toLocaleLowerCase()
            .split(/ +/);
        console.log(args);

        const commandName = args.shift();
        console.log('Command:', commandName);
        
        const command = this.commands.get(commandName);

        try{
            command.execute(mensagem, args);
        } catch (error) {
            console.error(error);
            mensagem.reply('There is a error trying to execute this command');
        }

    }
 
    public start(): void {
        this.client.on('ready', () => {
            console.log('Bot is online!');
        });

        this.client.on('message', this.handleMessage);

        const token = (process.env.TOKEN as string);
        if (!token)
            throw new Error(` 'TOKEN' DON'T FOUNT IN ENV!`);

        this.client.login(token);
    }

}