import { CommandInteraction, Events, SlashCommandBuilder } from 'discord.js';
import { EventBuilderOptions } from '@schemas/event.builderOptions.schema';
import { EventBuilder } from '@builders/event.builder';
import { BotEventsEnum } from '@enums/botEvents.enum';

export interface PingEventOptions extends EventBuilderOptions {}

export default class PingEvent extends EventBuilder {
  public override name: BotEventsEnum | undefined = BotEventsEnum.PING;

  public data: SlashCommandBuilder = new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!').setDMPermission(true);

  override event: Events = Events.InteractionCreate;

  constructor(options: PingEventOptions) {
    super(options);
  }

  async run(): Promise<void> {
    if (this.interaction instanceof CommandInteraction) {
      if (!this.hasCommand) {
        console.error(`No command matching ${this.interaction.commandName} was found.`);
        return;
      }

      await this.interaction.reply('Pong!');
    }
  }
}
