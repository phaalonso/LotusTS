import { Message } from "discord.js";

export default class Command {
    private name: string;
    private args?: number;
    private description: string;
    private usage?: string;

    constructor(name, description, args, usage) {
        this.name = name;
        this.description = description;
        this.args = args;
        this.usage = usage;
    }

    public execute (message: Message, [... args]): void {
        message.reply('Not implemented yet!');
        console.log(`Tried to run command ${this.toString()}`)
    }

    public requireArgs(): boolean {
        return this.args != null;
    }

    public  getName(): string {
        return this.name;
    }

    public getArgs(): number {
        return this.args;
    }

    public getDescription(): string {
        return this.description;
    }

    public getUsage(): string {
        return this.usage;
    }

    public toString(): string {
        return `{
            "name": ${this.name},
            "description": ${this.description},
            "args": ${this.args},
            "usage": ${this.usage}
        }`;
    }

}