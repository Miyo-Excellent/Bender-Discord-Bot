import {
    ActionRowModalData,
    BaseInteraction,
    ChatInputCommandInteraction,
    Client,
    Events,
    ModalSubmitInteraction,
    RESTPostAPIChatInputApplicationCommandsJSONBody,
    RouteLike,
    Routes,
    TextInputModalData,
} from 'discord.js';
import {Bot} from '@schemas/bot.schema';
import {Command} from '@schemas/command.schema';
import {BotConfig} from '@schemas/botConfig.schema';
import {BotInterface} from '@interfaces/bot.interface';
import {readDefaultFilesOfFolderUtil} from '@utils/readDefaultFilesOfFolder.util';
import {CommandBuilder} from '@builders/command.builder';
import {CommandBuilderOptions} from '@schemas/command.builderOptions.schema';

export class BotBuilder implements Bot, BotInterface {
    public commandsPath = '';
    public commands: Command[] = [];

    constructor(public readonly client: Client, protected config: BotConfig) {
    }

    get username(): string {
        return this.client?.user?.username || '';
    }

    onProcessModalData = async (data: TextInputModalData, interaction: ModalSubmitInteraction): Promise<void> => {
        await interaction.followUp({
            ephemeral: true,
            content: `${data.customId} -> ${data.value}`,
        });
    };

    onModalSubmit = async (interaction: ModalSubmitInteraction): Promise<void> => {
        const messages: any[] = [`===============Modal Response (${interaction.customId})===============`];

        await interaction.reply({content: 'Your submission was received successfully!'});

        for (const action of interaction.components as ActionRowModalData[]) {
            for (const component of action.components) {
                const {value = '', customId = '', type = ''} = component as any;

                messages.push(`\n  º ${customId} -> ${value}`);

                await this.onProcessModalData({value, customId, type}, interaction);
            }
        }

        console.log(...messages);
    };

    onChatInputCommandInteraction = async (interaction: ChatInputCommandInteraction): Promise<void> => {
        console.log('=========New Interaction Created=========\n', interaction.commandName);

        if (interaction.inCachedGuild()) {
            await interaction.reply({ephemeral: true, content: 'Saving Server In Cache'});

            await interaction.guild?.fetch();
        }

        const command: Command | undefined = this.commands.find((command) => command.name === interaction.commandName);

        if (command) return command.run(this.client, interaction);
        else {
            const message: string = `No command matching ${interaction.commandName} was found.`;

            this.client.application?.commands.set(this.commands.map((command: Command) => command.data.toJSON()));
            console.warn('===================Command Alert===================\n', message);

            await interaction.reply({ephemeral: true, content: message});
            return;
        }
    };

    onClientReady = async (client: Client<true>): Promise<void> => {
        const tag: string = `as ${client.user.tag}`;

        console.log('===================Ready Event===================\n', `Logged in ${tag}`);
    };

    onInteractionCreate = async (interaction: BaseInteraction, ...args: any[]): Promise<void> => {
        if (!!args.length) console.log('=================Arguments=================\n', ...args);

        if (interaction.isChatInputCommand()) await this.onChatInputCommandInteraction(interaction);
        else if (interaction.isModalSubmit()) await this.onModalSubmit(interaction);
    };

    start = async (): Promise<void> => {
        this.commands = await readDefaultFilesOfFolderUtil<CommandBuilder, CommandBuilderOptions>(
            this.commandsPath,
            async (CommandClass) => new CommandClass(),
        );

        this.client.on(Events.ClientReady, this.onClientReady);
        this.client.on(Events.InteractionCreate, this.onInteractionCreate);

        await this.client.login(this.config.token);
        await this.setCommands();
    };

    getCommandByName = (commandName: string): Command | undefined => this.commands.find((command) => command.name === commandName);

    async setCommands(): Promise<void> {
        try {
            const username: string = !!this.username ? `${this.username} application` : '';

            const urlPath: RouteLike = Routes.applicationGuildCommands(this.config.clientId, this.config.guildId);

            const parsedCommands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = this.commands.map<RESTPostAPIChatInputApplicationCommandsJSONBody>(
                (command: Command) => command.data.toJSON(),
            );

            const data: unknown = await this.client.rest.put(urlPath, {body: parsedCommands});

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