import { BotInterface } from '../../domain/interfaces/bot.interface';
import { CommandInterface } from '../../domain/interfaces/command.interface';
import { EventInterface } from '../../domain/interfaces/event.interface';
import { Client } from 'discord.js';

export class BotBuilder implements BotInterface {
  commandsPath = '';
  eventsPath = '';
  commands: CommandInterface[] = [];
  events: EventInterface[] = [];

  constructor(public readonly client: Client) {}
}