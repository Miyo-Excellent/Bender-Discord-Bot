import {Client, Events, Message} from 'discord.js';
import path from 'path';
import {BotConfig} from '../../domain/schemas/botConfig.schema';
import {readDefaultFilesOfFolderUtil} from '../../domain/utils/readDefaultFilesOfFolder.util';
import {CommandBuilder, CommandBuilderOptions} from '../builders/command.builder';
import {EventBuilder, EventBuilderOptions} from '../builders/event.builder';
import {BotBuilder} from '../builders/bot.builder';

export class BenderBot extends BotBuilder {
    override commandsPath = path.join(__dirname, '../commands');
    override eventsPath = path.join(__dirname, '../events');

    constructor(private config: BotConfig) {
        const client: Client<true> = new Client({
            intents: [
                // IntentsBitField.Flags.AutoModerationConfiguration,
                // IntentsBitField.Flags.AutoModerationExecution,
                // IntentsBitField.Flags.DirectMessageReactions,
                // IntentsBitField.Flags.GuildBans,
                // IntentsBitField.Flags.DirectMessages,
                // IntentsBitField.Flags.DirectMessageTyping,
                // IntentsBitField.Flags.GuildEmojisAndStickers,
                // IntentsBitField.Flags.GuildIntegrations,
                // IntentsBitField.Flags.GuildInvites,
                // IntentsBitField.Flags.GuildMembers,
                // IntentsBitField.Flags.GuildMessageReactions,
                // IntentsBitField.Flags.GuildMessages,
                // IntentsBitField.Flags.GuildMessageTyping,
                // IntentsBitField.Flags.GuildModeration,
                // IntentsBitField.Flags.GuildPresences,
                // IntentsBitField.Flags.Guilds,
                // IntentsBitField.Flags.GuildScheduledEvents,
                // IntentsBitField.Flags.GuildVoiceStates,
                // IntentsBitField.Flags.GuildWebhooks,
                // IntentsBitField.Flags.MessageContent,
            ],
        });

        super(client);

        // this.commands.push(new HelloCommand());
    }

    public async start(): Promise<void> {
        this.commands = await readDefaultFilesOfFolderUtil<CommandBuilder, CommandBuilderOptions>(this.commandsPath, async (Command) => {
            const commandOptions: CommandBuilderOptions = {
                description: '',
                name: '',
            };

            const command: CommandBuilder = new Command(commandOptions);
            await command.run(this.client);
            return command;
        });

        this.events = await readDefaultFilesOfFolderUtil<EventBuilder, EventBuilderOptions>(this.eventsPath, async (Event) => {
            const eventOptions: EventBuilderOptions = {
                client: this.client,
                commands: this.commands,
            };

            const event: EventBuilder = new Event(eventOptions);
            await event.run();
            return event;
        });

        this.client.on(Events.MessageCreate, (message: Message) => {
            console.log(message);

            if (!message.content.startsWith(this.config.prefix || '') || message.author.bot) return;

            const [commands, ...args]: string[] = message.content.slice((this.config.prefix || '').length).split(/\s+/);

            const userMessage: string = args.join(' ');

            switch (commands) {
                case 'ping':
                    message.channel.send('Pong!');
                    break;
                case 'say':
                    message.channel.send(userMessage);
                    break;
                default:
                    message.channel.send(`Unknown commands: ${commands}`);
                    break;
            }
        });

        await this.client.login(this.config.token);
    }
}
