import { Client, Events, SlashCommandBuilder } from 'discord.js';
import { EventBuilderOptions } from '@schemas/event.builderOptions.schema';
import { EventBuilder } from '@builders/event.builder';
import {BotEventsEnum} from "@enums/botEvents.enum";

export interface PingEventOptions extends EventBuilderOptions {}

export default class PingEvent extends EventBuilder {
  public override name: BotEventsEnum | undefined = BotEventsEnum.READY;

  data: SlashCommandBuilder = new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!').setDMPermission(true);

  override event: Events = Events.ClientReady;

  constructor(options: PingEventOptions) {
    super(options);
  }

  async run(callback?: (client: Client<true>) => Promise<void>): Promise<void> {
    this.client.on(this.event as string, async (client: Client<true>) => {
      console.log(`${client.user.username} is already`);
      if (callback) await callback(client);
    });
  }
}
