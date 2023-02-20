import {
    ActionRowModalData,
    AutocompleteInteraction,
    BaseInteraction,
    ChatInputCommandInteraction,
    Client,
    Events,
    InteractionReplyOptions,
    MessagePayload,
    ModalSubmitInteraction,
    RESTPostAPIChatInputApplicationCommandsJSONBody,
    RouteLike,
    Routes,
    TextInputModalData,
} from 'discord.js';
import { Bot } from '@schemas/bot.schema';
import { Command } from '@schemas/command.schema';
import { BotConfig } from '@schemas/botConfig.schema';
import { BotInterface } from '@interfaces/bot.interface';
import { readDefaultFilesOfFolderUtil } from '@utils/readDefaultFilesOfFolder.util';
import { CommandBuilder } from '@builders/command.builder';
import { TranslateRepository } from '@repositories/translate.repository';
import { getPackage } from '@di/injector';

export class BotBuilder implements Bot, BotInterface {
    public static openAIChatContextWrapperStart: string = '';
    public static openAIChatContextWrapperEnd: string = '';
    public static openAIChatContextWrapperKeywords: string[] = [];
    public translateRepository: TranslateRepository = getPackage<TranslateRepository>('translateRepository');
    public commandsPath = '';
    public commands: Command[] = [];

    constructor(public readonly client: Client, protected config: BotConfig) {
    }

    get username(): string {
        return this.client?.user?.username || '';
    }

    onProcessModalData = async (data: TextInputModalData, interaction: ModalSubmitInteraction, _ephemeral: boolean = false): Promise<void> => {
        await this.reply(interaction, data.value);

        for (const command of this.commands) {
            const modalCommandName: string = `${command.name}_MODAL`.toUpperCase();

            if (modalCommandName === interaction.customId) {
                await command.run(this.client, interaction);
            }
        }
    };

    reply = async (interaction: BaseInteraction, options: string | MessagePayload | InteractionReplyOptions): Promise<void> => {
        if (interaction.isRepliable()) {
            if (interaction.replied) await interaction.followUp(options);
            else await interaction.reply(options);
        }
    };

    onModalSubmit = async (interaction: ModalSubmitInteraction): Promise<void> => {
        const messages: any[] = [`===============Modal Response (${interaction.customId})===============`];

        await this.reply(interaction, { content: 'Your submission was received successfully!', ephemeral: true });

        for (const action of interaction.components as ActionRowModalData[]) {
            for (const component of action.components) {
                const { value = '', customId = '', type = '' } = component as any;

                messages.push(`\n  º ${customId} -> ${value}`);

                await this.onProcessModalData({ value, customId, type }, interaction);
            }
        }

        console.log(...messages);
    };

    onAutocompleteInteraction = async (_interaction: AutocompleteInteraction): Promise<void> => {
    };

    onChatInputCommandInteraction = async (interaction: ChatInputCommandInteraction): Promise<void> => {
        console.log(`=========Command Interaction ${interaction.commandName}=========\n`);

        const command: Command | undefined = this.commands.find((command) => command.name === interaction.commandName);

        if (command) return command.run(this.client, interaction);
        else {
            const message: string = `No command matching ${interaction.commandName} was found.`;

            this.client.application?.commands.set(this.commands.map((command: Command) => command.data.toJSON()));
            console.warn('===================Command Alert===================\n', message);

            await this.reply(interaction, message);
            return;
        }
    };

    onClientReady = async (client: Client<true>): Promise<void> => {
        const tag: string = `as ${client.user.tag}`;

        console.log('===================Ready Event===================\n', `Logged in ${tag}`);
    };

    onInteractionCreate = async (interaction: BaseInteraction, ...args: any[]): Promise<void> => {
        if (!!args.length) console.log('=================Arguments=================\n', ...args);

        if (interaction.isAutocomplete()) await this.onAutocompleteInteraction(interaction);
        else if (interaction.isChatInputCommand()) await this.onChatInputCommandInteraction(interaction);
        else if (interaction.isModalSubmit()) await this.onModalSubmit(interaction);
        else if (interaction.isRepliable()) await this.reply(interaction, 'Unknown command.');
        return;
    };

    start = async (): Promise<void> => {
        try {
            await this.translateRepository.init();

            const commandFiles = await readDefaultFilesOfFolderUtil<CommandBuilder>({ path: this.commandsPath });

            this.commands = commandFiles.map((command) => command.file);

            this.client.on(Events.ClientReady, this.onClientReady);
            this.client.on(Events.InteractionCreate, this.onInteractionCreate);

            await this.client.login(this.config.token);
            await this.setCommands();
        } catch (error) {
            console.error(error);
            await this.start();
        }
    };

    getCommandByName = (commandName: string): Command | undefined => this.commands.find((command) => command.name === commandName);

    async setCommands(): Promise<void> {
        try {
            const username: string = !!this.username ? `${this.username} application` : '';

            const urlPath: RouteLike = Routes.applicationGuildCommands(this.config.clientId, this.config.guildId);

            const parsedCommands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = this.commands.map<RESTPostAPIChatInputApplicationCommandsJSONBody>(
              (command: Command) => command.data.toJSON(),
            );

            const data: unknown = await this.client.rest.put(urlPath, { body: parsedCommands });

            const messages: any[] = [
                `===============Commands Loaded (${Array.isArray(data) ? data.length : 0})===============\n`,
                `${username} :: prefix -> "${this.config.prefix}"`,
            ];

            await this.client.application?.commands.set(parsedCommands, this.config.guildId);

            if (Array.isArray(parsedCommands)) {
                for (const commandAttached of parsedCommands) {
                    messages.push(`\n  - Command :: ${commandAttached.name} -> ${commandAttached?.description ?? ''}`);

                    if (commandAttached.options && Array.isArray(commandAttached.options)) {
                        for (const commandOption of commandAttached.options as any[]) {
                            messages.push(`\n    * Option :: ${commandOption.name} -> ${commandOption?.description ?? ''}`);

                            if (commandOption.choices && Array.isArray(commandOption.choices)) {
                                for (const choice of commandOption.choices) {
                                    messages.push(`\n      º Choice :: ${choice.name} -> ${choice.value}`);
                                }
                            }
                        }
                    }
                }
            } else {
                messages.push(`\n  - Command (Unknown) :: Unknown -> Unknown`);
            }

            console.log(...messages);
        } catch (error) {
            console.error('======================Error======================\n', error);
        }
    }
}