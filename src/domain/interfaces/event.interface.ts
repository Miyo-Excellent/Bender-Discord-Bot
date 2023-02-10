import { Client, Events } from 'discord.js';
import { CommandInterface } from './command.interface';

export interface EventInterface {
  commands: CommandInterface[];
  event: Events;
  client: Client;
  run: () => Promise<void>;
}
