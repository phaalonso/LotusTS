export default interface CommandInterface {
    name: string;
    description: string;
    args: number;
    usage: string;
    execute: Function;
};