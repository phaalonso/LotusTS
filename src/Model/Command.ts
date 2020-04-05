export default class Command {
    private name: string;
    private args?: number;
    private description: string;
    public execute: Function;

    public constructor (name, args, description, execute) {
        this.name = name;
        this.args = args;
        this.description = description;
        this.execute = execute;

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

}