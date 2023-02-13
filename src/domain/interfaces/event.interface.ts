import { Client, Events, SlashCommandBuilder } from 'discord.js';
import { CommandInterface } from '@interfaces/command.interface';
import { BotEventsEnum } from '@enums/botEvents.enum';

export interface EventInterface {
  name: BotEventsEnum | undefined;
  data?: SlashCommandBuilder;
  commands: CommandInterface[];
  event: Events;
  client: Client;

  run: (callback?: (...args: unknown[]) => Promise<void>) => Promise<void>;
}
