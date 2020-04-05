import { DiscordBot } from './Discord';
import { config as configEnv } from 'dotenv';
import { resolve } from 'path';

configEnv({
    path: resolve(__dirname, '../.env')
});

const bot: DiscordBot = new DiscordBot();
bot.start();