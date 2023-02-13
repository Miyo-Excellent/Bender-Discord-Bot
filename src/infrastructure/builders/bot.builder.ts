import { Client, REST, RouteLike, Routes } from 'discord.js';
import { Bot } from '@schemas/bot.schema';
import { Command } from '@schemas/command.schema';
import { Event } from '@schemas/event.schema';
import { BotConfig } from '@schemas/botConfig.schema';
import { BotInterface } from '@interfaces/bot.interface';
import { EventInterface } from '@interfaces/event.interface';

export class BotBuilder implements Bot, BotInterface {
  public commandsPath = '';
  public eventsPath = '';
  public commands: Command[] = [];
  public events: Event[] = [];

  constructor(public readonly client: Client<true>, protected config: BotConfig) {}

  get rest(): REST {
    return new REST({ version: this.config.version }).setToken(this.config.token);
  }

  async setEvents(events: EventInterface[]): Promise<void> {
    try {
      console.log(`Started refreshing ${this.events.length}, ${this.client.user.username} application (${this.config.prefix}) events.`);

      const urlPath: RouteLike = Routes.applicationGuildCommands(this.config.clientId, this.config.guildId);

      const body = events.filter((event) => !!event.data).map((event) => event.data!.toJSON());

      const data = await this.rest.put(urlPath, { body });

      const isArray = Array.isArray(data);

      console.log(`Successfully reloaded ${isArray ? data.length : 0}, ${this.client.user.username} application (${this.config.prefix}) events.`);
    } catch (error) {
      console.error(error);
    }
  }
}