import { Events, Interaction } from 'discord.js';
import { EventBuilderOptions } from '@schemas/event.builderOptions.schema';
import { EventBuilder } from '@builders/event.builder';
import { BotEventsEnum } from '@enums/botEvents.enum';

export interface PingEventOptions extends EventBuilderOptions {}

export default class InteractionCreatedEvent extends EventBuilder {
  public override name: BotEventsEnum | undefined = BotEventsEnum.INTERACTION_CREATED;

  override event: Events = Events.InteractionCreate;

  constructor(options: PingEventOptions) {
    super(options);
  }

  async run(callback?: (interaction: Interaction) => Promise<void>): Promise<void> {
    this.client.on(this.event as string, async (interaction: Interaction) => {
      console.log(`Interaction (${interaction.id}) is already`);
      if (callback) await callback(interaction);
    });
  }
}
