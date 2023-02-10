import { Client, Events } from 'discord.js';
import { EventBuilder, EventBuilderOptions } from '../builders/event.builder';

export interface ReadyEventOptions extends EventBuilderOptions {}

export default class ReadyEvent extends EventBuilder {
  override event: Events = Events.ClientReady;

  constructor(options: ReadyEventOptions) {
    super(options);
  }

  async run(): Promise<void> {
    this.client.on(this.event as string, (_client: Client<true>) => {});
  }
}
