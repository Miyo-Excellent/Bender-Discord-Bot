import { Client, Events } from 'discord.js';
import { EventInterface } from '../../domain/interfaces/event.interface';
import { CommandInterface } from '../../domain/interfaces/command.interface';

export interface EventBuilderOptions {
  commands: CommandInterface[];
  client: Client;
}

export class EventBuilder implements EventInterface {
  public commands: CommandInterface[];
  public event: Events = Events.Raw;
  public client: Client;

  constructor(options: EventBuilderOptions) {
    this.commands = options.commands;
    this.client = options.client;
  }

  async run(): Promise<void> {}
}