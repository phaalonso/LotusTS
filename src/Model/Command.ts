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
}