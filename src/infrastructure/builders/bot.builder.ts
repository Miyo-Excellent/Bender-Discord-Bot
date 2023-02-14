import {BaseInteraction, ChatInputCommandInteraction, Client, Events, REST} from 'discord.js';
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

    get rest(): REST {
        return new REST({version: this.config.version}).setToken(this.config.token);
    }

    get username(): string {
        return this.client?.user?.username || '';
    }

    onChatInputCommandInteraction = async (interaction: ChatInputCommandInteraction): Promise<void> => {
        console.log(`New interaction created "${interaction.commandName}"`);
    };

    onClientReady = async (client: Client<true>): Promise<void> => {
        const tag: string = !!client.user ? `as ${client.user.tag}` : '';

        console.log('===============Ready Event===============\n', `Logged in ${tag}`, '\n=========================================');
    };

    onInteractionCreate = async (interaction: BaseInteraction, ..._args: any[]): Promise<void> => {
        console.log('===============Arguments===============\n', ..._args, '\n=======================================');
        if (interaction instanceof ChatInputCommandInteraction) await this.onChatInputCommandInteraction(interaction);
    };

    start = async (): Promise<void> => {
        this.commands = await readDefaultFilesOfFolderUtil<CommandBuilder, CommandBuilderOptions>(
            this.commandsPath,
            async (CommandClass) => new CommandClass(),
        );

        this.client.on(Events.ClientReady, this.onClientReady);
        this.client.on(Events.InteractionCreate, this.onInteractionCreate);

        await this.client.login(this.config.token);
    };

    getCommandByName = (commandName: string): Command | undefined => this.commands.find((command) => command.name === commandName);
}

// class X {
//     async setCommands(_events: CommandInterface[]): Promise<void> {
//         try {
//             const username: string = !!this.username ? `, ${this.username} application ` : '';
//
//             console.log(`Started refreshing ${this.events.length}${username}, (${this.config.prefix}) events.`);
//
//             const urlPath: RouteLike = Routes.applicationGuildCommands(this.config.clientId, this.config.guildId);
//
//             // const body = events.filter((event) => !!event.data).map((event) => event.data!.toJSON());
//
//             const data = await this.rest.put(urlPath, {
//                 body: [
//                     {
//                         name: 'hi',
//                         description: 'Some description',
//                         // options: [
//                         //   {
//                         //     name: 'foo',
//                         //     description: 'the type of foo',
//                         //     type: 3,
//                         //     required: true,
//                         //   }
//                         // ],
//                     },
//                 ],
//             });
//
//             const isArray = Array.isArray(data);
//
//             console.log(`Successfully reloaded ${isArray ? data.length : 0}${username}, (${this.config.prefix}) events.`);
//         } catch (error) {
//             console.error(error);
//         }
//     }
// }