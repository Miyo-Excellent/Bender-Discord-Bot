import {
  AutocompleteInteraction,
  BaseInteraction,
  Client,
  CommandInteraction,
  Events,
  SlashCommandBuilder
} from 'discord.js';
import { EventInterface } from '@interfaces/event.interface';
import { CommandInterface } from '@interfaces/command.interface';
import { Command } from '@schemas/command.schema';
import { EventBuilderOptions } from '@schemas/event.builderOptions.schema';
import { BotEventsEnum } from '@enums/botEvents.enum';

export class EventBuilder implements EventInterface {
  public data?: SlashCommandBuilder;
  public name: BotEventsEnum | undefined;
  public interaction: BaseInteraction | undefined;
  public commands: Command[];
  public event: Events = Events.Raw;
  public client: Client;

  constructor(options: EventBuilderOptions) {
    this.commands = options.commands;
    this.client = options.client;
  }

  get isCommand(): boolean {
    return this.interaction instanceof CommandInteraction;
  }

  get isAutocomplete(): boolean {
    return this.interaction instanceof AutocompleteInteraction;
  }

  get command(): CommandInterface | undefined {
    return this.commands.find(
      (command) =>
        (this.isCommand || this.isAutocomplete) && command.name === (this.interaction as AutocompleteInteraction | CommandInteraction).commandName,
    );
  }

  get hasCommand(): boolean {
    return !!this.command;
  }

  async run(_callback?: (...args: unknown[]) => Promise<void>): Promise<void> {}
}
