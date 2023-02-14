import {BaseInteraction, ChatInputCommandInteraction, Client, REST} from 'discord.js';
import {CommandInterface} from '@interfaces/command.interface';
import {Command} from '@schemas/command.schema';

export interface BotInterface {
    readonly client: Client;
    commandsPath: string;
    commands: CommandInterface[];
    rest: REST;
    username: string;

    getCommandByName(commandName: string): Command | undefined;

    start(): Promise<void>;

    onChatInputCommandInteraction(interaction: ChatInputCommandInteraction): Promise<void>;

    onClientReady(client: Client<true>): Promise<void>;

    onInteractionCreate(interaction: BaseInteraction, ..._args: any[]): Promise<void>;
}
