import {ChatInputCommandInteraction, Client} from 'discord.js';
import path from 'path';
import {BotConfig} from '@schemas/botConfig.schema';
import {readDefaultFilesOfFolderUtil} from '@utils/readDefaultFilesOfFolder.util';
import {CommandBuilderOptions} from '@schemas/command.builderOptions.schema';
import {EventBuilderOptions} from '@schemas/event.builderOptions.schema';
import {CommandBuilder} from '@builders/command.builder';
import {EventBuilder} from '@builders/event.builder';
import {BotBuilder} from '@builders/bot.builder';
import {BotEventsEnum} from '@enums/botEvents.enum';

export class BenderBot extends BotBuilder {
    override commandsPath = path.join(__dirname, '../commands');
    override eventsPath = path.join(__dirname, '../events');

    constructor(config: BotConfig) {
        const client: Client<true> = new Client({
            intents: 3276799,
        });

        super(client, config);
    }

    public async start(): Promise<void> {
        this.commands = await readDefaultFilesOfFolderUtil<CommandBuilder, CommandBuilderOptions>(this.commandsPath, async (Command) => new Command());
        this.events = await readDefaultFilesOfFolderUtil<EventBuilder, EventBuilderOptions>(this.eventsPath, async (Event) => {
            const eventOptions: EventBuilderOptions = {
                client: this.client,
                commands: this.commands,
            };

            const event: EventBuilder = new Event(eventOptions);

            if (event.name === BotEventsEnum.INTERACTION_CREATED) {
                await event.run(async (interaction: unknown): Promise<void> => {
                    if (interaction instanceof ChatInputCommandInteraction) {
                        for (const command of this.commands) await command.run(this.client, interaction);
                    }
                });
            }

            return event;
        });

        await this.client.login(this.config.token);

        await this.setEvents(this.events);
    }
}
