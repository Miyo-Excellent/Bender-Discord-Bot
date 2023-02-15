import {
    BaseInteraction,
    ChatInputCommandInteraction,
    Client,
    ModalSubmitInteraction,
    TextInputModalData
} from 'discord.js';
import {CommandInterface} from '@interfaces/command.interface';
import {Command} from '@schemas/command.schema';

export interface BotInterface {
    readonly client: Client;
    commandsPath: string;
    commands: CommandInterface[];
    username: string;

    getCommandByName(commandName: string): Command | undefined;

    start(): Promise<void>;

    onChatInputCommandInteraction(interaction: ChatInputCommandInteraction): Promise<void>;

    onClientReady(client: Client<true>): Promise<void>;

    onInteractionCreate(interaction: BaseInteraction, ..._args: any[]): Promise<void>;

    onModalSubmit(interaction: ModalSubmitInteraction): Promise<void>;

    setCommands(commands: Command[]): Promise<void>;

    onProcessModalData(data: TextInputModalData, interaction: ModalSubmitInteraction): Promise<void>;
}
